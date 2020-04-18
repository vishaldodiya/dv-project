import * as d3 from "d3";
import Map from "./map";
import HeatMap from "./heatmap";
import User from "./user";

const Restaurant = {
    rateStar: {
        1: "★",
        2: "★★",
        3: "★★★",
        4: "★★★★",
        5: "★★★★★",
        1.5: "★☆",
        2.5: "★★☆",
        3.5: "★★★☆",
        4.5: "★★★★☆"
    },
    load: function() {
        Map.svg.selectAll("path")
            .data(YELP_DATA)
            .on("mouseover", (d) => {
                this.updateInfo(d);
                HeatMap.updateInfo(d["checkin-info"]);
                User.updateInfo(USER_DATA[d["business_id"]]);
            });
    },
    updateInfo: function(data) {
        const infoContainer = d3.select(".info-container");

        infoContainer.select(".name").remove();
        infoContainer.append("h2")
            .attr("class", "name")
            .text(data.name);
        
        infoContainer.select(".rating").remove();
        infoContainer.append("div")
            .attr("class", "rating")
            .html("<strong>Rate: </strong>" + this.rateStar[data.stars]);
    
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
            .html("<strong>Address: </strong>" + data.full_address);
        
        infoContainer.select(".heatmap").remove();
    }
}

export default Restaurant;