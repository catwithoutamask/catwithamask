let imageList;
let allImages;
let imgObjects = [];

let columnHeights;
let columnStrings;

let imageContainer;

window.addEventListener('resize', updateNumberOfColumns)

fetch('../../assets/gallery/image-metadata.json')
  .then(response => response.json())
  .then(loadData)
  .catch(error => console.log(error));

fetch('../../assets/gallery/image-metadata.json', {method: "HEAD"})
  .then(r => {
    document.getElementById('titleheader').innerText += ' ' + (new Date(r.headers.get('Last-Modified'))).toUTCString().substring(0, 22);
  });

   
document.addEventListener('DOMContentLoaded', () => {
  filterbtn = document.querySelector('.filterbtn.ftoggle');
  filtercontainer = document.querySelector('#filter-container');
  imageContainer = document.getElementById('image-container');
  document.getElementById('imageModal').addEventListener('click', function(event) {
    if (event.target === document.getElementById('imageModal')) {
        closeModal();
    }
  });
});

async function loadData(data){
    imageList = data;
    allImages = data;
    await preLoadImages();
    console.log(imgObjects, "from loadData");
    sortImagesBy("Creation Date", "desc");
}

async function preLoadImages() {
  for (i = 0; i < imageList.length; i++) {
    let image = imageList[i];
    let pathOfImage = "../assets/gallery/thumbnails/" + image.Id + ".thumbnail";
  
    await fetch("../"+pathOfImage)
      .then(response => {
        if(!response.ok) {
          throw new Error("couldn't load image with id: ", image.Id);
        }
        return response.blob();
      })
      .then(imageBlob => addImage(imageBlob, image))
      .catch(error => console.error("There was a problem with the fetch operation: ", error));
  }
  console.log("done preloading");
}

function addImage(imageBlob, image) {
  let img = document.createElement("img");
  img.src = URL.createObjectURL(imageBlob);
  img.id = image.Id;
  img.alt = image.AltText;
  imgObjects.push(img);

  let poll = setInterval(function () {
    if (img.naturalWidth) {
        clearInterval(poll);
    }
  }, 1);
}

function updateNumberOfColumns() {
  if(imageContainer.classList.contains("grid")){
    if(window.innerWidth < 600) {
      columnHeights = Array(1).fill(0);
      columnStrings = Array(1).fill("");
      } else if(window.innerWidth < 800) {
      columnHeights = Array(2).fill(0);
      columnStrings = Array(2).fill("");
    } else if(window.innerWidth < 1200) {
      columnHeights = Array(3).fill(0);
      columnStrings = Array(3).fill("");
    } else {
      columnHeights = Array(4).fill(0);
      columnStrings = Array(4).fill("");
    }
    storeDataInDOM()
  }
}

function addImagesToColumns(image) {
  let img = imgObjects.find(x => x.id == `${image.Id}`);
  let imageHeigth = Math.round((img.naturalHeight / img.naturalWidth) * 100);
  if (isNaN(imageHeigth)) {
    console.log(img);
    imageHeigth = 100; 
  }
  let shortestColumn = columnHeights.indexOf(Math.min(...columnHeights));
  // https://www.cssscript.com/image-gallery-masonry-grid/
  let toolTip = image.Title + "\n" + image.CreationDate;
  let imagesHTML = "";
  if(image.NeedsTriggerWarning) {
    imagesHTML += "<div title='" + toolTip + "\nDisable trigger warning to view image' class='triggercontainer warning' onclick=\"openModal('" + image.Id + "')\">";
  } else {
    imagesHTML += "<div title='" + toolTip + "' onclick=\"openModal('" + image.Id + "')\">";
  }
  imagesHTML += img.outerHTML;
  imagesHTML += "</div>";

  columnStrings[shortestColumn] += imagesHTML;
  columnHeights[shortestColumn] += imageHeigth;
}

function storeDataInDOM(){
  console.log("start storing");
  for(i = 0; i < imageList.length; i++) {
    addImagesToColumns(imageList[i]);
  }
  let imagesHTML = "";
  for(i = 0; i < columnStrings.length; i++) {
    imagesHTML += `<div>${columnStrings[i]}</div>`;
  }
  imageContainer.innerHTML = imagesHTML;
  console.log("now done storing");
}

function storeDataInDOM_withInfo(){
    let imagesHTML = "";
  imageList.forEach(image => {
    let pathOfImage = "../assets/gallery/thumbnails/" + image.Id + ".thumbnail";

    imagesHTML += "<div class='infos'>";
      if(image.NeedsTriggerWarning) {
        imagesHTML += "<div style='display: grid; justify-content: center;' class='triggercontainer warning' onclick='disableTriggerWarning(this)'>";
      } else {
        imagesHTML += "<div style='display: grid; justify-content: center;'>";
      }
      imagesHTML += imgObjects.find(x => x.id == `${image.Id}`).outerHTML;
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

function showData(){
  if(imageContainer.classList.contains("grid")){
    updateNumberOfColumns();
  }
  else{
    storeDataInDOM_withInfo();
  }
}