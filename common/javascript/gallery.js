let imageList;
let allImages;
let filter = []

fetch('../../assets/gallery/image-metadata.json')
  .then(response => response.json())
  .then(loadData)
  .catch(error => console.log(error));

fetch('../../assets/gallery/image-metadata.json', {method: "HEAD"})
  .then(r => {
    // console.log(new Date(r.headers.get('Last-Modified')));
    document.getElementById('titleheader').innerText += ' ' + (new Date(r.headers.get('Last-Modified'))).toUTCString().substring(0, 22);
  });
let filterbtn;
let filtercontainer;
   
document.addEventListener('DOMContentLoaded', () => {
  filterbtn = document.querySelector('.filterbtn.ftoggle');
  filtercontainer = document.querySelector('#filter-container');
  document.getElementById('imageModal').addEventListener('click', function(event) {
    if (event.target === document.getElementById('imageModal')) {
        closeModal();
    }
  });
});

function filterToggle() {
  filterbtn.classList.toggle('active');
  filtercontainer.classList.toggle('active');
  // console.log("I was pressed!");
}

function toggleTriggerWarning() {
  let triggerboxes = document.getElementsByClassName('triggercontainer');
  // console.log(triggerboxes);
  // console.log(triggerboxes.length);
  let i = 0;
  while(i < triggerboxes.length) {
    triggerboxes[i].classList.toggle('warning');
    triggerboxes[i].classList.remove('twdisabled');
    i++;
  };
}

function disableTriggerWarning(ele){
  ele.classList.toggle('twdisabled');
}

function loadData(data){
    imageList = data;
    allImages = data;
    sortImagesBy("Creation Date", "desc");
}

function storeDataInDOM(){
  const imageContainer = document.getElementById('image-container');
  
  let imagesHTML = "";
  imageList.forEach(image => {
    let pathOfImage = "../assets/gallery/thumbnails/" + image.Id + ".thumbnail";
    let toolTip = image.Title + "\n" + image.CreationDate;
    if(image.NeedsTriggerWarning) {
      imagesHTML += "<div title='" + toolTip + "\nDisable trigger warning to view image' class='triggercontainer warning' onclick=\"openModal('" + image.Id + "')\">";
    } else {
      imagesHTML += "<div title='" + toolTip + "' onclick=\"openModal('" + image.Id + "')\">";
    }
    imagesHTML += "<img src='" + pathOfImage +"' alt='" + image.AltText + "' loading='lazy' style='object-fit: contain;' height='100%' width='auto'/>"
    imagesHTML += "</div>";
  });
  
  imageContainer.innerHTML = imagesHTML;
}

function storeDataInDOM_withInfo(){
  const imageContainer = document.getElementById('image-container');
  
  let imagesHTML = "";
  imageList.forEach(image => {
    let pathOfImage = "../assets/gallery/thumbnails/" + image.Id + ".thumbnail";

    imagesHTML += "<div class='infos'>";
      if(image.NeedsTriggerWarning) {
        imagesHTML += "<div style='display: grid; justify-content: center;' class='triggercontainer warning' onclick='disableTriggerWarning(this)'>";
      } else {
        imagesHTML += "<div style='display: grid; justify-content: center;'>";
      }
      imagesHTML += "<img src='" + pathOfImage +"' alt='" + image.AltText + "' loading='lazy' style='object-fit: contain;' height='100%' width='auto'/>"
      imagesHTML += "</div>";

      imagesHTML += "<div class='infoBox'>";
        imagesHTML += "<h4 class='title'>" + image.Title + "</h4>";
        imagesHTML += "<span class='date'>" + image.CreationDate + "</span>";
        imagesHTML += "</br>";
        imagesHTML += "</br>";
        imagesHTML += "<p>" + image.Description + "</p>";
        imagesHTML += "</br>";
        imagesHTML += "</br>";
        
        imagesHTML += "<div class='links'>";
        if(image.YouTubeLink) {
          imagesHTML += "<a target='_blank' href='" + image.YouTubeLink + "' class='filterbtn'>Speedart on YouTube</a>";
        }
        if(image.SpotifyLink) {
          imagesHTML += "<a target='_blank' href='" + image.SpotifyLink + "' class='filterbtn'>Inspiration</a>";
        }

        imagesHTML += "</div>";
      imagesHTML += "</div>";
    imagesHTML += "</div>";
  });

  imageContainer.innerHTML = imagesHTML;
}

function toggleInformation(){
  const imageContainer = document.getElementById('image-container');
  imageContainer.classList.toggle("grid");
  
  const infoButton = document.getElementById('infoButton');

  if(imageContainer.classList.contains("grid")){
    infoButton.innerHTML = "ʭ≣";
    storeDataInDOM();
  }
  else{
    infoButton.innerHTML = "ʭʭ";
    storeDataInDOM_withInfo();
  }
}

function showData(){
  const imageContainer = document.getElementById('image-container');

  if(imageContainer.classList.contains("grid")){
    storeDataInDOM();
  }
  else{
    storeDataInDOM_withInfo();
  }
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
  applyFilters();
  disableAllCheckboxes();
  toggleTriggerWarning();
}

function applyFilters(){
  console.log(filter);

  imageList = allImages;
  filter.forEach(f => {
    if(f != undefined && f != null){
      imageList = imageList.filter(f);
    }
  });
  showData();
}

function sortImagesBy(property, direction){
  imageList.sort(compareBy(property.replace(' ', ''), direction));
  document.getElementById("dd_button").innerHTML = property;
  showData();

  if(direction == "desc") {
    arrow.classList.remove("asc");
    arrow.classList.add("desc");
    arrow.innerHTML = "▼";
  } 
  else if(direction == "asc") {
    arrow.classList.remove("desc");
    arrow.classList.add("asc");
    arrow.innerHTML = "▲";
  }
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
  applyFilters();
}

function changeCategoriesFilter(ele) {
  if(ele.checked){
    addFilterByCategory(ele.value, ele.id);
  } else {
    removeFilter(ele.id);
  }
  applyFilters();
}

function changeMediumFilter(ele) {
  if(ele.checked && ele.value != 'All'){
    addFilterByMedium(ele.value);
  } else {
    removeFilter(0);
  }
  applyFilters();
}

function openModal(id) {
  image = imageList.find(img => img.Id === id)
  
  document.getElementById('modalImage').src = "../assets/gallery/thumbnails/" + id + ".thumbnail";
  document.getElementById('modalImage').src = "../assets/gallery/" + image.PathOfImage.substring(1);
  document.getElementById('modalTitle').innerText = image.Title;
  document.getElementById('modalDate').innerText = image.CreationDate;
  document.getElementById('modalDescription').innerText = image.Description;
  
  document.getElementById('imageModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
  
}