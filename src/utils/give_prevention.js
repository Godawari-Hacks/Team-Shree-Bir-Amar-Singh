const key =
  "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";

// main function to interact with ai from open router
async function give_prevention(questions, answers) {
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
            content: `
SYSTEM INSTRUCTION (HIGHEST PRIORITY):
You must respond with ONLY a valid JSON object.
Do NOT include markdown, backticks, comments, or extra text.
Do NOT wrap the response in \`\`\`.
Do NOT explain anything.
If you cannot answer, still return valid JSON using empty arrays.

SAFETY RULES:
- No medical diagnosis
- No prescriptions
- No moral judgement
- No mark downs
- No scare tactics
- Suggest professional medical help when appropriate (as a neutral fact)

INPUT DATA:
User questions: ${questions}
User answers: ${answers}
OUTPUT FORMAT (MUST MATCH EXACTLY):

Return a VALID JSON object with:
- "preventives": an array of exactly 5 strings
- "main_causes": an array of exactly 5 strings
- "evidences": an array of exactly 5 objects

Each object in "evidences" must contain:
- "fact": a string
- "source": a string

VALID JSON EXAMPLE (structure only, not content):
{
  "preventives": ["", "", "", "", ""],
  "main_causes": ["", "", "", "", ""],
  "evidences": [
    { "fact": "", "source": "" },
    { "fact": "", "source": "" },
    { "fact": "", "source": "" },
    { "fact": "", "source": "" },
    { "fact": "", "source": "" }
  ]
}

IMPORTANT:
- Keys must be exactly as shown
- Values must be arrays or strings only
- No trailing commas
`,
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

export { give_prevention };
