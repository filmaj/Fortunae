const BurndownChart = function BurndownChart() {
  var data = [
    {
      date: "1-May-12",
      close: 58.13,
      open: 3.41,
    },
    {
      date: "30-Apr-12",
      close: 53.98,
      open: 4.55,
    },
    {
      date: "27-Apr-12",
      close: 67,
      open: 6.78,
    },
    {
      date: "26-Apr-12",
      close: 89.7,
      open: 7.85,
    },
    {
      date: "25-Apr-12",
      close: 99,
      open: 8.92,
    },
    {
      date: "24-Apr-12",
      close: 130.28,
      open: 9.92,
    },
    {
      date: "23-Apr-12",
      close: 166.7,
      open: 10.13,
    },
    {
      date: "20-Apr-12",
      close: 234.98,
      open: 12.23,
    },
    {
      date: "19-Apr-12",
      close: 345.44,
      open: 13.45,
    },
    {
      date: "18-Apr-12",
      close: 443.34,
      open: 16.04,
    },
    {
      date: "17-Apr-12",
      close: 543.7,
      open: 18.03,
    },
    {
      date: "16-Apr-12",
      close: 580.13,
      open: 21.02,
    },
    {
      date: "13-Apr-12",
      close: 605.23,
      open: 22.34,
    },
    {
      date: "12-Apr-12",
      close: 622.77,
      open: 20.15,
    },
    {
      date: "11-Apr-12",
      close: 626.2,
      open: 21.26,
    },
    {
      date: "10-Apr-12",
      close: 628.44,
      open: 31.04,
    },
    {
      date: "9-Apr-12",
      close: 636.23,
      open: 35.04,
    },
    {
      date: "5-Apr-12",
      close: 633.68,
      open: 41.02,
    },
    {
      date: "4-Apr-12",
      close: 624.31,
      open: 43.05,
    },
    {
      date: "3-Apr-12",
      close: 629.32,
      open: 46.03,
    },
    {
      date: "2-Apr-12",
      close: 618.63,
      open: 51.03,
    },
    {
      date: "30-Mar-12",
      close: 599.55,
      open: 53.42,
    },
    {
      date: "29-Mar-12",
      close: 609.86,
      open: 57.82,
    },
    {
      date: "28-Mar-12",
      close: 617.62,
      open: 59.01,
    },
    {
      date: "27-Mar-12",
      close: 614.48,
      open: 56.03,
    },
    {
      date: "26-Mar-12",
      close: 606.98,
      open: 58.01,
    },
    {
      date: "26-Mar-12",
      close: 626.98,
      open: 62.01,
    },
  ];
  // Get the data
  var margin = { top: 30, right: 40, bottom: 30, left: 50 },
    width = 450 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

  var parseDate = d3.timeParse("%d-%b-%y");

  var x = d3.scaleTime().range([0, width]);
  var y0 = d3.scaleLinear().range([height, 0]);
  var y1 = d3.scaleLinear().range([height, 0]);

  var xAxis = d3.axisBottom().scale(x).ticks(5);

  var yAxisLeft = d3.axisLeft().scale(y0).ticks(5);

  var yAxisRight = d3.axisRight().scale(y1).ticks(5);

  var valueline = d3
    .line()
    .curve(d3.curveCardinal)
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y0(d.close);
    });

  var valueline2 = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y1(d.open);
    });

  var svg = d3
    .select(".container")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // d3.json(data, function (data) {
  data.forEach(function (d) {
    d.date = parseDate(d.date);
    d.close = +d.close;
    d.open = +d.open;
  });

  // Scale the range of the data
  x.domain(
    d3.extent(data, function (d) {
      return d.date;
    })
  );
  y0.domain([
    0,
    d3.max(data, function (d) {
      return Math.max(d.close);
    }),
  ]);
  y1.domain([
    0,
    d3.max(data, function (d) {
      return Math.max(d.open);
    }),
  ]);

  svg
    .append("path") // Add the valueline path.
    .attr("d", valueline(data));

  svg
    .append("path") // Add the valueline2 path.
    .style("stroke", "white")
    .attr("d", valueline2(data));

  svg
    .append("g") // Add the X Axis
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    //  .style("fill", "white")
    .call(yAxisLeft);

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + width + " ,0)")
    //  .attr("fill", "#fff")
    .call(yAxisRight);
};
