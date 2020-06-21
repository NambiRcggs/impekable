
window.onload = (function () {
    var randomScalingFactor = function () {
        return Math.round(Math.random() * 10);
    };
    var ctx1 = document.getElementById('myChart1').getContext('2d');
    var gradient1 = ctx1.createLinearGradient(0, 0, 0, 300);
    gradient1.addColorStop(0, 'rgba(85, 216, 254, 0.8)');
    gradient1.addColorStop(1, 'rgba(85, 216, 254, 0.01)');

    var gradient2 = ctx1.createLinearGradient(0, 0, 0, 300);
    gradient2.addColorStop(0, 'rgba(163, 160, 251, 0.6)');
    gradient2.addColorStop(1, 'rgba(163, 160, 251, 0.01)');

    var chart1 = new Chart(ctx1, {
        // The type of chart we want to create
        type: 'line',
        offsetGridLines: false,

        // The data for our dataset
        data: {
            datasets: [{
                label: 'Products Sold',
                backgroundColor: gradient1,
                pointBackgroundColor: 'white',
                pointStyle: 'circle',
                pointRadius: 5,
                // pointBorderColor: 'rgb(0, 0, 0)',
                borderWidth: 2,
                borderColor: '#55d8fe',
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            },
            {
                label: 'Total Views',
                backgroundColor: gradient2,
                pointBackgroundColor: 'white',
                pointStyle: 'circle',
                pointRadius: 5,
                // pointBorderColor: 'rgb(0, 0, 0)',
                borderWidth: 2,
                borderColor: '#a3a0fb',
                data: [randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor(), randomScalingFactor()]
            }
            ],
            labels: ['Jan', 'Feb', 'Mar', 'Apr', "May", "Jun"]
        },

        // Configuration options go here
        options: {
            responsive: true,
            maintainAspectRatio: false,
            offsetGridLines: false,
            legend: {
                position: "bottom",
                align: "start",
                labels: {
                    fontSize: 13,
                    boxWidth: 12,
                    usePointStyle: true,
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Month'
                    }
                }],
                yAxes: [{
                    display: true,
                    ticks: {
                        callback: function (label, index, labels) {
                            return "$" + label + "k";
                        }
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false,
                    },
                    scaleLabel: {
                        display: false,
                        labelString: 'Value'
                    }
                }]
            },
            title: {
                display: false,
                text: 'Statistics'
            }
        }
    });

    // CHART PLUGIN IMPLEMENTATION

    var dougnutPlugIN = {
        beforeDraw: function (chart) {
            if (chart.config.options.elements.center) {
                // Get ctx from string
                var ctx = chart.chart.ctx;

                // Get options from the center object in options
                var centerConfig = chart.config.options.elements.center;
                var fontStyle = centerConfig.fontStyle || 'Arial';
                var txt = centerConfig.text;
                var color = centerConfig.color || '#000';
                var maxFontSize = centerConfig.maxFontSize || 75;
                var sidePadding = centerConfig.sidePadding || 20;
                var sidePaddingCalculated = (sidePadding / 100) * (chart.innerRadius * 2)
                // Start with a base font of 30px
                ctx.font = "30px " + fontStyle;

                // Get the width of the string and also the width of the element minus 10 to give it 5px side padding
                var stringWidth = ctx.measureText(txt).width;
                var elementWidth = (chart.innerRadius * 2) - sidePaddingCalculated;

                // Find out how much the font can grow in width.
                var widthRatio = elementWidth / stringWidth;
                var newFontSize = Math.floor(30 * widthRatio);
                var elementHeight = (chart.innerRadius * 2);

                // Pick a new font size so it will not be larger than the height of label.
                var fontSizeToUse = Math.min(newFontSize, elementHeight, maxFontSize);
                var minFontSize = centerConfig.minFontSize;
                var lineHeight = centerConfig.lineHeight || 25;
                var wrapText = false;

                if (minFontSize === undefined) {
                    minFontSize = 20;
                }

                if (minFontSize && fontSizeToUse < minFontSize) {
                    fontSizeToUse = minFontSize;
                    wrapText = true;
                }

                // Set font settings to draw it correctly.
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                var centerX = ((chart.chartArea.left + chart.chartArea.right) / 2);
                var centerY = ((chart.chartArea.top + chart.chartArea.bottom) / 2);
                ctx.font = fontSizeToUse + "px " + fontStyle;
                ctx.fillStyle = color;

                if (!wrapText) {
                    ctx.fillText(txt, centerX, centerY);
                    return;
                }

                var words = txt.split(' ');
                var line = '';
                var lines = [];

                // Break words up into multiple lines if necessary
                for (var n = 0; n < words.length; n++) {
                    var testLine = line + words[n] + ' ';
                    var metrics = ctx.measureText(testLine);
                    var testWidth = metrics.width;
                    if (testWidth > elementWidth && n > 0) {
                        lines.push(line);
                        line = words[n] + ' ';
                    } else {
                        line = testLine;
                    }
                }

                // Move the center up depending on line height and number of lines
                centerY -= (lines.length / 2) * lineHeight;

                for (var n = 0; n < lines.length; n++) {
                    ctx.fillText(lines[n], centerX, centerY);
                    centerY += lineHeight;
                }
                //Draw text in center
                ctx.fillText(line, centerX, centerY);
            }
        }
    };

    var ctx2 = document.getElementById('myChart2').getContext('2d');
    var chart2 = new Chart(ctx2, {
        // The type of chart we want to create
        type: 'doughnut',
        plugins: [dougnutPlugIN],
        data: {
            datasets: [{
                data: [
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                    randomScalingFactor(),
                ],
                backgroundColor: [
                    "#55d8fe",
                    "#ff8373",
                    "#ffda83",
                    "#a3a0fb",
                ],
                pointStyle: 'circle',
            }],
            labels: [
                'France     4250 Sales   ',
                'France      3901 Sales',
                'Italy          3210 Sales   ',
                'Italy           2901 Sales'
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                position: "bottom",
                align: "start",
                labels: {
                    fontSize: 13,
                    boxWidth: 12,
                    usePointStyle: true,
                }
            },
            scales: {
                xAxes: [{
                    display: true,
                    gridLines: {
                        display: false,
                    }, ticks: {
                        display: false //this will remove only the label
                    },
                    scaleLabel: {
                        display: false,
                    }
                }],
            },
            elements: {
                center: {
                    text: '  230,999  Sales'
                }
            },
            title: {
                display: false,
                text: 'Chart.js Doughnut Chart'
            },
            animation: {
                animateScale: true,
                animateRotate: true
            }
        }
    });

});

