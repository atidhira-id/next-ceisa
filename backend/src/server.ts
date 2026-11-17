import "dotenv/config";
import app from "./app";

const PORT = Number(process.env.PORT) || 4000;

const server = app.listen(PORT, "0.0.0.0", () => {
  console.log(`Backend berjalan pada port ${PORT}`);
});

async function shutdown() {
  console.log("Menutup server...");

  server.close(async () => {
    process.exit(0);
  });
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
