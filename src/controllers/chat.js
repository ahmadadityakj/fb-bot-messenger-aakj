require("dotenv").config();
import request from "request";

let postWebhook = (req, res) =>{
  // Parse the request body from the POST
  let body = req.body;

  // Check the webhook event is from a Page subscription
  if (body.object === 'page') {

    // Iterate over each entry - there may be multiple if batched
    body.entry.forEach(function(entry) {

      // Gets the body of the webhook event
      console.log('entry');
      console.log(entry);
      let webhook_event = entry.messaging[0];
      console.log('webhook event');
      console.log(webhook_event);

      // Get the sender PSID
      let sender_psid = webhook_event.sender.id;
      console.log('Sender PSID: ' + sender_psid);

      // Check if the event is a message or postback and
      // pass the event to the appropriate handler function
      if (webhook_event.message) {
          handleMessage(sender_psid, webhook_event.message);
      } else if (webhook_event.postback) {
          handlePostback(sender_psid, webhook_event.postback);
      }

    });

    // Return a '200 OK' response to all events
    res.status(200).send('EVENT_RECEIVED');

  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    res.sendStatus(404);
  }
};

let getWebhook = (req, res) => {
  // Your verify token. Should be a random string.
  let VERIFY_TOKEN = process.env.VERIFY_FB_TOKEN;

  // Parse the query params
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];

  // Checks if a token and mode is in the query string of the request
  if (mode && token) {

    // Checks the mode and token sent is correct
    if (mode === 'subscribe' && token === VERIFY_TOKEN) {

      // Responds with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      res.status(200).send(challenge);

    } else {
      // Responds with '403 Forbidden' if verify tokens do not match
      res.sendStatus(403);
    }
  }
};

function firstTrait(nlp, name) {
  return nlp && nlp.entities && nlp.traits[name] && nlp.traits[name][0];
}

// Handles messages events
function handleMessage(sender_psid, received_message) {
  let response;

  // Check if the message contains text
  if (received_message.text) {
    let entitiesArr = ["wit$datetime:$datetime"];
    let entityChosen = "";
    console.log('=== nlp start');
    console.log(received_message);
    console.log(received_message.nlp);
    console.log('=== nlp end');
    entitiesArr.forEach((name) => {
      let entity = firstTrait(received_message.nlp, name);
      console.log('=== entity start ====');
      console.log(entity);
      console.log('=== entity end ====');
      if (entity && entity.confidence > 0.8) {
          entityChosen = name;
      }
    });

    if (entityChosen === 'wit$datetime:$datetime') {
      callSendAPI(sender_psid, { "text": `this is your birth date: "${received_message.text}"` })
    }

    // Create the payload for a basic text message
    response = {
        "text": `You sent the message: "${received_message.text}". Now send me an image!`
    }
  } 

  // Sends the response message
  // callSendAPI(sender_psid, response);
}

// Handles messaging_postbacks events
function handlePostback(sender_psid, received_postback) {
  let response;

  // Get the payload for the postback
  let payload = received_postback.payload;

  switch (payload) {
    case 'welcome':
      callSendAPI(sender_psid, { "text": "Hi" }).then(() => {
        callSendAPI(sender_psid, { "text": "What is your first name ?" })
      });
      break;
    default:
      break;
  }

  // Send the message to acknowledge the postback
  // callSendAPI(sender_psid, response);
}

// Sends response messages via the Send API
function callSendAPI(sender_psid, response) {
  return new Promise(function(resolve, reject) {
    // Construct the message body
    let request_body = {
        "recipient": {
            "id": sender_psid
        },
        // "message": { "text": response }
        "message": response
    };

    // Send the HTTP request to the Messenger Platform
    request({
      "uri": "https://graph.facebook.com/v13.0/me/messages",
      "qs": { "access_token": process.env.FB_PAGE_TOKEN },
      "method": "POST",
      "json": request_body
    }, (err, res, body) => {
      if (!err) {
          console.log('message sent!');
          resolve(body);
      } else {
          console.error("Unable to send message:" + err);
          reject(res.error);
      }
    });
  })
}

module.exports = {
  postWebhook: postWebhook,
  getWebhook: getWebhook
};