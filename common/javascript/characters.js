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
            <div class="character-group">
                <h3>${groupName}</h3>
                <div class="character-grid">
                    ${grouped[groupName].map(c => `
                        <div class="character-card" onclick="window.location.href='./character_sheet.html#${c.id}'">
                            <img src="${c.thumbnail}" alt="${c.name}">
                            <div class="card-body">
                                <h4>${c.name}</h4>
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