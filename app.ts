import helmet from "helmet";
import express from "express";
import path from "path";
import bodyParser from "body-parser";

const app = express();

// Security middleware
app.use(
helmet({
	contentSecurityPolicy: false,
	hidePoweredBy: true,
}));
app.use(helmet.frameguard({ action: "deny" }));
app.use(helmet.xssFilter());

// Request parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Static assets
app.use('/Stylesheets', express.static(path.join(__dirname, 'Public', 'Stylesheets')));
app.use('/Scripts', express.static(path.join(__dirname, 'Public', 'JavaScript')));
app.use('/Fonts', express.static(path.join(__dirname, 'Public', 'Fonts')));
app.use("/Images", express.static(path.join(__dirname, "Media")));

// View engine
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'Views'));

// INSERT ROUTE IMPORTS HERE


// 404 PAGE
// Centralized 404 handling
app.use((_req, res) => res.status(404).render("404"));

app.listen(3000, () => console.log("Server is running on port 3000"));