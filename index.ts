import { STATES } from "./config/constants";
import { States } from "./config/states";
const accountSid = process.env.SID;
const authToken = process.env.TOKEN;
const mongoose = require("mongoose");
const MessagingResponse = require("twilio").twiml.MessagingResponse;
require("dotenv").config();
import { getCurrentSession, getProducts, setNextState } from "./handlers";
import { Session } from "./models/session";
import { storeStateValidator } from "./utils/validators";
mongoose.connect(
  "mongodb+srv://user:uvOyX5UA6I2mjplk@cluster0.azmit.mongodb.net/NUCLEUS?retryWrites=true&w=majority"
);
mongoose.connection.on("error", (err) => {
  console.log("err", err);
});
mongoose.connection.on("connected", (err, res) => {
  console.log("mongoose is connected");
});
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
app.use(
  express.urlencoded({
    extended: false,
  })
);

app.use(express.json());

const router = express.Router();

app.post("/sms", async (req: any, res: any) => {
  try {
    const twiml = new MessagingResponse();
    const body = req.body;
    const phone: string = body.WaId;
    let text: string = body.Body;
    //const { phone, text } = req.body;
    console.log(req.body, phone, text);
    const currentSession = await getCurrentSession(phone);
    if (text === "menu") {
      await setNextState(STATES.MENU, currentSession._id);
      twiml.message(States[STATES.MENU].message);

      res.writeHead(200, { "Content-Type": "text/xml" });
      return res.end(twiml.toString());
    }

    const currentState = States[currentSession.currentState];

    if (!currentState) {
      twiml.message("Some technical error");

      res.writeHead(200, { "Content-Type": "text/xml" });
      return res.end(twiml.toString());
    }

    try {
      try {
        for (let i = 0; i < currentState.responseValidator.length; i++) {
          await currentState.responseValidator[i](text);
        }
      } catch (error) {
        twiml.message(error.message);

        res.writeHead(200, { "Content-Type": "text/xml" });
        return res.end(twiml.toString());
      }

      if (
        currentState.stateCode === STATES.MENU &&
        text !== "0" &&
        !(await storeStateValidator(phone))
      ) {
        twiml.message("Please create a store first");

        res.writeHead(200, { "Content-Type": "text/xml" });
        return res.end(twiml.toString());
      }

      if (currentState.handler) {
        try {
          console.log(currentState.handler);
          if (req.body.MediaUrl0) {
            text = req.body.MediaUrl0;
          }
          await currentState.handler(text, phone);
        } catch (error) {
          twiml.message(error);

          res.writeHead(200, { "Content-Type": "text/xml" });
          return res.end(twiml.toString());
        }
      }

      if (currentState.stateCode === STATES.MENU) {
        if (text === "0") {
          currentState.nextState = STATES.STORE_NAME;
        } else if (text === "1") {
          currentState.nextState = STATES.PRODUCT_UNIQUE_IDENTIFIER;
        } else if (text === "2") {
          //  twiml.message("here are the products in your inventory");
          const t = await getProducts(phone);
          console.log(t);
          res.writeHead(200, { "Content-Type": "text/xml" });
          twiml.message(t);

          return res.end(twiml.toString());
        } else if (text === "3") {
          currentState.nextState = STATES.EDIT_INVENTORY_PRODUCT_ID;
        }
      }
      if (currentState.customMessage) {
        twiml.message(currentState.customMessage);
        //  sendMessage([currentState.customMessage]);
      }
      if (currentState.successMessage) {
        twiml.message(currentState.successMessage);
        //  sendMessage([currentState.customMessage]);
      }
      if (currentState.nextState || currentState.nextState === STATES.MENU) {
        await setNextState(currentState.nextState, currentSession._id);

        const message = States[currentState.nextState]?.message;
        twiml.message(message);

        res.writeHead(200, { "Content-Type": "text/xml" });
        return res.end(twiml.toString());
      }
    } catch (error) {
      twiml.message(error);

      res.writeHead(200, { "Content-Type": "text/xml" });
      return res.end(twiml.toString());
    }
  } catch (error) {
    console.log(error);
    res.status(500).send(JSON.stringify(error));
  }
});
app.listen(4000, function (err: any) {
  if (!err) {
    console.log("server is running at ", 4000);
  }
});
