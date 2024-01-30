// Function to initialize the dashboard
function init() {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;

       // populate the dropdown with subject IDs
        let dropdownMenu = d3.select("#selDataset");
        samples.forEach((sample, index) => {
            dropdownMenu.append("option").text(sample.id).property("value", index);
        });

        // setting data for initial dashbaord
        let initialSample = samples[0];
        let initialTop10OTUs = initialSample.otu_ids.slice(0, 10).map((otu_id, index) => {
            return {
                otu_id: otu_id,
                sample_value: initialSample.sample_values[index],
                otu_label: initialSample.otu_labels[index]
            };
        });

        //initialTop10OTUs.sort((a, b) => b.sample_value - a.sample_value);

        let initialOtuIds = initialTop10OTUs.map((otu) => `OTU ${otu.otu_id}`);
        let initialSampleValues = initialTop10OTUs.map((otu) => otu.sample_value);
        let initialOtuLabels = initialTop10OTUs.map((otu) => otu.otu_label);

        createBarChart(initialOtuIds, initialSampleValues, initialOtuLabels);
        createBubbleChart(initialSample.otu_ids, initialSample.sample_values, initialSample.otu_labels);
        updateSampleMetadata(data.metadata[0]);

        // bonus
        createGaugeChart(data.metadata[0].wfreq);
    });
}



// Function to handle dropdown change
function optionChanged(index) {
    d3.json("https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json").then((data) => {
        let samples = data.samples;
        let metadata = data.metadata[index];

        let selectedSample = samples[index];
        let top10OTUs = selectedSample.otu_ids.slice(0, 10).map((otu_id, i) => {
            return {
                otu_id: otu_id,
                sample_value: selectedSample.sample_values[i],
                otu_label: selectedSample.otu_labels[i]
            };
        });

        //top10OTUs.sort((a, b) => b.sample_value - a.sample_value);

        let otu_ids = top10OTUs.map((otu) => `OTU ${otu.otu_id}`);
        let sample_values = top10OTUs.map((otu) => otu.sample_value);
        let otu_labels = top10OTUs.map((otu) => otu.otu_label);

        createBarChart(otu_ids, sample_values, otu_labels);
        createBubbleChart(selectedSample.otu_ids, selectedSample.sample_values, selectedSample.otu_labels);
        updateSampleMetadata(metadata);
        createGaugeChart(metadata.wfreq);
    });
}

// Function to create a bar chart
function createBarChart(otuIds, sampleValues, otuLabels) {
    let trace = {
        x: sampleValues.reverse(),
        y: otuIds,
        text: otuLabels,
        type: "bar",
        orientation: "h"
    };

    let layout = {
        title: "Top 10 OTUs",
        xaxis: { title: "Sample Values" },
        yaxis: { title: "OTU ID" }
    };

    Plotly.newPlot("bar", [trace], layout);
}

// Function to create a bubble chart
function createBubbleChart(otuIds, sampleValues, otuLabels) {
    let trace = {
        x: otuIds,
        y: sampleValues,
        text: otuLabels,
        mode: 'markers',
        marker: {
            size: sampleValues,
            color: otuIds,
            colorscale: 'Earth'
        }
    };

    let layout = {
        title: 'Bubble Chart',
        xaxis: { title: 'OTU ID' },
        yaxis: { title: 'Sample Values' }
    };

    Plotly.newPlot('bubble', [trace], layout);
}

// Function to update the sample metadata on the page
function updateSampleMetadata(metadata) {
    let metadataPanel = d3.select("#sample-metadata");
    metadataPanel.html(""); // Clear previous content

    Object.entries(metadata).forEach(([key, value]) => {
        metadataPanel.append("p").text(`${key}: ${value}`);
    });
}

// calling the init function to initialize the dashboard
init();

