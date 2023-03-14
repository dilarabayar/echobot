const express = require('express');
const PORT = process.env.PORT || 3001;
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

app.post("/sendMessage", (req, res) => {

    const payload = req.body.message;

    if(!payload) {
        console.log("message is empty");
        return res.sendStatus(400);
    }

    res.status(200).send(payload);
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});