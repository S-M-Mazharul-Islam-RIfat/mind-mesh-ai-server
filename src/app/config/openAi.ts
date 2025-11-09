import OpenAI from "openai";
import config from ".";

const openai = new OpenAI({
   apiKey: config.open_api_key,
});

export default openai;
