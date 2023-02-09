const path = require("path")
const express = require("express")
const dotenv = require("dotenv")
const morgan = require("morgan")
const handlebars = require("express-handlebars").create({ defaultLayout: "main"})
const passport = require("passport")
const session = require("express-session")
const connectDB = require("./config/db.js")

// Load config
dotenv.config({ path: "./config/config.env" });

// Passport config
require("./config/passport")(passport)

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

// Session middleware
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
}))


// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname,"public")))

// Routes
app.use("/",require("./routes/index"))
app.use("/auth",require("./routes/auth"))

const PORT = process.env.PORT || 3000;
app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);
 