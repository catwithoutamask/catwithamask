  /* max = 4
     min = 1
      580 px 1 -> 2
      838 px 2 -> 3
      1024 px 3 -> 2
      1238 px 2 -> 3
      1499 px 3 -> 4

      colWidth * N + g * (N-1) = tWidth
      g = 8px
      colWidth = 250px
      tWidth
      
      let n = getColCount();
      let imagesHTML = "";
      for(i = 1; i <= n; i++) {
        console.log("New Column: ", n)
        for(j = 1; j <= imageList.length; j=j+n) {
          let index = j*i-i; // 
          let image = imageList[index]; 
          if (!image) continue;
    
          let pathOfImage = "../assets/gallery/thumbnails/" + image.Id + ".thumbnail";
          let toolTip = index; // image.Title + "\n" + image.CreationDate;
    
          if(image.NeedsTriggerWarning) {
            imagesHTML += "<div title='" + toolTip + "\nDisable trigger warning to view image' class='triggercontainer warning' onclick=\"openModal('" + image.Id + "')\">";
          } else {
            imagesHTML += "<div title='" + toolTip + "' onclick=\"openModal('" + image.Id + "')\">";
          }
          imagesHTML += "<img src='" + pathOfImage +"' alt='" + image.AltText + "' loading='lazy' style='object-fit: contain;' height='100%' width='auto'/>"
          imagesHTML += "</div>";
        }
      }
      */
  
  /* let imagesHTML = "";
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
  });  */