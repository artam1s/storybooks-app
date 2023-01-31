const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const handlebars = require("express-handlebars").create({ defaultLayout: "main"})
const connectDB = require("./config/db.js")

// Load config
dotenv.config({ path: "./config/config.env" });

connectDB();

const app = express();

// Logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Handlebars
app.engine('handlebars', handlebars.engine)
//app.engine(".hbs", engine({ defaultLayout: "main", extname: ".hbs" }));
app.set("view engine", ".handlebars");
app.set('views', './views');

// Routes
app.use("/",require("./routes/index"))

const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
