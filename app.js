const express = require("express"),
bodyParser = require("body-parser"),
  { urlencoded, json } = require("body-parser"),
  app = express().use(bodyParser.json());

const mongoose = require("mongoose");
require("dotenv").config();

app.use(json({ verify: verifyRequestSignature }));

const uri = process.env.MONGO_DB;
// const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
// const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

// // Handles messages events
// function handleMessage(sender_psid, received_message) {

// }

// // Handles messaging_postbacks events
// function handlePostback(sender_psid, received_postback) {

// }

// // Sends response messages via the Send API
// function callSendAPI(sender_psid, response) {
  
// }

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/webhook", (req, res) => {
    let body = req.body;
  
    console.log(`\u{1F7EA} Received webhook:`);
    console.dir(body, { depth: null });
    
    if (body.object === "page") {
        // Returns a '200 OK' response to all requests
        res.status(200).send("EVENT_RECEIVED");
    } else {
        // Return a '404 Not Found' if event is not from a page subscription
        res.sendStatus(404);
      }
}); 

app.get("/messaging-webhook", (req, res) => {
  
    // Parse the query params
      let mode = req.query["hub.mode"];
      let token = req.query["hub.verify_token"];
      let challenge = req.query["hub.challenge"];
    
      // Check if a token and mode is in the query string of the request
      if (mode && token) {
        // Check the mode and token sent is correct
        if (mode === "subscribe" && token === config.verifyToken) {
          // Respond with the challenge token from the request
          console.log("WEBHOOK_VERIFIED");
          res.status(200).send(challenge);
        } else {
          // Respond with '403 Forbidden' if verify tokens do not match
          res.sendStatus(403);
        }
      }
});

function verifyRequestSignature(req, res, buf) {
    var signature = req.headers["x-hub-signature"];
  
    if (!signature) {
      console.warn(`Couldn't find "x-hub-signature" in headers.`);
    } else {
      var elements = signature.split("=");
      var signatureHash = elements[1];
      var expectedHash = crypto
        .createHmac("sha1", config.appSecret)
        .update(buf)
        .digest("hex");
      if (signatureHash != expectedHash) {
        throw new Error("Couldn't validate the request signature.");
      }
    }
  }

mongoose.connect(uri);
const connection = mongoose.connection;
connection.once("open", ()=>{
    console.log("MongoDB atlas connection established successfully");
});

app.listen(3000, () => {
    console.log("server running on port 3000")
});
