import http from "http";
import websocket from "websocket";
import { Database } from "./services";
import { addMessage } from "./queries";

const setup = (db: Database) => {
  const server = http.createServer();

  server.listen(process.env.SOCKET_PORT);

  const wsServer = new websocket.server({
    httpServer: server,
  });

  wsServer.on("request", (request) => {
    const connection = request.accept(undefined, request.origin);

    connection.on("message", async (post) => {
      const { from, message } = JSON.parse(post.utf8Data || "");
      wsServer.broadcastUTF(post.utf8Data as string);
      await db.query(addMessage(from, message), {});
    });
    connection.on("close", () => {
      console.log("Client has disconnected.");
    });
  });
};

export default setup;
