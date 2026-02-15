// Root-only, same folder as index.html
const GEMINI_API_KEY = "AIzaSyAN9fZs84w-DqNv_LIbG4ahQzuLREIIMiE"; // <-- put your API key here

async function getSarahAnswer(query) {
    if(!query) return "Type something for Sarah AI...";
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

// Animated typing effect
async function updateSarahAI(query){
    const aiBox = document.querySelector('.ai-box');
    if(!aiBox) return;

    aiBox.innerHTML = '';
    const answer = await getSarahAnswer(query);
    const text = answer.split(''); // split into characters

    // Colored line animation
    const line = document.createElement('div');
    line.className = 'typing-line';
    aiBox.appendChild(line);

    for(let i=0;i<text.length;i++){
        const span = document.createElement('span');
        span.textContent = text[i];
        aiBox.appendChild(span);
        await sleep(25); // typing speed
    }

    line.remove(); // remove line after typing
}

function sleep(ms){ return new Promise(r=>setTimeout(r,ms)); }
