
let filterbtn;
let filtercontainer;

let filter = []

function filterToggle() {
  filterbtn.classList.toggle('active');
  filtercontainer.classList.toggle('active');
}

function toggleTriggerWarning() {
  let triggerboxes = document.getElementsByClassName('triggercontainer');
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