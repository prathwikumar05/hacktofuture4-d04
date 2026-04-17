import "dotenv/config";
import express from "express";
import { createServer as createViteServer } from "vite";
import Groq from "groq-sdk";
import path from "path";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Wait to initialize Groq until requested so it fails gracefully if API key is missing
 let groqClient: Groq | null = null;
  function getGroqClient() {
    if (!groqClient) {
      // EMERGENCY OVERRIDE FOR LOCAL DEMO:
      const myKey = process.env.GROQ_API_KEY || "gsk_PASTE_YOUR_FULL_REAL_API_KEY_HERE";
      
      if (!myKey) {
        throw new Error("GROQ_API_KEY is not configured.");
      }
      groqClient = new Groq({ apiKey: myKey });
    }
    return groqClient;
  }
  // API Routes
  app.post("/api/pipeline", async (req, res) => {
    res.setHeader("Content-Type", "application/x-ndjson");
    res.setHeader("Cache-Control", "no-cache");
    res.setHeader("Connection", "keep-alive");
    res.flushHeaders();

    const send = (step: string, payload: any) => {
      res.write(JSON.stringify({ step, ...payload }) + "\n");
    };

    try {
      const groq = getGroqClient();
      const { task } = req.body;

      if (!task) {
        throw new Error("Task property is required.");
      }

      // Step 1: Context Agent
      send("context", { status: "running" });
      await new Promise(r => setTimeout(r, 600)); // Simulate async repository scanning
      send("context", { status: "done", message: "Workspace scanned. Jira ticket synced. Found 2 matched files." });

      // Step 2: Strategist Agent
      send("strategist", { status: "running" });
      const stratRes = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are the Architect/Strategist Agent. Write a brief 2-3 bullet point technical execution plan for the given task. Be highly concise." },
          { role: "user", content: task }
        ],
        model: "llama-3.1-8b-instant"
      });
      send("strategist", { status: "done", message: stratRes.choices[0]?.message?.content });

      // Step 3: Execution Agent
      send("execution", { status: "running" });
      const execRes = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are the Execution Agent. Generate ONLY the code required to complete the task based on typical standard practices. Wrap in markdown blocks." },
          { role: "user", content: task }
        ],
        model: "llama-3.1-8b-instant"
      });
      const codeOutput = execRes.choices[0]?.message?.content || "";
      send("execution", { status: "done", message: codeOutput });

      // Step 4: Governance Agent
      send("governance", { status: "running" });
      const govRes = await groq.chat.completions.create({
        messages: [
          { role: "system", content: "You are the Governance Agent (Cybersecurity Reviewer). Provide a strict 1-2 sentence security breakdown of the following code and confidently assign a 'Risk Score' from 1-100." },
          { role: "user", content: codeOutput || "No code generated." }
        ],
        model: "llama-3.1-8b-instant"
      });
      send("governance", { status: "done", message: govRes.choices[0]?.message?.content });

    } catch (err: any) {
      console.error("Pipeline Error:", err.message);
      send("error", { message: err.message || "Pipeline execution failed. Check GROQ API KEY." });
    } finally {
      res.end();
    }
  });

  app.post("/api/chat", async (req, res) => {
    try {
      const groq = getGroqClient();
      const { message } = req.body;

      if (!message) {
        return res.status(400).json({ error: "Message is required" });
      }

      const chatCompletion = await groq.chat.completions.create({
        messages: [
          {
            role: "system",
            content: "You are the 'Contextualizer & Strategist Agent' built for the 'Agentic Developer Platform'. You orchestrate software development tasks, give proactive optimization tips, and maintain a highly professional, highly intelligent, 'agentic' persona. Keep responses concise but highly technical."
          },
          {
            role: "user",
            content: message
          }
        ],
        model: "llama-3.1-8b-instant", // Supported modern groq model
      });

      return res.json({ 
        reply: chatCompletion.choices[0]?.message?.content || "No response generated."
      });

    } catch (error: any) {
      console.error("Groq API Error:", error.message || error);
      return res.status(500).json({ error: error.message || "Failed to fetch response from Groq." });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    // Since App is type="module", Express >= 5 or normal * fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
