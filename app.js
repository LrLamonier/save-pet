const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerFile = require("./swagger/swagger_output.json");
const xss = require("xss-clean");
const hpp = require("hpp");

const userRoute = require("./routes/userRoutes");
const eventRoute = require("./routes/eventRoutes");
const adoptRoute = require("./routes/adoptionRoutes");

const globalErrorHandler = require("./controllers/errorController");

const app = express();

app.enable("trust proxy");
app.use(cors());
app.options("*", cors());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  express.json({
    limit: "10kb",
  })
);

app.use(cookieParser());

app.use(xss());

app.use((req, res, next) => {
  req.requestTime = Date.now();
  next();
});

app.use(
  hpp({
    whitelist: [
      "titulo",
      "tipo_pet",
      "descricao",
      "localizacao",
      "id_solicitante",
      "id_instituicao",
      "name",
      "email",
      "password",
      "passwordConfirm",
      "telephone",
      "cpf",
      "cnpj",
    ],
  })
);

app.get("/", (req, res) => {
  res.send(`Save Pet`);
});
app.use("/usuario", userRoute);
app.use("/chamados", eventRoute);
app.use("/adopt", adoptRoute);

app.use(globalErrorHandler);

app.use("/doc", swaggerUi.serve, swaggerUi.setup(swaggerFile));

module.exports = app;
