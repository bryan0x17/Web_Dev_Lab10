const restaurantInspectionAPI = 'https://data.cityofnewyork.us/resource/43nn-pn8j.json';
const ratInspectionAPI = 'https://data.cityofnewyork.us/resource/p937-wjvj.json';
const cafeteriaInspectionAPI = 'https://data.cityofnewyork.us/resource/9hxz-c2kj.json';
const dataRequest = new XMLHttpRequest();
const asyncRequest = new XMLHttpRequest();

let data;
let resultTable;
let resultHeading;

// On load, sets event listeners for index page
function setMainListeners() {
    document.getElementById('ratButton').addEventListener('click', function() {selectData('data1.html')});
    document.getElementById('restoButton').addEventListener('click', function() {selectData('data2.html')});
    document.getElementById('schoolButton').addEventListener('click', function() {selectData('data3.html')});
}

// Requests the data[x].html page and the approriate JSON data
function selectData(typePage) {
	asyncRequest.onreadystatechange = loadData;
    asyncRequest.open("GET", typePage, true);
    asyncRequest.send();
    dataRequest.onreadystatechange = function() {
        if (dataRequest.readyState == 4 && dataRequest.status == 200) {
        data = JSON.parse(dataRequest.responseText);
        }
    };
    if (typePage === 'data1.html') {
        dataRequest.open('GET', ratInspectionAPI, true);
    } else if (typePage === 'data2.html') {
        dataRequest.open('GET', restaurantInspectionAPI, true);
    } else if (typePage === 'data3.html') {
        dataRequest.open('GET', cafeteriaInspectionAPI, true);
    }
    dataRequest.send();
}

// Inserts the appropriate page into index
function loadData() {
    if (asyncRequest.readyState == 4 && asyncRequest.status == 200) {
        document.getElementById('results').innerHTML = asyncRequest.responseText;
        setResultListeners();
    }   
}

// Sets the event listeners for the new page
function setResultListeners() {
    document.getElementById('firstCriteriaValue').addEventListener('input', search);
    document.getElementById('secondCriteriaValue').addEventListener('input', search);
    resultTable = document.getElementById('resultTable');
    resultHeading = document.getElementById('resultHeading');
}

// Searches the dataset based on the values entered in the search bars
function search() {
    // Clear the results table of old results every time new results are loaded
    clearSearch();
    let firstCriteria = document.getElementById('firstCriteriaName').textContent;
    let firstSearch = document.getElementById('firstCriteriaValue').value.toLowerCase();
    let secondSearch = document.getElementById('secondCriteriaValue').value.toLowerCase();
    // Store a new array of objects containing the filtered JSON data
    let returnedData = data;
    // If anything is entered into the borough search, filters all rows that match regardles of dataset
    if (secondSearch) {
        returnedData = returnedData.filter((element) => {
            if (element['boro']) {
                return element['boro'].toLowerCase().includes(secondSearch);
            } else if (element['borough']) {
                return element['borough'].toLowerCase().includes(secondSearch);
            }
        });
    }
    // First checks which dataset is being searched, then filters using the relevant key and calls the appropriate print function
    if (firstCriteria === 'Street') {
        if (firstSearch) {
            returnedData = returnedData.filter((element) => {
                if (element['street_name']) {
                    return element['street_name'].toLowerCase().includes(firstSearch);
                }
            });
        }
        printRatResults(returnedData);
    } else if (firstCriteria === 'Cuisine') {
        if (firstSearch) {
            returnedData = returnedData.filter((element) => {
                if (element['cuisine_description']) {
                    return element['cuisine_description'].toLowerCase().includes(firstSearch);
                }
            });
        }
        printRestoResults(returnedData);
    } else if (firstCriteria === 'School Name') {
        if (firstSearch) {
            returnedData = returnedData.filter((element) => {
                if (element['schoolname']) {
                    return element['schoolname'].toLowerCase().includes(firstSearch);
                }
            });
        }
        printSchoolResults(returnedData);
    }
    // Checks if both search bars are empty, and if so clears the result table
    if (!firstSearch && !secondSearch) {
        clearSearch();
    }
}

// Clears the result table
function clearSearch() {
    resultTable.innerHTML = '';
    resultHeading.className = 'hidden';
}

// Prints the results for the rat inspection table
function printRatResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['street_name']}</td>`;
        resultString += `<td>${element['house_number']}</td>`;
        resultString += `<td>${element['borough']}</td>`;
        resultString += `<td>${element['inspection_date']}</td>`;
        resultString += `<td>${element['result']}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Prints the results for the restaurant inspection table
function printRestoResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['dba']}</td>`;
        resultString += `<td>${element['boro']}</td>`;
        resultString += `<td>${element['street']}</td>`;
        resultString += `<td>${element['zipcode']}</td>`;
        resultString += `<td>${element['cuisine_description']}</td>`;
        resultString += `<td>${element['inspection_date']}</td>`;
        resultString += `<td>${element['violation_description']}</td>`;
        resultString += `<td>${element['critical_flag']}</td>`;
        resultString += '</tr>';
    });
    resultHeading.className = '';
    resultTable.innerHTML = resultString;
}

// Prints the results for the cafeteria inspection table
function printSchoolResults(results) {
    let resultString = '';
    results.forEach((element) => {
        resultString += '<tr>';
        resultString += `<td>${element['schoolname']}</td>`;
        resultString += `<td>${element['borough']}</td>`;
        resultString += `<td>${element['street']}</td>`;
        resultString += `<td>${element['zipcode']}</td>`;
        resultString += `<td>${element['inspectiondate']}</td>`;
        resultString += `<td>${element['violationdescription']}</td>`;
        resultString += '</tr>';
    });
    resultHeading.classNameName = '';
    resultTable.innerHTML = resultString;
}

setMainListeners();