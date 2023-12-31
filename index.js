var totalOptions = [];
var totalText = "";
var resultsTotal;
var pageLength;
const initialAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2023-10-30&active.lte=2023-12-30&category=sports&local_rank.gte=40&limit=50&sort=rank";
const baseAPIaddress = "https://api.predicthq.com/v1/events/?";
const initialAPIaddress_category_section = "&category=sports&local_rank.gte=40&limit=50&sort=rank"
const quickSearchLoadValue = 300;
var resultsTableSize = 10;
var itemsFetched = 0;

const todaysDate = new Date();
const currentDay = todaysDate.getDate();
const currentMonth = todaysDate.getMonth()+1;
const currentYear = todaysDate.getFullYear();
const nextYear = currentYear + 1;

if (currentDay < 10) {
    var dayString = currentDay.toString();
    currentDay = "0" + dayString;
    }

if (currentMonth < 10) {
    var monthString = currentMonth.toString();
    currentMonth = "0" + monthString;
    }

console.log("0.1 - Next Year : " + nextYear);
console.log("0.2 - Today's Date : " + todaysDate);
console.log("0.3 - Day of month : " + currentDay);
console.log("0.4 - Month of Year : " + currentMonth);

// 1. Connects to API when page is loaded.

$(document).ready(function () {
    // Add 'loading' gif
    $("#quick-search-button-wrapper").html(
        `<div id="loader">
            <img src="assets/images/loading.gif" alt="loading..." />
          </div>`);

    // Add 'Loading search options' text to Quick Search box 
    $("#quick-search-input-box").val("Loading search options .... ");
    
    // console.log($SPORTS_EVENT_PLANNER)
    let itemsFetched = 0;
    var initialPageLoad = "yes";

    // Set 'api type' to events 
    var apiType = "events";
    console.log("1.0 Page loaded - fetching data from API - fetch 1");

    //  Run the 'fetchAPIdata' function the first time of two (get )
    var fetchNum = 1
    fetchAPIdata(initialAPIaddress, apiType, initialPageLoad, fetchNum);
    console.log("1.1 Items Fetched: " + itemsFetched);

    // 
    var quickSearchLoaderAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2023-12-23&active.lte=2024-12-23&category=sports&local_rank.gte=40&limit=50&sort=rank";
    console.log("1.2 Page loaded - fetching 'quick Search' data from API - fetch 2");
    fetchNum = 2
    fetchAPIdata(quickSearchLoaderAPIaddress, apiType, initialPageLoad, fetchNum);

});


// 2. Handles API GET requests

function fetchAPIdata(apiAddress, apiType, initialPageLoad, fetchNum) {
    console.log("2.0 : fetching data from the following address : " + apiAddress);
    console.log("2.0 : Fetch Number : " + fetchNum);
    // Send token
    fetch(apiAddress, {
            headers: {
                Authorization: `Bearer 4JpR89I33_SDMlM3tLu1FYG4orSd5L44DVqKFKAN`
            }
        })

        // 
        .then(response => {
            console.log("2.1: Response.  Initial Page load? " + initialPageLoad);
            console.log("2.1: Response.  Fetch Number : " + fetchNum);
            return response.json();

        })

        // 
        .then((myContent) => {
            console.log("2.2: Content.  Initial Page load? " + initialPageLoad);
            console.log("2.2: Content.  Fetch Number : " + fetchNum);
            continuationFunction(myContent, apiType, initialPageLoad, fetchNum);
        })
        .catch(error => console.log(error))


}

// 3. fetchAPIdata function (see item 2.) dumps the API data into here.
// It then loops through each page of results 'pushing' the 'title' of each result into the 'options' array.

function continuationFunction(myContent, apiType, initialPageLoad, fetchNum) {
    let APItype = apiType;
    console.log(myContent);
    console.log("3. Continuation function.  Fetch Number: " +fetchNum)
    if (apiType === "places" && myContent === null) {
        console.log("6. Places Array not found.");
        return;
    } else if (APItype === "places") {
        console.log("7. Place Name waiting to be passed back to Filter Search Function : " + myContent.results[0].name);
        filtersContinuation(myContent)

    }
    pageLength = myContent.results.length;
    console.log("3. Page Length = " + pageLength);
    resultsTotal = myContent.count;
    itemsFetched += pageLength;
    console.log("3.1 Items Fetched = " + itemsFetched);
   
    if (itemsFetched <= 10 && apiType === "events") {
        createResultsTable(myContent);
    } else if (initialPageLoad === "yes") {
        (addQuickSearchOptions(myContent));
    }
}

