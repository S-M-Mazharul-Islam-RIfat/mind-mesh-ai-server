import openai from "../../config/openAi";

const generateThreadSummary = async (payload: string) => {
   const res = await openai.chat.completions.create({
      model: "gpt-5-nano",
      messages: [
         {
            role: "system",
            content:
               `
               You are a helpful assistant that analyzes and summarizes forum threads.Detect and flag any inappropriate or spam content if present. Then, write a concise summary of the thread in 4-5 clear and natural lines.Use friendly, human-like English without repetition or unnecessary details.Do not use bullet points or formatting — just plain text.
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