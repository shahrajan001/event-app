const express = require("express");
require("./db/mongoose");

const app = express();
const port = process.env.PORT;

const userRouter = require("./routes/user");
const eventRouter = require("./routes/event");

app.use(express.json());
app.use(userRouter);
app.use(eventRouter);

app.listen(port, () => {
    console.log("Server is up on port " + port);
});