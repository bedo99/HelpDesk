const express = require("express");
const bodyParser = require("body-parser");
const fileUpload = require('express-fileupload');
var cors = require('cors');
const app = express();
app.use(cors())


app.use(fileUpload({
  createParentPath: true
}));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));


require("./app/routes/usuario.routes.js")(app);
require("./app/routes/ticket.routes.js")(app);

// app.post("/registroUsuario", s(req, res) => {
//     console.warn();
// });
// set port, listen for requests
app.listen(3000, () => {
  console.log("Server is running on port 3000.");
});