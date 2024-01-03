let imageList;
let allImages;
let filter = []

fetch('../../assets/gallery/gallery-images.json')
  .then(response => response.json())
  .then(loadData)
  .catch(error => console.log(error));

function loadData(data){
    imageList = data;
    allImages = data;
    sortImagesBy("Creation Date", "asc");
    storeDataInDOM();
}

function storeDataInDOM(){
  const imageContainer = document.getElementById('image-container');
  
  let imagesHTML = "";
  imageList.forEach(image => {
    let pathOfImage = "./assets/gallery" + image.PathOfImage.substring(1);
    imagesHTML += "<div>";
    imagesHTML += "<img src='" + pathOfImage +"' alt='" + image.AltText + "' loading='lazy' style='object-fit: contain;' height='100%' width='auto'/>"
    imagesHTML += "</div>";
  });
  
  imageContainer.innerHTML = imagesHTML;
}

function addFilterByCategory(filterText, index) {
  filter[index] = function (img) { return img.Categories.includes(filterText)};
}

function addFilterByCharacter(filterText, index) {
  filter[index] = function (img) { return img.Characters.includes(filterText)};
}

function addFilterByMedium(filterText) {
  filter[0] = (function (img) { return img.Medium == filterText });
}

function removeFilter(index) {
  filter.splice(index, 1);
}

function removeAllFilters() {
  filter = [];
  applyFilter();
  disableAllCheckboxes();
}

function applyFilter(){
  console.log(filter);

  imageList = allImages;
  filter.forEach(f => {
    if(f != undefined && f != null){
      imageList = imageList.filter(f);
    }
  });
  storeDataInDOM();
}

function sortImagesBy(property, direction){
  imageList.sort(compareBy(property.replace(' ', ''), direction));
  document.getElementById("dd_button").innerHTML = property;
  storeDataInDOM();
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

function toggleDropdown(){
  document.getElementById("dd_menu").classList.toggle("show");
}

window.onclick = function(event) {
  if(!event.target.matches('.dropdownbtn')) {
    let dropdowns = document.getElementById("dd_menu");
    if(dropdowns.classList.contains('show')){
      dropdowns.classList.remove('show');
    }
  }
}

function toggleSortDirection() {
  let property = document.getElementById("dd_button").innerHTML;
  let arrow = document.getElementById("arrow");
  
  if(arrow.classList.contains("asc")) {
    arrow.classList.remove("asc");
    arrow.classList.add("desc");
    arrow.innerHTML = "▼";

    sortImagesBy(property, "desc");
  } 
  else if(arrow.classList.contains("desc")) {
    arrow.classList.remove("desc");
    arrow.classList.add("asc");
    arrow.innerHTML = "▲";

    sortImagesBy(property, "asc");
  }
}

function disableAllCheckboxes() {
  let medium = document.getElementById('all');
  medium.checked = true;

  let checkboxes = document.querySelectorAll('#filter-container input[type=checkbox]');
  
  let i;
  for(i = 0; i < checkboxes.length; i++) {
    checkboxes[i].checked = false;
  }
}

function changeCharacterFilter(ele) {
  if(ele.checked){
    addFilterByCharacter(ele.value, ele.id);
  } else {
    removeFilter(ele.id);
  }
  applyFilter();
}

function changeCategoriesFilter(ele) {
  if(ele.checked){
    addFilterByCategory(ele.value, ele.id);
  } else {
    removeFilter(ele.id);
  }
  applyFilter();
}

function changeMediumFilter(ele) {
  if(ele.checked && ele.value != 'All'){
    addFilterByMedium(ele.value);
  } else {
    removeFilter(0);
  }
  applyFilter();
}