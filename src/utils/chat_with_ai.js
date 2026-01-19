import { chat_promt } from "../../promts";

const key =
  "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";

// main function to interact with ai from open router
async function chat_with_ai(message) {
  try {
    const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // model: "allenai/molmo-2-8b:free",
        model: "xiaomi/mimo-v2-flash:free",
        messages: [
          {
            role: "user",
            content: chat_promt(message),
          },
        ],
      }),
    });
    const realdata = await res.json();
    return realdata;
  } catch (err) {
    console.log("error is calling ", err);
  }
}

export { chat_with_ai };
