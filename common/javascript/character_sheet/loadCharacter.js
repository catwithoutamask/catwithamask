let characterId = window.location.hash ? window.location.hash.substring(1) : null;

async function loadCharacter(characterId) {
    if (!characterId) return;
    
    try {
        const response = await fetch('../../../assets/characters/' + characterId + '/character_info.json');
        
        if (!response.ok) {
            throw new Error('Could not load data for ID: ' + characterId);
        }

        const characterData = await response.json();
        console.log("Loaded character:", characterData);

        renderCharacter(characterData.character);
        renderArt();
        renderFanArt();

    } catch (err) {
        console.error(err.message);
    }
    window.scrollTo(0, 0);
}

function getIdFromUrl() {
    return window.location.hash ? window.location.hash.substring(1) : null;
}

async function handleHashChange() {
    characterId = getIdFromUrl();
    await loadCharacter(characterId);
}

// Run once on page load
document.addEventListener("DOMContentLoaded", async _ => await handleHashChange());

// React when hash changes
window.addEventListener("hashchange", async _ => await handleHashChange());

async function renderCharacter(character) {
    document.title = "Characters - " + character.name;
    document.getElementById('fullname').innerHTML = character.name;
    document.getElementById('age').innerHTML = "<strong>Age:</strong> " + character.age;
    document.getElementById('height').innerHTML = "<strong>Height:</strong> " + character.height;
    document.getElementById('character-image').innerHTML = "<img src=\"../../assets/characters/" + characterId + "/character_image.png\" style=\"box-shadow: var(--shadow-lg); justify-self: center; max-width: 70%; border-radius: var(--radius-lg); margin-bottom: var(--space-4); justify-self: center; display: flex; align-self: center; pointer-events: none; user-select: none;\"/>";

    let sheetAppearance = document.getElementById('appearance');
    let sheetPersonality = document.getElementById('personality');
    let sheetBackstory = document.getElementById('backstory');

    character.appearance ? sheetAppearance.innerHTML = character.appearance : sheetAppearance.innerHTML = "No Information available yet.";
    character.personality ? sheetPersonality.innerHTML = character.personality : sheetPersonality.innerHTML = "No Information available yet.";
    character.backstory ? sheetBackstory.innerHTML = character.backstory : sheetBackstory.innerHTML = "No Information available yet.";

    let palette = document.getElementById('palette');
    let paletteHTML = "";
    console.log(character.color_palette)
    character.color_palette.forEach(swatch => {
      paletteHTML += "<div class=\"color-swatch\" style=\"background-color: " + swatch[1] + ";\">" + swatch[0] + " " + swatch[1] + "</div>";
    });
    palette.innerHTML = paletteHTML;
    
    let relationships = document.getElementById('relationships');
    let relHTML = "";
    console.log(character.relationships)
    character.relationships.forEach(rel => {
      relHTML += "<div class=\"relationship-card\">";
      relHTML += "<div class=\"relationship-image\" style=\"background-image: url(\'" + rel.image_url + "\'); background-repeat: no-repeat;\"></div>";
      relHTML += "<div class=\"relationship-details\">";
      relHTML += "<h4> <a href=\"#" + rel.id + "\">" + rel.name + "</a></h4>";
      relHTML += "<p><strong>Relation:</strong> " + rel.relation + "</p>";
      relHTML += "<p><strong>Backstory:</strong> " + rel.backstory + "</p>";
      relHTML += "</div>";
      relHTML += "</div>";
    });
    relationships.innerHTML = relHTML;
}
