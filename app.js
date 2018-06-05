


function plotData(column_name) {

    console.log("\nIn index.js.")
    console.log("Parameter: " + column_name)





    // Setup size.
    var margin = { top: 20, right: 20, bottom: 40, left: 40 }
    var width = 960 - margin.left - margin.right
    var height = 500 - margin.top - margin.bottom;
    console.log("\nmargin.top: " + margin.top)
    console.log("margin.right: " + margin.right)
    console.log("margin.bottom: " + margin.bottom)
    console.log("margin.left: " + margin.left)
    console.log("width: " + width)
    console.log("height: " + height)

    /* 
     * value accessor - returns the value to encode for a given data object.
     * scale - maps value to a visual display encoding, such as a pixel position.
     * map function - maps from data value to display value
     * axis - sets up axis
     */

    // Setup x dimension.
    var xValue = function (d) { return d['poverty']; }
    var xScale = d3.scaleLinear().range([0, width])
    var xMap = function (d) { return xScale(xValue(d)); }
    var xAxis = d3.axisBottom(xScale)
    console.log("\nSetup x dimension.")

    // Setup y dimension.
    var yValue = function (d) { return d[column_name]; }
    var yScale = d3.scaleLinear().range([height, 0])
    var yMap = function (d) { return yScale(yValue(d)); }
    var yAxis = d3.axisLeft(yScale)
    console.log("\nSetup y dimension.")

    // Setup fill color.
    var cValue = function (d) { return d.state; }
    var color = d3.scaleOrdinal(d3.schemeCategory10);
    console.log("\n Setup fill color.")

    // Add the graph canvas to the body of the webpage
    var svg = d3.select("section")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    console.log("\nAdded svg.")

    // Add the tooltip area to the webpage.
    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);
    console.log("\nAdded tooltip.")

    // Load data.
    d3.csv("data.csv").then(function (data) {

        console.log("\nProcessing data.")

        // Change string (from CSV) into number format
        data.forEach(function (d) {
            d.id = +d.id
            d.poverty = +d.poverty
            if (column_name == "lacking_healthcare") {
                d.lacking_healthcare = +d.lacking_healthcare
            } else {
                d.binge_drinking = +d.binge_drinking
            }
        });
        console.log("\nCast strings to numbers.")

        // Prevent dots overlapping axis, so add in buffer to data domain.
        xScale.domain([d3.min(data, xValue) - 1, d3.max(data, xValue) + 1]);
        yScale.domain([d3.min(data, yValue) - 1, d3.max(data, yValue) + 1]);
        console.log("\nUpdated scales with domains.")

        // Call the program to create the x axis.
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        // Label for x axis.
        svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + margin.bottom / 3) + ")")
            .style("font-size", "14")
            .text("Poverty (%)");

        console.log("\nAdded x axis to svg.")

        // Call function for creating the y axis.
        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)

        // Label for y axis.
        svg.append("text")
            .attr("class", "label")
            .attr("transform", "rotate(-90)")
            .attr("y", -margin.left)
            .attr("x", -(height / 2))
            .attr("dy", ".71em")
            .style("font-size", "14")
            .text(column_name.replace("_", " ").toUpperCase())

        console.log("\nAdded y axis to svg.")

        data.forEach(function (d) {

            console.log("\nProcessing " + d['state'] + " at x: " + xMap(d) + ", y: " + yMap(d))

            svg.append("circle")
                .data([d])
                .attr("class", "dot")
                .attr("r", 15)
                .attr("cx", xMap(d))
                .attr("cy", yMap(d))

                .style("fill", function (d) {
                    return color(cValue(d));
                })
                .style("opacity", .5)
                .on("mouseover", function (d) {

                    tooltip.transition()
                        .duration(200)
                        .style("opacity", .9);

                    tooltip.html(d["state"] 
                        + "    Poverty: " + xValue(d)
                        + "</br>" + column_name + ": " + yValue(d))
                        .style("left", (d3.event.pageX + 5) + "px")
                        .style("top", (d3.event.pageY - 28) + "px")
                        .style("color", "white")
                        .style("background-color", "black");
                })
                .on("mouseout", function (d) {
                    tooltip.transition()
                        .duration(500)
                        .style("opacity", 0);
                });
            console.log("Added a dot.")

            // Draw company initials in the dots.
            // svg.selectAll("text")
            // .data([d])
            // .enter()
            svg.append("text")
                .data([d])
                .attr("x", xMap(d))
                .attr("y", yMap(d))
                .attr("text-anchor", "middle")
                .style("fill", "white")
                .attr("dy", ".3em")
                .text(function (d) {
                    var letters = d["abbr"]
                    return (letters)
                });
            console.log("Added text for a dot.")
        })

        // alert("Ready")
    });

}