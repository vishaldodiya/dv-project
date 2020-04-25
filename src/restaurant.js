import * as d3 from "d3";
import Map from "./map";
import HeatMap from "./heatmap";
import User from "./user";
import BubbleChart from "./bubble-chart";

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
                BubbleChart.updateInfo(d["categories"]);
            });
        
        this.updateInfo(YELP_DATA[0]);
    },
    updateInfo: function(data) {
        const infoContainer = d3.select(".info-container");

        infoContainer.select(".name").remove();
        infoContainer.append("h2")
            .attr("class", "name")
            .text(data.name);
        
        infoContainer.select(".stats").remove();
        const stats = infoContainer.append("div")
            .attr("class", "stats");
        
        stats.append("div")
            .attr("class", "rating")
            .html(this.rateStar[data.stars]);
        
        stats.append("div")
            .attr("class", "reviews")
            .html(`${data.review_count} Reviews`);
    
        infoContainer.select(".category").remove();
        infoContainer.append("div")
            .attr("class", "category")
            .html(data.categories.split(", ").reduce((acc, d) => acc + `<span>${d}</span>`, ""));
        
        infoContainer.select(".address").remove();
        infoContainer.append("div")
            .attr("class", "address")
            .html(data.full_address);
    }
}

export default Restaurant;