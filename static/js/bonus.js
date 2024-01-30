// Function to create a bubble chart

function createGaugeChart(wfreq) {
    var trace = {
      type: 'indicator',
      mode: 'gauge+number',
      value: wfreq,
      title: { text: "Belly Button Washing Frequency<br>Scrubs per Week" },
      gauge: {
        axis: { range: [null, 9] },
        steps: [
          { range: [0, 1], color: "#f8f3ec" },
          { range: [1, 2], color: "#f4f1e4" },
          { range: [2, 3], color: "#e9e7cf" },
          { range: [3, 4], color: "#e5e8b0" },
          { range: [4, 5], color: "#d5e599" },
          { range: [5, 6], color: "#b7cc92" },
          { range: [6, 7], color: "#8cbf88" },
          { range: [7, 8], color: "#8abb8f" },
          { range: [8, 9], color: "#85b48a" }
        ]
      }
    };

    var layout = {
        width: 400,
        height: 300,
        margin: { t: 0, b: 0 }
    };
    
    Plotly.newPlot('gauge', [trace], layout);
  }