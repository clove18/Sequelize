/*Code for inserting table to data adapted from 
https://www.aspsnippets.com/Articles/Convert-JSON-data-to-HTML-Table-using-JavaScript.aspx */

function addData(data, macroName) {
  tempArray = [];
  for (let i = 0; i < data.length; i++) {
    tempArray.push({
      x: i,
      y: data[i][macroName],
      label: data[i].meal_name,
    });
  }
  return tempArray;
}
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
}

async function windowActions() {
  const meals = await fetch("/api/meals").then((blob) => blob.json());
  const mealMacrosReq = await fetch("/api/mealMacros");
  const mealMacros = await mealMacrosReq.json();
  console.log(mealMacros);
  const mealArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selected = mealArray.map((element) => {
    const random = getRandomIntInclusive(0, mealMacros.data.length - 1);
    return mealMacros.data[random];
  });
  console.log(selected);

  const dataPointsCal = [];
  dataPointsCal.push(addData(selected, (macroName = "calories")));

  const dataPointsCho = [];
  dataPointsCho.push(addData(selected, (macroName = "cholesterol")));

  const dataPointsSod = [];
  dataPointsSod.push(addData(selected, (macroName = "sodium")));

  const dataPointsPro = [];
  dataPointsPro.push(addData(selected, (macroName = "protein")));

  const dataPointsFat = [];
  dataPointsFat.push(addData(selected, (macroName = "fat")));

  const dataPointsCar = [];
  dataPointsCar.push(addData(selected, (macroName = "carbs")));

  const dataPointsSer = [];
  dataPointsSer.push(addData(selected, (macroName = "serving_size")));

  const chart = new CanvasJS.Chart("chartContainer", {
    animationEnabled: true,
    title: {
      text: "Meal Macros",
    },
    axisX: {
      interval: 1,
      label: "Meals",
    },
    axisY: {
      label: "Macros",
    },
    data: [
      {
        type: "stackedBar",
        name: "Calories",
        showInLegend: "true",
        dataPoints: dataPointsCal[0],
      },
      {
        type: "stackedBar",
        name: "Cholesterol",
        showInLegend: "true",
        dataPoints: dataPointsCho[0],
      },
      {
        type: "stackedBar",
        name: "Sodium",
        showInLegend: "true",
        dataPoints: dataPointsSod[0],
      },
      {
        type: "stackedBar",
        name: "Protein",
        showInLegend: "true",
        dataPoints: dataPointsPro[0],
      },
      {
        type: "stackedBar",
        name: "Fat",
        showInLegend: "true",
        dataPoints: dataPointsFat[0],
      },
      {
        type: "stackedBar",
        name: "Carbs",
        showInLegend: "true",
        dataPoints: dataPointsCar[0]
    },
    {
        type: "stackedBar",
        name: "Serving Size",
        showInLegend: "true",
        dataPoints: dataPointsSer[0]
    }
    ]
  });

  chart.render();

  console.log(dataPointsCal);
  // Get response from server
  const objectArray = [];
  const dining = await fetch("/api/dining").then((blob) => blob.json());
  objectArray.push(...dining["data"]);
  // Create array of strings
  hallArray = [];
  const headers = Object.keys(objectArray[0]);
  hallArray.push(headers);
  console.log(hallArray);
  for (let i = 0; i < objectArray.length; i++) {
    const values = Object.values(objectArray[i]);
    hallArray.push(values);
    console.log(values);
  }
  console.log(hallArray);
  console.log(dining);
  console.log(objectArray);

  //Get the count of columns.
  const table = document.getElementById("table");
  const columnCount = hallArray.length - 1;

  //Add the header row.
  var row = table.insertRow(-1);
  for (var i = 0; i < columnCount; i++) {
    var headerCell = document.createElement("TH");
    headerCell.innerHTML = hallArray[0][i];
    row.appendChild(headerCell);
  }

  //Add the data rows.
  for (var i = 1; i < hallArray.length; i++) {
    row = table.insertRow(-1);
    for (var j = 0; j < columnCount; j++) {
      var cell = row.insertCell(-1);
      cell.innerHTML = hallArray[i][j];
    }
  }
}
window.onload = windowActions;
