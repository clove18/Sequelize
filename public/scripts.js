/*Code for inserting table to data adapted from 
https://www.aspsnippets.com/Articles/Convert-JSON-data-to-HTML-Table-using-JavaScript.aspx */

async function windowActions(){
    // Get response from server
    const objectArray = [];
    const dining = await fetch("/api/dining")
    .then((blob) => blob.json());
    objectArray.push(...dining['data']);
    // Create array of strings
    hallArray = [];
    const headers = Object.keys(objectArray[0]);
    hallArray.push(headers);
    console.log(hallArray);
    for (let i = 0; i < objectArray.length; i++){
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