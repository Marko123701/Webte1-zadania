$.getJSON("photo.json", function(myJson) {
  let imgIndex = 0;

myJson.forEach(json => {
  let galleryDiv = document.getElementById('gallery');
  let div = document.createElement("div");
  let img = document.createElement("img");

  div.setAttribute('class', 'gallery_item');
  div.appendChild(img);
  img.setAttribute("id", imgIndex)
  img.src = json.filePath;
  img.setAttribute("alt", json.description);

  galleryDiv.appendChild(div);
  imgIndex++;
});

const images = document.querySelectorAll(".gallery_item img");
let imgSrc;
let imgName;
let imgDescription;
let imgDate;
let imgCoordinates;
let idTimeout;

images.forEach((img, i) => {
    img.addEventListener("click", (e) => {
        imgSrc = e.target.src;
        imgName = myJson[e.target.id].nameOfPicture;
        imgDescription = myJson[e.target.id].description;
        imgDate = myJson[e.target.id].date;
        imgCoordinates = myJson[e.target.id].gps;

        imgModal(imgSrc, imgName, imgDescription, imgDate, imgCoordinates);

        imgIndex = i;
    });
});

let imgModal = (src, name, description, date, gps) => {
    const modal = document.createElement("div");
    modal.setAttribute("class", "modal");

    document.querySelector(".main").append(modal);

    const dataDiv = document.createElement("div");
    dataDiv.setAttribute("class", "dataDiv");

    document.querySelector(".modal").append(dataDiv);

    const h2 = document.createElement("h2");
    
    h2.innerHTML = name;
    h2.setAttribute("class", "h2");

    document.querySelector(".dataDiv").append(h2);

    const p1 = document.createElement("p");
    p1.innerHTML = description;
    document.querySelector(".dataDiv").append(p1);

    const p2 = document.createElement("p");
    p2.innerHTML = date;
    document.querySelector(".dataDiv").append(p2);


    const imgDiv = document.createElement("div");
    imgDiv.setAttribute("class", "imgDiv");
    document.querySelector(".modal").append(imgDiv);

    const newImage = document.createElement("img");
    newImage.setAttribute("src", src);
   
    const closeBtn = document.createElement("i");
    closeBtn.setAttribute("class", "fas fa-times closeBtn");

    closeBtn.onclick = () => {
        modal.remove();
    };
const nextBtn = document.createElement("i");

nextBtn.setAttribute("class", "fas fa-angle-right nextBtn");
nextBtn.onclick = () => {
    newImage.setAttribute("src", nextImg());
    h2.innerHTML = myJson[imgIndex].nameOfPicture;
    p1.innerHTML = myJson[imgIndex].description;
    p2.innerHTML = myJson[imgIndex].date;

    var myLatLng = new google.maps.LatLng(myJson[imgIndex].gps.x,myJson[imgIndex].gps.y);

    var mapProp = myMap(myLatLng);

    var map = new google.maps.Map(document.getElementById("mapDiv"),mapProp);

    var marker = new google.maps.Marker({
      position: myLatLng,
      title: description
    });
    marker.setMap(map);
};
const prevBtn = document.createElement("i");
prevBtn.setAttribute("class", "fas fa-angle-left prevBtn");
prevBtn.onclick = () => {
    newImage.setAttribute("src", prevImg())
    h2.innerHTML = myJson[imgIndex].nameOfPicture;
    p1.innerHTML = myJson[imgIndex].description;
    p2.innerHTML = myJson[imgIndex].date;

    var myLatLng = new google.maps.LatLng(myJson[imgIndex].gps.x,myJson[imgIndex].gps.y);

    var mapProp = myMap(myLatLng);

    var map = new google.maps.Map(document.getElementById("mapDiv"),mapProp);

    var marker = new google.maps.Marker({
      position: myLatLng,
      title: description
    });
    marker.setMap(map);
}

imgDiv.append(prevBtn,nextBtn,newImage, nextBtn);
modal.append(closeBtn);

const btnDiv = document.createElement("div");
btnDiv.setAttribute("class", "btnDiv");
const btn = document.createElement("button");
btn.setAttribute("class", "button-6");
btn.innerHTML = "Slide show";
btnDiv.append(btn);

btn.onclick = () => {
  showSlides();
}

function showSlides() {

  newImage.setAttribute("src", nextImg());
  h2.innerHTML = myJson[imgIndex].nameOfPicture;
  p1.innerHTML = myJson[imgIndex].description;
  p2.innerHTML = myJson[imgIndex].date;

  var myLatLng = new google.maps.LatLng(myJson[imgIndex].gps.x,myJson[imgIndex].gps.y);

  var mapProp = myMap(myLatLng);

  var map = new google.maps.Map(document.getElementById("mapDiv"),mapProp);

  var marker = new google.maps.Marker({
    position: myLatLng,
    title: description
  });
  marker.setMap(map);

  idTimeout = setTimeout(showSlides, 2000);
  
}

const btnEnd = document.createElement("button");
btnEnd.setAttribute("class", "button-6");
btnEnd.innerHTML = "Koniec";
btnDiv.append(btnEnd);

btnEnd.onclick = () => {
  endSlides();
}

function endSlides() {
  clearTimeout(idTimeout);
}
modal.append(btnDiv);

const mapDiv = document.createElement("div");
mapDiv.setAttribute("id", "mapDiv");
modal.append(mapDiv);
var myLatLng = new google.maps.LatLng(gps.x,gps.y);

var mapProp = myMap(myLatLng);

var map = new google.maps.Map(document.getElementById("mapDiv"),mapProp);

var marker = new google.maps.Marker({
  position: myLatLng,
  title: description
});
marker.setMap(map);

};
let nextImg = () => {
    imgIndex++;
    console.log(imgIndex);
    if (imgIndex >= images.length) {
        imgIndex = 0
    }
    return images[imgIndex].src;
};

let prevImg = () => {
    imgIndex--;
    console.log(imgIndex);

    if (imgIndex < 0) {
        imgIndex = images.length - 1
    }
    
    return images[imgIndex].src
}
});

function myMap(myLatlng) {

  var mapProp= {
    center:myLatlng,
    zoom:10,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  return mapProp;
}

$("#myInput").keyup(function() {
  var val = $.trim(this.value);
  if (val === ""){
    $('img').show();
  }
  else {
      $('img').hide();
      val = val.split(" ").join("\\ ");
      $("img[alt*=" + val + " i]").show();
  }
});