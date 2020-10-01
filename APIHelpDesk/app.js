const express = require("express");
const bodyParser = require("body-parser");
var cors = require('cors');
const app = express();
app.use(cors())

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));





require("./app/routes/usuario.routes.js")(app);

// app.post("/registroUsuario", (req, res) => {
//     console.warn();
// });
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});