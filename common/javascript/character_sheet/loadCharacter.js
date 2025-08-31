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
    document.getElementById('character-image').innerHTML = "<img src=\"../../assets/characters/" + characterId + "/character_image.png\"/>";

    document.getElementById('appearance').innerHTML = character.appearance;
    document.getElementById('personality').innerHTML = character.personality;
    document.getElementById('backstory').innerHTML = character.backstory;

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
      relHTML += "<div class=\"relationship-image\" style=\"background-image: url(\'" + rel.image_url + "\'); background-size: 100px 100px; background-repeat: no-repeat;\"></div>";
      relHTML += "<div class=\"relationship-details\">";
      relHTML += "<h4> <a href=\"#" + rel.id + "\">" + rel.name + "</a></h4>";
      relHTML += "<p><strong>Relation:</strong> " + rel.relation + "</p>";
      relHTML += "<p><strong>Backstory:</strong> " + rel.backstory + "</p>";
      relHTML += "</div>";
      relHTML += "</div>";
    });
    relationships.innerHTML = relHTML;
}
