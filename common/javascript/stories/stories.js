async function loadCharacterOverview(group) {
    try {
        const response = await fetch("../../../assets/characters/characters.json");
        const data = await response.json();
        
        // Group characters by "group"
        const grouped = {};
        data.characters.forEach(c => {
            if (!grouped[c.group]) grouped[c.group] = [];
            grouped[c.group].push(c);
        });
        console.log(grouped[group])
        const container = document.getElementById("charactersContainer");
        container.innerHTML = grouped[group].map(c => `
            <div class="card" style="max-width: 300px;" onclick="window.location.href='../character_sheet.html#${c.id}'">
                <img src="../${c.thumbnail}">
                <div class="card-body">
                    <h4 class="text-center"><a href='../character_sheet.html#${c.id}'>${c.name}</a></h4>
                </div>
            </div>
        `).join("");
    } catch (err) {
        console.error("Error loading character overview:", err);
    }
}

async function loadShortStories(group) {
    try {
        const response = await fetch("../../assets/stories/shortsies.json");
        const data = await response.json();

        const container = document.getElementById("storiesContainer");
        container.innerHTML = data.filter(s => s.group == group).map(s => `
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

let imageList;
let allImages;

let filter = []

function renderArt() {
  fetch('../../../assets/gallery/image-metadata.json')
    .then(response => response.json())
    .then(loadData)
    .catch(error => console.log(error));
}

function loadData(data){
    imageList = data;
    allImages = data;
    sortImagesBy("Creation Date", "desc");
    changeCategoryFilter("1", "A Demon's Promise");
}

function storeDataInDOM(){
  const imageContainer = document.getElementById('art-gallery');
  
  if (imageList.length > 0) {
    let imagesHTML = "";
      imageList.forEach(image => {
        let pathOfImage = "../../assets/gallery/thumbs/" + image.Id + ".png";
        let toolTip = image.Title + "\n" + image.CreationDate;
        imagesHTML += "<div title='" + toolTip + "'>";
        imagesHTML += "<img src='" + pathOfImage +"' alt='" + image.AltText + "' loading='lazy' style='object-fit: contain;' height='100%' width='auto'/>"
        imagesHTML += "</div>";
      });
    
    imageContainer.innerHTML = imagesHTML;
  } else {
    imageContainer.innerHTML = "No Art made yet.";
  }
}

function showData(){
  storeDataInDOM();
}

function addFilterByCategory(filterText, index) {
  filter[index] = function (img) { return img.Categories.includes(filterText)};
}

function applyFilters(){
  imageList = allImages;
  filter.forEach(f => {
    if(f != undefined && f != null){
      imageList = imageList.filter(f);
    }
  });
}

function sortImagesBy(property, direction){
  imageList.sort(compareBy(property.replace(' ', ''), direction));
}

function compareBy(property, direction){
  let sortOrder = 1;

  if(direction == "desc"){
    sortOrder = -1;
  }

  return function (a,b) {
    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function changeCategoryFilter(id, ele) {
  addFilterByCategory(ele, id);
  applyFilters();
  showData()
}

document.addEventListener("DOMContentLoaded", loadCharacterOverview("A Demon's Promise"));
document.addEventListener("DOMContentLoaded", loadShortStories("A Demon's Promise"));
document.addEventListener("DOMContentLoaded", renderArt());
