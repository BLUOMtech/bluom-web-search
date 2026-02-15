// Root-only, place in same folder as index.html
const GEMINI_API_KEY = "AIzaSyAN9fZs84w-DqNv_LIbG4ahQzuLREIIMiE"; // <-- drop your API key here

async function getSarahAnswer(query) {
    if(!query) return "Type a query for Sarah AI...";
    try {
        const response = await fetch("https://api.gemini.com/v1/assistant", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GEMINI_API_KEY}`
            },
            body: JSON.stringify({prompt: query, max_tokens: 200})
        });
        const data = await response.json();
        return data.answer || "Sarah AI has no answer right now.";
    } catch(e){
        console.error(e);
        return "Failed to reach Sarah AI.";
    }
}

async function updateSarahAI(query){
    const aiBox = document.querySelector('.ai-box');
    if(!aiBox) return;
    aiBox.textContent = "Sarah is thinking...";
    const answer = await getSarahAnswer(query);
    aiBox.textContent = answer;
}