// Create the results table once the data has been retrieved from the API


function createResultsTable(myContent) {
    let tableKeys = ["Event Title", "Start Date  dd/mm/yyyy", "End Date  dd/mm/yyyy", "Place Name", "Country", "Type", "Sub Type"];
    let tableHeaders = [];
    let tableRows = [];
    let tableData = [];

    tableKeys.forEach(header => {
        tableHeaders.push(`<th>${header}</th>`);
    });

    let pagination;
    console.log("Previous url: " + myContent.previous);
    console.log("Next url: " + myContent.next);
    if (myContent.previous || myContent.next) {
        pagination = generatePaginationButtons(myContent.previous, myContent.next);
    } else {
        pagination = `<p></p>`;
    }

    resultsTableSize = myContent.results.length;

    for (var i = 0; i < resultsTableSize; i++) {
        tableData.push(`<td>${myContent.results[i].title}</td>`);

        let strToShorten = myContent.results[i].start.toString();
        var reorderedString = cleanUpDates(strToShorten);
        tableData.push(`<td>${reorderedString}</td>`);

        strToShorten = myContent.results[i].end.toString();
        reorderedString = cleanUpDates(strToShorten);
        tableData.push(`<td>${reorderedString}</td>`);

        strToShorten = myContent.results[i].place_hierarchies[0, 0].toString();
        var shortenedString = strToShorten.substring(0, 7);
        tableData.push(`<td>${shortenedString}</td>`);

        tableData.push(`<td>${myContent.results[i].country}</td>`);

        myContent.results[i].labels.forEach(label => {
            if (label != "sport") {
                tableData.push(`<td>${label}</td>`);
            }
        });

        tableRows.push(`<tr>${tableData}</tr>`);

        tableData = [];

    }

    document.getElementById("data").innerHTML = `<div id=paginationButtons>${pagination}</div><table id="resultsTable">${tableHeaders}${tableRows}</table>`.replace(/,/g, "");
}

// Creates Pagination Buttons and inserts the HTML onto the page under the Filters section.

function generatePaginationButtons(previous, next) {
    console.log("3. 'Next' variable = : " + next);
    console.log("3. 'Previous' variable = : " + previous);
    if (next && previous) {
        return `<button class="btn btn-success mb-2" onclick="clickedPaginationButton('${previous}')">Previous</button>
                <button class="btn btn-success mb-2" onclick="clickedPaginationButton('${next}')">Next</button>`;
    } else if (!next && previous) {
        return `<button class="btn btn-success mb-2" onclick="clickedPaginationButton('${previous}')">Previous</button>`;
    } else if (next && !previous) {
        return `<button class="btn btn-success mb-2" onclick="clickedPaginationButton('${next}')">Next</button>`;
    } else {
        return `<p>Nothing to see...</p>`;
    }
}

// Takes raw 'date' data from API and converts it into dd/mm/yyy format

function cleanUpDates(strToShorten) {
    let shortenedString = strToShorten.substring(0, 10);

    let reorderedString = "";

    reorderedString = reorderedString.concat(shortenedString[8]);
    reorderedString = reorderedString.concat(shortenedString[9]);
    reorderedString = reorderedString.concat(shortenedString[7]);
    reorderedString = reorderedString.concat(shortenedString[5]);
    reorderedString = reorderedString.concat(shortenedString[6]);
    reorderedString = reorderedString.concat(shortenedString[4]);
    reorderedString = reorderedString.concat(shortenedString[0]);
    reorderedString = reorderedString.concat(shortenedString[1]);
    reorderedString = reorderedString.concat(shortenedString[2]);
    reorderedString = reorderedString.concat(shortenedString[3]);

    return reorderedString;
}

// Makes a request to the API for the 250 biggest events in the coming year and adds them as filter options to the 'Quick Search' button.

