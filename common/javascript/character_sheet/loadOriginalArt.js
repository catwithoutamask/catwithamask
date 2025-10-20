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
    changeCharacterFilter("1", characterId);
}

function storeDataInDOM(){
  document.getElementById('art-section').innerHTML = "Original Artwork featuring " + characterId;

  const imageContainer = document.getElementById('art-gallery');
  
  if (imageList.length > 0) {
    let imagesHTML = "";
      imageList.forEach(image => {
        let pathOfImage = "../assets/gallery/thumbs/" + image.Id + ".png";
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

function addFilterByCharacter(filterText, index) {
  filter[index] = function (img) { return img.Characters.includes(filterText)};
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

function changeCharacterFilter(id, ele) {
  addFilterByCharacter(ele, id);
  applyFilters();
  showData()
}