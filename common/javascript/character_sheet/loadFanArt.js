let imageListFA;
let allImagesFA;

function renderFanArt() {
  fetch('../../../assets/fanarts/image-metadata.json')
    .then(response => response.json())
    .then(loadDataFA)
    .catch(error => console.log(error));
}

function loadDataFA(data){
    imageListFA = data;
    allImagesFA = data;
    sortImagesByFA("Creation Date", "desc");
    changeCharacterFilterFA("1", characterId);
}

function storeDataInDOMFA(){
  document.getElementById('fanart-title').innerHTML = "Fanart of " + characterId;

  const imageContainer = document.getElementById('fanart-gallery');
  
  if (imageListFA.length > 0) {
    let imagesHTML = "";
      imageListFA.forEach(image => {
        let pathOfImage = "../assets/fanarts/thumbnails/" + image.Id + ".png";
        let toolTip = image.Title + "\n" + image.CreationDate;
        imagesHTML += "<div title='" + toolTip + "'>";
        imagesHTML += "<img src='" + pathOfImage +"' alt='" + image.AltText + "' loading='lazy' style='object-fit: contain;' height='100%' width='auto'/>"
        imagesHTML += "</div>";
      });
    
    imageContainer.innerHTML = imagesHTML;
  } else {
    imageContainer.innerHTML = "";
    document.getElementById('fanart-title').innerHTML = "";
  }
  
}

function showDataFA(){
  storeDataInDOMFA();
}

function addFilterByCharacterFA(filterText, index) {
  filter[index] = function (img) { return img.Characters.includes(filterText)};
}

function applyFiltersFA(){
  imageListFA = allImagesFA;
  filter.forEach(f => {
    if(f != undefined && f != null){
      imageListFA = imageListFA.filter(f);
    }
  });
}

function sortImagesByFA(property, direction){
  imageListFA.sort(compareByFA(property.replace(' ', ''), direction));
}

function compareByFA(property, direction){
  let sortOrder = 1;

  if(direction == "desc"){
    sortOrder = -1;
  }

  return function (a,b) {
    let result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
    return result * sortOrder;
  }
}

function changeCharacterFilterFA(id, ele) {
  addFilterByCharacterFA(ele, id);
  applyFiltersFA();
  showDataFA()
}