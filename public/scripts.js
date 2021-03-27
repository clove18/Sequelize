

async function windowActions(){
    const diningArray = [];
    const dining = await fetch("/api/dining")
    .then((blob) => blob.json());
    diningArray.push(...dining['data']);
    hallArray = [];
    const headers = Object.keys(diningArray[0]);
    hallArray.push(headers);
    console.log(hallArray);
    for (let i = 0; i < diningArray.length; i++){
       const values = Object.values(diningArray[i]);
       hallArray.push(values);
       console.log(values);

    }
    console.log(hallArray);
    console.log(dining);
    console.log(diningArray);

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