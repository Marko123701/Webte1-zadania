  function myMap() {

    var markers = [];

    var myLatlng = new google.maps.LatLng(48.736279,19.146191);

    var mapProp= {
      center:myLatlng,
      zoom:7,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };

    var map = new google.maps.Map(document.getElementById("googleMap"),mapProp);
    
    $.getJSON("./photo.json", function (data) {
        data.forEach(json => {
            var myLatlng = new google.maps.LatLng(json.gps.x,json.gps.y);
            var marker = new google.maps.Marker({
                position: myLatlng,
                title: json.description
            });
            markers.push(marker);
            marker.addListener("click", () => {
                
                var modal = document.getElementById("myModal");

                // Get the image and insert it inside the modal - use its "alt" text as a caption
                var modalImg = document.getElementById("img01");
                var captionText = document.getElementById("caption");
                
                modal.style.display = "block";
                modalImg.setAttribute("src", json.filePath);
                captionText.innerHTML = json.nameOfPicture+"<br>"+json.description+"<br>"+json.date;

                // Get the <span> element that closes the modal
                var span = document.getElementsByClassName("close")[0];

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                modal.style.display = "none";
                }

              });
            
            marker.setMap(map);
        });

      })

    }