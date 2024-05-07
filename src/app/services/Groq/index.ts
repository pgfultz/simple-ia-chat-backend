import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function GroqChatCompletion(text: string) {
    const chatCompletion = await getGroqChatCompletion(text);
    // Print the completion returned by the LLM.
    const resp = chatCompletion.choices[0]?.message?.content || "";

    //console.log(resp);
    return resp;
}

async function getGroqChatCompletion(text: string) {
    return groq.chat.completions.create({
        messages: [
            {
                role: "user",
                content: text
            }
        ],
        model: "llama3-8b-8192"
    });
}

export {GroqChatCompletion};
