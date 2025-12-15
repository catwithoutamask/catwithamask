let storyId = window.location.hash ? window.location.hash.substring(1) : null;

async function loadShortStory(storyId) {
    if (!storyId) return;
    
    try {
        const response = await fetch('../../assets/stories/shortsies.json');
        
        if (!response.ok) {
            throw new Error('Could not load data for ID: ' + storyId);
        }

        const data = await response.json();
        //console.log("Loaded character:", characterData);

        renderStory(data.filter(s => s.id == storyId)[0]);

    } catch (err) {
        console.error(err.message);
    }
    window.scrollTo(0, 0);
}

function getIdFromUrl() {
    return window.location.hash ? window.location.hash.substring(1) : null;
}

async function handleHashChange() {
    storyId = getIdFromUrl();
    await loadShortStory(storyId);
}

// Run once on page load
document.addEventListener("DOMContentLoaded", async _ => await handleHashChange());

// React when hash changes
window.addEventListener("hashchange", async _ => await handleHashChange());

async function renderStory(story) {
    console.log(story)
    document.title = story.title;
    document.getElementById('story-title').innerHTML = story.title;
    document.getElementById('date').innerHTML = story.date;
    let text = ""
    for (let i = 0; i < story.textbody.length; i++) {
        text += `<p>${story.textbody[i]}</p>`;
    }
    document.getElementById('textbody').innerHTML = text;
}