function addQuickSearchOptions(myContent) {
    for (var iter = 0, len = myContent.results.length, text = "", options = []; iter < len; iter++) {
        text += myContent.results[iter].title + "  : Rank - " + myContent.results[iter].local_rank + "<br>";
        options.push(myContent.results[iter].title);
    }

    totalOptions = totalOptions.concat(options);
    totalText = totalText.concat(text);

    if (itemsFetched >= quickSearchLoadValue || itemsFetched >= resultsTotal) {

        // jQuery 'Autocomplete' function  ----  populates the 'Quick Search' text box with the results   //removed
    // of the initial API request to give potential events for the user to select from or ignore as required.  //removed

        $(function autocompleteQuickSearchBox() {
            var quickSearchList = totalOptions;
            $("#quick-search-input-box").autocomplete({
                source: quickSearchList
            });
        });
        $("#quick-search-button-wrapper").html(
            `<button type="button" onclick="retrieveChosenEventDetails()" id="quick-search-button"
              class="btn btn-success mb-2">Quick Search</button>`
        );
        $("#quick-search-input-box").val("");

    } else {
        fetchAPIdata(myContent.next, "events", "yes");

    }
}

function clickedPaginationButton(apiAddress) {
    itemsFetched = 0;
    fetchAPIdata(apiAddress, "events", "no");
}

// Get the text typed into the 'Quick Search' box by the User (happens when the User clicks the 'Search Button' in the Nav Bar).

function retrieveChosenEventDetails() {
    var searchItem = document.getElementById("quick-search-input-box").value;
    console.log("4. User Search Request: " + searchItem);
    var d = new Date();
    var currentDay = d.getDate();
    var currentMonth = d.getMonth() + 1;
    var currentYear = d.getFullYear();
    var nextYear = currentYear + 1;
    itemsFetched = 0;
    console.log("4.1 Next Year : " + nextYear);
    console.log("5. Date: " + d);
    if (currentDay < 10) {
        var dayString = currentDay.toString();
        currentDay = "0" + dayString;
    }
    if (currentMonth < 10) {
        var monthString = currentMonth.toString();
        currentMonth = "0" + monthString;
    }

    //  1. Build a query using the user's selected event (retrieved from the 'Quick Search' box ie. it's '.value')

    var apiQueryAddress = baseAPIaddress + "active.gte=" + currentYear + "-" + currentMonth + "-" + currentDay + "&active.lte=" + nextYear + "-" + currentMonth + "-" + currentDay + "&category=sports&local_rank.gte=40&limit=10&q=" + searchItem + "+&sort=start";

    console.log("6. Query Address: " + apiQueryAddress);

    fetchAPIdata(apiQueryAddress, "events", "no");

}


// Take the user's 'City' Filter Buttons input and obtains the global coordinates.

function buildFilterSearchQuery() {

    var countryFilter = "";
    var cityFilter = "";
    var countryId = "";
    itemsFetched = 0;


    if (document.getElementById("country-filter").value != "") {
        countryFilter = document.getElementById("country-filter").value;
        countryId = countryFilter.substr(0, 2);
        console.log("Country Filter value : " + countryId);
        countryId = 'country=' + countryId;
    }

    if (document.getElementById("city-filter").value != "") {
        cityFilter = document.getElementById("city-filter").value;
        console.log("City Filter value : " + cityFilter);
        cityFilter = 'q=' + cityFilter;
    }

    var placesBaseAPIaddress = "https://api.predicthq.com/v1/places/?";
    var queryURL = "";

    if (countryId != "" && cityFilter != "") {
        queryURL = placesBaseAPIaddress + countryId + "&" + cityFilter + '&limit=10';
    } else if (countryId != "" && cityFilter === "") {
        queryURL = placesBaseAPIaddress + countryId + '&limit=10';
    } else if (countryId === "" && cityFilter != "") {
        queryURL = placesBaseAPIaddress + cityFilter + '&limit=10';
    }

    if (countryId != "" || cityFilter != "") {
        fetchAPIdata(queryURL, "places", "no");
    }

}


// Once global coordinates obtained, feed in the remaining Filter Button inputs to generate an API request/search URL

