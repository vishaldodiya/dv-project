import * as d3 from "d3";

const BubbleChart = {
    color: {},
    diameter: 500,
    bubble: {},
    svg: {},
    width: 0,
    height: 0,
    data: {},
    format: {},
    root: {},
    load: function() {
        this.data = this.refactorData(FOOD);

        const container = document.querySelector(".bubble-chart-container");

        this.width = container.getBoundingClientRect().width;
        this.height = container.getBoundingClientRect().height;

        this.color = d3.scaleOrdinal(this.data.map(d => d.name), d3.schemeCategory10);
        this.format = d3.format(",d");
                    
        this.root = this.pack(this.data);

        this.svg = d3.select(".bubble-chart-container")
            .append("svg")
            .attr("font-size", 10)
            .attr("font-family", "sans-serif")
            .attr("text-anchor", "middle")
            .attr("width", this.width)
            .attr("height", this.height);

        const leaf = this.svg.selectAll("g")
            .data(this.root.leaves())
            .join("g")
            .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

        leaf.append("circle")
            .attr("r", d => d.r)
            .attr("fill-opacity", 0.8)
            .attr("fill", d => this.color(d.data.name));

        leaf.append("text")
            .selectAll("tspan")
            .data(d => d.data.name.split(" "))
            .join("tspan")
            .attr("x", 0)
            .attr("y", (d, i, nodes) => `${i - nodes.length / 2 + 0.8}em`)
            .text(d => d);

        leaf.append("title")
            .text(d => d.data.name);

        return this.svg.node();
    },
    pack: function(data) {
        return d3.pack()
            .size([this.width - 2, this.height - 2])
            .padding(3)
            (d3.hierarchy({children: data})
            .sum(d => d.value));
    },
    updateInfo: function(data) {
        const leaf = this.svg.selectAll("g")
            .data(this.root.leaves());

        leaf.selectAll("circle")
            .attr("fill-opacity", d => (-1 !== data.indexOf(d.data.name)) ? 0.8 : 0.2);
        
        leaf.selectAll("text")
            .attr("fill-opacity", d => (-1 !== data.indexOf(d.data.name)) ? 0.8 : 0.2);
    },
    refactorData: function(data) {
        data = Object.entries(data);

        return data.map(d => ({name: d[0], value: d[1].count}));
    }
};

export default BubbleChart;