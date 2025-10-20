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

function toggleInformation(){
  imageContainer.classList.toggle("grid");
  
  const infoButton = document.getElementById('infoButton');

  if(imageContainer.classList.contains("grid")){
    infoButton.innerHTML = "ʭ≣";
    updateNumberOfColumns();
  }
  else{
    infoButton.innerHTML = "ʭʭ";
    storeDataInDOM_withInfo();
  }
}

function openModal(id) {
  image = imageList.find(img => img.Id === id)
  
  document.getElementById('modalImage').src = "../assets/gallery/thumbs/" + id + ".png";
  document.getElementById('modalImage').src = "../assets/gallery/images/" + id + ".png"; //" + image.PathOfImage.substring(1);
  document.getElementById('modalTitle').innerText = image.Title;
  document.getElementById('modalDate').innerText = image.CreationDate;
  document.getElementById('modalDescription').innerText = image.Description;

  let imagesHTML = "";
  if(image.YouTubeLink) {
    imagesHTML += "<a target='_blank' href='" + image.YouTubeLink + "' class='filterbtn'>Speedart on YouTube</a>";
  }
  if(image.SpotifyLink) {
    imagesHTML += "<a target='_blank' href='" + image.SpotifyLink + "' class='filterbtn'>Inspiration</a>";
  }
  document.getElementById('links').innerHTML = imagesHTML
  
  document.getElementById('imageModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('imageModal').style.display = 'none';
  document.getElementById('modalImage').src = "";
}