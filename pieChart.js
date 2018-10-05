/**
 * Created by faiyaz on 10/15/2015.
 */
(function(){var canvas = document.getElementById("canvas"),
    context = canvas.getContext("2d"),
    width = canvas.width = window.innerWidth,
    height = canvas.height = window.innerHeight,
    colorArray = ["GreenYellow", "yellow", "GoldenRod", "orchid","AquaMarine","crimson"],
    radius = 300,
    jsonObj = {
        "companies": [
            {
                "name": "google",
                "rvalue":" 10000"
            },
            {
                "name": "facebook",
                "rvalue": "20000"
            },
            {
                "name": "mathDisk",
                "rvalue": "30000"
            },
            {
                "name": "innoArt",
                "rvalue": "5000"
            },
            {
                "name":"adobe",
                "rvalue":"12000"
            },
            {
                "name":"oracle",
                "rvalue":"7000"
            }
        ]
    },
    percentArray = [],
    mapArray=[],
    lastPosition = 0,
    total = 0;
    context.font = "30px serif";
    context.fillStyle = "maroon";
    context.translate(width / 2, height / 2);
    function drawChartCircle() {
        context.save();
        context.lineWidth = 12;
        context.beginPath();
        context.arc(0, 0, radius, 0, 2 * Math.PI);
        context.strokeStyle = "MidnightBlue";
        context.stroke();
        context.closePath();
        context.beginPath();
        context.arc(0, 0, 3, 0, 2 * Math.PI);
        context.strokeStyle = "red";
        context.stroke();
        context.closePath();
        context.restore();
    }
    function angleToRadian(angle) {
        var radian = (angle * Math.PI ) / 180;
        return radian;
    }
    function norm(value, min, max) {
        return (value - min) / (max - min);
    }
    function lerp(norm, min, max) {
        return (max - min) * norm + min;
    }
    function map(value, sourceMin, sourceMax, destMin, destMax) {
        return lerp(norm(value, sourceMin, sourceMax), destMin, destMax);
    }
    function findPercent() {
        for(var i=0;i<jsonObj.companies.length;i++){
            total+=Math.floor(parseInt(jsonObj.companies[i].rvalue));
        }
        for(var j=0;j<jsonObj.companies.length;j++) {
            var pushElm = (parseInt((jsonObj.companies[j].rvalue))/total)*100;
            percentArray.push(pushElm.toFixed(3));
        }
        console.log(percentArray);
    }

    function drawPieChart() {
        findPercent();
        for (var i = 0; i < percentArray.length; i++) {
            mapArray.push(map(percentArray[i], 0, 100, 0, 360));
        }
        console.log(mapArray);
        for(var j=0;j<mapArray.length;j++){
            context.save();
            context.beginPath();
            context.moveTo(0,0);
            context.arc(0,0,radius,angleToRadian(lastPosition),angleToRadian(lastPosition+mapArray[j]));
            context.fillStyle=colorArray[j];
            context.fill();
            context.closePath();
            context.restore();
            context.save();
            context.rotate(angleToRadian(lastPosition+mapArray[j]));
            context.textAlign = "right";
            var fontSize = 15;
            context.font = fontSize + "pt Helvetica";
            context.fillText(jsonObj.companies[j].name+" "+jsonObj.companies[j].rvalue,270,-10 );
            context.restore();
            lastPosition+=mapArray[j];
        }

    }
    drawChartCircle();
    drawPieChart();
})();
