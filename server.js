const dotenv = require("dotenv");

// variáveis globais
dotenv.config({ path: "./config.env" });

// app Express
const app = require("./app");

// servidor
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});