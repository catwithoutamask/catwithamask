let imageList;

fetch('../../assets/fanarts/image-metadata.json')
  .then(response => response.json())
  .then(loadData)
  .catch(error => console.log(error));

let filterbtn;
let filtercontainer;

function loadData(data){
    imageList = data;
    storeDataInDOM();
}

function storeDataInDOM(){
  const imageContainer = document.getElementById('image-container');
  
  randomize()

  let imagesHTML = "";
  imageList.forEach(image => {
    let pathOfImage = "../assets/fanarts/thumbnails/" + image.Id + ".png";
    let toolTip = image.Title + "\n" + image.CreationDate;
    imagesHTML += "<div class='gallery-item' title='" + toolTip + "'>";
    imagesHTML += "<img src='" + pathOfImage +"' alt='" + image.AltText + "' loading='lazy' style='object-fit: contain;' height='100%' width='auto'/>"
    imagesHTML += "<h4 class='title'><a class='artist' href='" + image.SpotifyLink + "'>" + image.Title + "</a></h4>";
    imagesHTML += "<p class='date'>" + image.CreationDate + "</p>";
    imagesHTML += "</div>";
  });
       
  imageContainer.innerHTML = imagesHTML;
}

function randomize() {
    for (let i = imageList.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        const temp = imageList[i];
        imageList[i] = imageList[j];
        imageList[j] = temp;
    }
}