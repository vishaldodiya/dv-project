var map = new L.map("map", {renderer: L.svg(), center: [33.44, -112.07], zoom: 12});	//Phoenix coordinate
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
        '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
        'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

for (i = 0; i < YELP_DATA.length; i++) {
    L.circleMarker(L.latLng(YELP_DATA[i]["latitude"], YELP_DATA[i]["longitude"]), {
        pane: "overlayPane",
        radius: 5,
        fillColor: "#ff0000",
        weight: 1,
        opacity: 1,
    }).addTo(map);
}

var rateStar = {
    1: "★",
    2: "★★",
    3: "★★★",
    4: "★★★★",
    5: "★★★★★",
    1.5: "★☆",
    2.5: "★★☆",
    3.5: "★★★☆",
    4.5: "★★★★☆"
};

var mapSvg = d3.select("#map").select("svg").attr("class", "map_svg");

mapSvg.selectAll("path")
    .data(YELP_DATA)
    .on("mouseover", function(d) {
        updateRestaurantInfo(d);
    });

function updateRestaurantInfo(data) {
    var infoContainer = d3.select(".info-container");

    infoContainer.select(".name").remove();
    infoContainer.append("h2")
        .attr("class", "name")
        .text(data.name);
    
    infoContainer.select(".rating").remove();
    infoContainer.append("div")
        .attr("class", "rating")
        .html("<strong>Rate: </strong>" + rateStar[data.stars]);

    infoContainer.select(".reviews").remove();
    infoContainer.append("div")
        .attr("class", "reviews")
        .html("<strong>Reviews: </strong>" + data.review_count);

    infoContainer.select(".category").remove();
    infoContainer.append("div")
        .attr("class", "category")
        .html("<strong>Category: </strong>" + data.categories);
    
    infoContainer.select(".address").remove();
    infoContainer.append("div")
        .attr("class", "address")
        .html("<strong>Address: </strong>" + data.address);
}