function filtersContinuation(myContent) {


    console.log("9.5 - array passed to Filter function", myContent);

    var startDateFilter = "";
    var endDateFilter = "";
    var convertedStartDateFilter = "";
    var convertedEndDateFilter = "";
    var sportFilter = "";
    var teamCompetitorFilter = "";
    var competitionFilter = "";
    var latitude = 0;
    var longitude = 0;
    var countryId = "";
    var latLongQuery = "";
    itemsFetched = 0;


    latitude = myContent.results[0].location[1];
    longitude = myContent.results[0].location[0];
    var placeName = myContent.results[0].name;

    console.log("Latitude : " + latitude);
    console.log("Longitude : " + longitude);
    console.log("Place Name : " + placeName);

    if (document.getElementById("start-date-filter").value === "" &&
        document.getElementById("end-date-filter").value === "" &&
        document.getElementById("sport-filter").value === "" && 
        document.getElementById("team-competitor-filter").value === "" &&
        document.getElementById("competition-filter").value === "" &&
        document.getElementById("country-filter").value === "" &&
        document.getElementById("city-filter").value === "") {

        alert("Please enter a value in at least one Filter.");
        // $('#myModal').modal(options);
        // document.getElementById('id01').style.display='block' 
        // document.getElementById('id01').class='w3-button w3-black';   

    } else {

        let filterArray = [];

        if (document.getElementById("start-date-filter").value != "") {
            startDateFilter = document.getElementById("start-date-filter").value;
            var startDateDay = startDateFilter.substr(0, 2);
            var startDateMonth = startDateFilter.substr(3, 2);
            var startDateYear = startDateFilter.substr(6, 4);
            convertedStartDateFilter = 'active.gte=' + startDateYear + '-' + startDateMonth + '-' + startDateDay;
            console.log("Converted Start Date Filter value : " + convertedStartDateFilter);

            filterArray.push(convertedStartDateFilter);

        }

        if (document.getElementById("end-date-filter").value != "") {
            endDateFilter = document.getElementById("end-date-filter").value;
            var endDateDay = endDateFilter.substring(0, 2);
            var endDateMonth = endDateFilter.substring(3, 5);
            var endDateYear = endDateFilter.substring(6);
            convertedEndDateFilter = 'active.lte=' + endDateYear + '-' + endDateMonth + '-' + endDateDay;
            console.log("Converted End Date Filter value : " + convertedEndDateFilter);
            filterArray.push(convertedEndDateFilter);
        }

        if (document.getElementById("sport-filter").value != "") {
            sportFilter = document.getElementById("sport-filter").value;
            sportFilter = 'label=' + sportFilter;
            console.log("Sport Filter value : " + sportFilter);
            filterArray.push(sportFilter);
        }

        if (document.getElementById("team-competitor-filter").value != "") {
            teamCompetitorFilter = document.getElementById("team-competitor-filter").value;
            teamCompetitorFilter = '?=' + teamCompetitorFilter;
            console.log("Team/Competitor Filter value : " + teamCompetitorFilter);
            filterArray.push(teamCompetitorFilter);
        }

        if (document.getElementById("competition-filter").value != "") {
            competitionFilter = document.getElementById("competition-filter").value;
            competitionFilter = '?=' + competitionFilter;
            console.log("Competition Filter value : " + competitionFilter);
            filterArray.push(competitionFilter);
        }

        if (document.getElementById("country-filter").value != "") {
            var countryFilter = document.getElementById("country-filter").value;
            countryId = countryFilter.substr(0, 2);
            countryId = 'country=' + countryId;
            console.log("Country Filter value : " + countryId);
            filterArray.push(countryId);
        }

        if (document.getElementById("city-filter").value != "") {
            var cityFilter = document.getElementById("city-filter").value;
            cityID = 'country=' + countryId;
            console.log("Country Filter value : " + countryId);
            filterArray.push(countryId);
        }

        if (latitude != 0 && longitude != 0) {
            latLongQuery = "location_around.origin=" + latitude + "%2C" + longitude + "&location_around.scale=30km";
            filterArray.push(latLongQuery);
        }

        let filterQueryString = baseAPIaddress;

        filterArray.forEach(filterSelection => {
            filterQueryString += filterSelection;
            filterQueryString += '&';
        });

        filterQueryString = filterQueryString + "category=sports&limit=10&sort=start";
        console.log("10. Filter Query string : " + filterQueryString);

        myContent = [];
        console.log("Content should now be cleared:", myContent);

        fetchAPIdata(filterQueryString, "events", "no");

        continuationFunction (myContent, "events", "no");
    }
}