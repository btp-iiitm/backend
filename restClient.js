const axios = require("axios");

const GEN_AI = "https://open-ai21.p.rapidapi.com";

const genAiClient = axios.create({
  baseURL: GEN_AI,
});

module.exports = { genAiClient };
