import * as d3 from "d3";

const User = {
    svg: {},
    width: 300,
    height: 300,
    labels: [
        "Yelp Age",
        "Reviews",
        "Coolness",
        "Fans",
        "Stars",
        "Useful"
    ],
    yelpAgeScale: {},
    reviewsScale: {},
    coolnessScale: {},
    fansScale: {},
    starsScale: {},
    usefulScale: {},
    yScale: {},
    xScale: {},
    load: function() {
        this.yelpAgeScale = d3.scaleLinear()
            .range([1, this.height - 15])
            .domain([3.85, 10.81]);
        
        this.reviewsScale = d3.scaleLinear()
            .range([1, this.height - 15])
            .domain([6.07, 633.42]);

        this.coolnessScale = d3.scaleLinear()
            .range([1, this.height - 15])
            .domain([0.75, 5518]);
        
        this.fansScale = d3.scaleLinear()
            .range([0, this.height - 15])
            .domain([0, 89.75]);
        
        this.starsScale = d3.scaleLinear()
            .range([1, this.height - 15])
            .domain([1.57, 4.72]);
        
        this.usefulScale = d3.scaleLinear()
            .range([1, this.height - 15])
            .domain([3, 6487.5]);
        
        this.yScale = d3.scaleLinear()
            .range([0, this.height - 15])
            .domain([0, 100]);

        this.xScale = d3.scaleBand()
            .range([0, this.width - 30])
            .domain(this.labels)
            .padding(0.6);
        
        this.svg = d3.select(".userstat-container")
            .append("div")
            .attr("class", "userstats")
            .append("svg")
            .attr("width", this.width)
            .attr("height", this.height)
            .append("g");
        
        this.svg.append("g")
            .attr("transform", "translate(5, 0)")
            .call(d3.axisLeft(this.yScale).tickSize(2));
        
        this.svg.append("g")
            .attr("transform", `translate(5, ${this.height - 15})`)
            .call(d3.axisBottom(this.xScale).tickFormat((d) => d).tickSize(2));
    },
    updateInfo: function(data) {
        
        data = Object.entries(data);

        let rects = this.svg.selectAll("rect")
            .data(data);
        
        rects.exit().remove();

        rects.enter().append("rect");

        rects.transition()
            .duration(500)
            .attr("x", (d) => this.xScale(this.getLabel(d[0])) + 5)
            .attr("y", (d) => (this.height - this.getScaledValue(d[0], d[1]) - 15))
            .attr("width", this.xScale.bandwidth())
            .attr("height", (d) => this.getScaledValue(d[0], d[1]));
    },
    getLabel: function(key) {
        if (key == "Yelping_age") return "Yelp Age";
        else if (key == "review_count") return "Reviews";
        else if (key == "coolness") return "Coolness";
        else if (key == "fans") return "Fans";
        else if (key == "average_stars") return "Stars";
        else return "Useful";
    },
    getScaledValue: function(key, value) {
        if (key == "Yelping_age") return this.yelpAgeScale(value);
        else if (key == "review_count") return this.reviewsScale(value);
        else if (key == "coolness") return this.coolnessScale(value);
        else if (key == "fans") return this.fansScale(value);
        else if (key == "average_stars") return this.starsScale(value);
        else return this.usefulScale(value);
    }
};

export default User;