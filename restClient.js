const axios = require("axios");

const GEN_AI = "https://open-ai21.p.rapidapi.com";
const MODEL_AI = "https://models-api-xa6w.onrender.com/api";

const genAiClient = axios.create({
  baseURL: GEN_AI,
});

const modelAiClient = axios.create({
  baseURL: MODEL_AI,
});

module.exports = { genAiClient, modelAiClient };
