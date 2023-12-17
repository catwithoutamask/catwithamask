var imageList;

fetch('../../assets/gallery/gallery-images.json')
  .then(response => response.json())
  .then(storeData)
  .catch(error => console.log(error));

function storeData(data){
    imageList = data;
}
console.log(imageList);