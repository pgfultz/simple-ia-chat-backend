import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

async function GroqChatCompletion(value: Array<any>) {
    const chatCompletion = await getGroqChatCompletion(value);
    // Print the completion returned by the LLM.
    const resp = chatCompletion.choices[0]?.message?.content || "";
    console.log(chatCompletion);
    console.log('===============================');
    console.log(chatCompletion.choices[0]);

    //console.log(resp);
    return resp;
}

async function getGroqChatCompletion(value: Array<any>) {
    return groq.chat.completions.create({
        messages: value,
        model: "llama3-8b-8192"
    });
}

export {GroqChatCompletion};
