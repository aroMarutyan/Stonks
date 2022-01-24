// import { OPEN_AI_KEY, OPEN_AI_ORG } from "../apiKeys";
const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  organization: functions.config().openai.id,
  apiKey: functions.config().openai.key,
});

const openai = new OpenAIApi(configuration);

exports.helloJim = functions.https.onRequest((req, res) => {
  const gptCompletion = openai.createCompletion("text-davinci-001", {
    prompt: "Jim Cramer recommends selling the following stock tickers:",
    temperature: 0.7,
    max_tokens: 32,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
  });
  res.send(gptCompletion.data);
});
