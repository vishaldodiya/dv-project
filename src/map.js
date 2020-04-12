import L from "leaflet";
import * as d3 from "d3";

const Map = {
    map: {},
    svg: {},
    load: function() {

        this.map = new L.map("map", {renderer: L.svg(), center: [33.44, -112.07], zoom: 12});

        L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
            maxZoom: 18,
            attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
                '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
            id: 'mapbox/streets-v11',
            tileSize: 512,
            zoomOffset: -1
        }).addTo(this.map);
    },
    plotMarker: function() {
        for (let i = 0; i < YELP_DATA.length; i++) {
            L.circleMarker(L.latLng(YELP_DATA[i]["latitude"], YELP_DATA[i]["longitude"]), {
                pane: "overlayPane",
                radius: 5,
                fillColor: "#ff0000",
                weight: 1,
                opacity: 1,
            }).addTo(this.map);
        }

        this.svg = d3.select("#map").select("svg").attr("class", "map_svg");
    }
}

export default Map;