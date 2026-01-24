async function loadShortStories() {
    try {
        const response = await fetch("../assets/stories/shortsies.json");
        const data = await response.json();

        const container = document.getElementById("storiesContainer");
        container.innerHTML = data.map(s => `
            <div class="card">
                <h3>${s.title}<i style="color: var(--color-muted); opacity: 50%; font-size: var(--font-size-base); "> - ${s.date}</i></h3>
                <p>${s.textbody[0].substring(0, 200)}...</p>
                <a href="./shortstory.html#${s.id}" class="button outline">Read More</a>
            </div>
        `).join("");
    } catch (err) {
        console.error("Error loading character overview:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadShortStories);