import openai from "../../config/openAi";

const generateThreadSummary = async (payload: string) => {
   const res = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
         {
            role: "system",
            content: `
        You are a helpful assistant that summarizes forum threads.
        Always write the summary in 3-4 clear and concise lines.
        Use natural, friendly English. Avoid repetition or over-detailing.
        Do not use bullet points or formatting — just plain text.
      `,
         },
         {
            role: "user",
            content: `Summarize this thread:\n\n${payload}`,
         },
      ],
   });
   return res?.choices[0]?.message?.content;
}

export const aiServices = {
   generateThreadSummary
}