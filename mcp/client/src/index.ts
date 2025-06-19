import express from "express";
import cors from "cors";
import { MCPClient } from "./client.js";

const RunServer = () => {
  try {
    const app = express();
    app.use(express.json());
    app.use(cors());

    const McpClients = new Map<string, MCPClient>();

    const getOrCreateMcpClient = async (userId: string): Promise<MCPClient> => {
      if (!McpClients.has(userId)) {
        console.log(
          `Creating and initializing new MCPClient for user: ${userId}`
        );
        const newClient = new MCPClient();
        await newClient.Init(); // Initialize the client (connects to local MCP server, loads tools)
        McpClients.set(userId, newClient);
      }

      return McpClients.get(userId)!;
    };

    app.get("/process", async (req, res: any) => {
      const userQuery = req.query.query;
      if (!userQuery) {
        return res.status(400).json({
          error:
            "Missing 'query' parameter. Please use: /process?query=your_message",
        });
      }
      const userId = req.query.userId as string;

      if (!userId) {
        return res.status(400).json({
          error:
            "Missing 'userId' parameter. Please use: /process?query=your_message&userId=your_unique_id",
        });
      }

      try {
        const client = await getOrCreateMcpClient(userId);

        const responseContent = await client.ProcessMessage(userQuery as string);
        console.log({responseContent})
        res.json({
          query: userQuery,
          response: responseContent,
        });
      } catch (err: any) {
        console.error("Error processing message: ", err);
        res.status(500).json({
          error: "Failed to process message",
          details: err.message,
        });
      }
    });

    app.get("/new-chat", async (req, res: any) => {
      const userId = req.query.userId as string;

      if (!userId) {
        return res.status(400).json({
          error:
            "Missing 'userId' parameter. Please use: /new-chat?userId=your_unique_id",
        });
      }

      if (McpClients.has(userId)) {
        McpClients.delete(userId);
        console.log(`Chat history reset for user: ${userId}`);
        res.json({ message: `New chat started for user ${userId}.` });
      } else {
        res
          .status(404)
          .json({ message: `No active chat found for user ${userId}.` });
      }
    });

    app.listen(3001, () => {
      console.log(`Server running at http://localhost:3001`);
    });
  } catch (err) {
    console.log("error in running the server");
    console.error(err);
    return;
  }
};

RunServer();
