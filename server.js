const dotenv = require("dotenv");

process.on("uncaughtException", (err) => {
  console.log("Uncaught exception! Desligando servidor...");
  console.log(err.name, err.message);
  process.exit(1);
});

dotenv.config({ path: "./config.env" });
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = "production";
}
if (process.env.NODE_ENV.replace(" ", "") === "development") {
  process.env.NODE_ENV = "development";
}

const app = require("./app");

const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port} on ${process.env.NODE_ENV} mode...`);
});

process.on("unhandledRejection", (err) => {
  console.log("Unhandled rejection! Desligando servidor...");
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});

process.on("SIGTERM", () => {
  console.log("SIGTERM recebido! Desligando servidor...");
  server.close(() => {
    console.log("Processo finalizado.");
  });
});
