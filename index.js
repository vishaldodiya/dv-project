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

// Restaurant Details.
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
    
    infoContainer.select(".heatmap").remove();
    updateCheckInInfo(data["checkin-info"]);
}

var time = new Array(24).fill(1);
var days = new Array(7).fill(1);
time = time.map(function(value, index) {return index;});
day = days.map(function(value, index) {return index;});
var times = [
    "4a",
    "8a",
    "12a",
    "16p",
    "20p",
    "24p"
];

var days = [
    "Su",
    "Mo",
    "Tu",
    "Wd",
    "Th",
    "Fr",
    "St"
];

var heatmapWidth = 300;
var heatmapHeight = 150;

var xScale = d3.scaleBand()
    .range([0, heatmapWidth - 30])
    .domain(time)
    .padding(0.01)

var yScale = d3.scaleBand()
    .range([heatmapHeight - 30, 0])
    .domain(day)
    .padding(0.01);

var colorScale = d3.scaleLinear()
    .range(["#f2f7f6", "#0494e9"])
    .domain([1, 50]);

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip");

function updateCheckInInfo(data) {

    var heatmapSvg = d3.select(".info-container")
        .append("div")
        .attr("class", "heatmap")
        .append("svg")
        .attr("width", heatmapWidth)
        .attr("height", heatmapHeight)
        .append("g")
        .attr("transform", "translate(20, 20)");

    heatmapSvg.append("g")
        .attr("transform", "translate(0, 0)")
        .call(
            d3.axisTop(xScale).tickFormat(function(d) {
                if (d % 4 == 0) return times[parseInt(d / 4) - 1];
            })
            .tickSize(1)
        );

    heatmapSvg.append("g")
        .call(
            d3.axisLeft(yScale).tickFormat(function(d) {
                return days[6 - d];
            })
            .tickSize(1)
        );
    
    data = JSON.parse(data);
    data = Object.entries(data);

    heatmapSvg.selectAll()
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function(d) {
            return xScale(getHour(d[0]));
        })
        .attr("y", function(d) {
            return yScale(6 - getDay(d[0]));
        })
        .attr("width", xScale.bandwidth())
        .attr("height", yScale.bandwidth())
        .style("fill", function(d) {
            return colorScale(d[1]);
        })
        .on("mouseover", function(d) {
            tooltip.transition()
                .duration(200)
                .style("opacity", 0.9)
                .style("visibility", "visible");
            tooltip.html(d[1])
                .style("left", d3.event.pageX + "px")
                .style("top", d3.event.pageY + "px");
        })
        .on("mouseout", function(d) {
            tooltip.transition()		
                .duration(200)
                .style("visibility", "hidden");
        });
}

function getHour(data) {
    return parseInt(data.split("-")[0]);
}

function getDay(data) {
    return parseInt(data.split("-")[1]);
}