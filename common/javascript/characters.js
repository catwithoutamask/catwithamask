async function loadCharacterOverview() {
    try {
        const response = await fetch("../assets/characters/characters.json");
        const data = await response.json();
        
        // Group characters by "group"
        const grouped = {};
        data.characters.forEach(c => {
            if (!grouped[c.group]) grouped[c.group] = [];
            grouped[c.group].push(c);
        });

        const container = document.getElementById("overviewContainer");
        container.innerHTML = Object.keys(grouped).map(groupName => `
            <div class="section">
                <h3 class="text-center">${groupName}</h3>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: var(--space-6);">
                    ${grouped[groupName].map(c => `
                        <div class="card" style="max-width: 300px;" onclick="window.location.href='./character_sheet.html#${c.id}'">
                            <img src="${c.thumbnail}">
                            <div class="card-body">
                                <h4 class="text-center"><a href='./character_sheet.html#${c.id}'>${c.name}</a></h4>
                            </div>
                        </div>
                    `).join("")}
                </div>
            </div>
        `).join("");
    } catch (err) {
        console.error("Error loading character overview:", err);
    }
}

document.addEventListener("DOMContentLoaded", loadCharacterOverview);