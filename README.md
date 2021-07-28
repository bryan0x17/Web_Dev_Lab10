SAIT Web Development (CPRG256) Lab 10

Many organizations, including agencies and municipalities are using open API’s to share data and are freely accessible to the public. For example, here is the link to the New York City open data site: https://data.cityofnewyork.us. Hundreds of datasets can be accessed through this site. The datasets typically contain JSON files that can be accessed and searched.

The dataset JSON files are accessed using an AJAX call. Here is an example, using JSON file containing traffic accident information:

xhr.onreadystatechange = function() {
    if (xhr.readyState == 4 && xhr.status == 200) {
     parsedrecord = JSON.parse(xhr.responseText);
      
    }
  };
  xhr.open("GET", "https://data.cityofnewyork.us/resource/h9gi-nx95.json", true);
  xhr.send();

Here is a sample of the JSON file:

{
        "crash_date": "2018-10-15T00:00:00.000",
        "crash_time": "8:00",
        "latitude": "40.6365470",
        "longitude": "-73.9258400",
        "location": {
            "latitude": "40.636547",
            "longitude": "-73.92584"
        },
        "on_street_name": "EAST 53 STREET                  ",
        "off_street_name": "KINGS HIGHWAY",
        "number_of_persons_injured": "0",
        "number_of_persons_killed": "0",
        "number_of_pedestrians_injured": "0",
        "number_of_pedestrians_killed": "0",
        "number_of_cyclist_injured": "0",
        "number_of_cyclist_killed": "0",
        "number_of_motorist_injured": "0",
        "number_of_motorist_killed": "0",
        "contributing_factor_vehicle_1": "Backing Unsafely",
        "contributing_factor_vehicle_2": "Driver Inattention/Distraction",
        "collision_id": "4001073",
        "vehicle_type_code1": "Sedan",
        "vehicle_type_code2": "Sedan"}

Go to the https://data.cityofnewyork.us site and find three data sets that are of interest to you.

Create three html pages: data1.html, data2.html and data3.html and the necessary JavaScript files. Each page will contain a form that will allow a search on two data fields. Use ‘onkeyup’ event handlers to generate search solutions as data is being entered in. The individual data records will likely contain a great deal of information; you do not have to display all the data fields, just the most relevant.
