"use strict";

const app = require("./app");
const { PORT } = require("./config");

app.listen(PORT, function () {
  setTimeout(() => {
    console.log(
      `Rate My Doctor -- Backend Started on http://localhost:${PORT}`
    );
  }, 2600);
});
