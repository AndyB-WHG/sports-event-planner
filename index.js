var totalOptions = [];
var totalText = "";
var resultsTotal;
var pageLength;
const initialAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2021-06-20&active.lte=2022-06-20&category=sports&local_rank.gte=40&limit=10&sort=rank";
const baseAPIaddress = "https://api.predicthq.com/v1/events/?";
const quickSearchLoadValue = 300;
var resultsTableSize = 10;
var itemsFetched = 0;



// 1. Connects to API when page is loaded.

$(document).ready(function () {
    $("#quick-search-button-wrapper").html(
        `<div id="loader">
            <img src="assets/images/loading.gif" alt="loading..." />
          </div>`);
    $("#quick-search-input-box").val("Loading search options .... ");
    let itemsFetched = 0;
    var apiType = "events";
    fetchAPIdata(initialAPIaddress, apiType);
    console.log("1. Items Fetched: " + itemsFetched);
    var quickSearchLoaderAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2021-06-20&active.lte=2022-06-20&category=sports&local_rank.gte=40&limit=50&sort=rank";
    fetchAPIdata(quickSearchLoaderAPIaddress, apiType);

});


// 2. Handles API GET requests

function fetchAPIdata(apiAddress, apiType) {
    console.log("2.0 : " + apiAddress);
    fetch(apiAddress, {
            headers: {
                Authorization: `Bearer w1Fryp6ndPrExYWAQc8Wr5Y8Sp4_4ac0cQFeFQks`
            }
        })
        .then(response => {
            console.log("2.1");
            return response.json();

        })
        .then((myContent) => {
            console.log("2.2");
            continuationFunction(myContent, apiType);
        })
        .catch(error => console.log(error))


}

// 3. fetchAPIdata function (see item 2.) dumps the API data into here.
// It then loops through each page of results 'pushing' the 'title' of each result into the 'options' array.

function continuationFunction(myContent, apiType) {
    let APItype = apiType;
    console.log(myContent);
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
    // let fullAPI = [];        //removed
    // fullAPI = myContent; //removed
    // myContent = myContent.results;
    // console.log("Full API : " + fullAPI); //removed
    // console.log("myContent : " + myContent); //removed




    // console.log("4. Text : " + text);  //removed
    // console.log("11. Items fetched : " + itemsFetched);  //removed
    // console.log("12. Total results : " + resultsTotal);  //removed

    // console.log("Total Text : " + totalText);  //removed
    // document.getElementById("map").innerHTML = totalText;  //removed

    // localStorage.setItem('apiData', options);

    // if (itemsFetched >= resultsTableSize) {  //removed


    if (itemsFetched <= 10) {
        createResultsTable(myContent);
    } else {
        (addQuickSearchOptions(myContent));
    }

    // while (itemsFetched < quickSearchLoadValue && itemsFetched < myContent.count) {
    //     fetchAPIdata(nextPage, itemsFetched, quickSearchLoadValue);
    //     addQuickSearchOptions;
    // } 

    // Create list of options for 'Quick Search' input box then push them into the 'options' array. //removed



    // }  //removed

    // if (itemsFetched < resultsTotal && itemsFetched < quickSearchLoadValue && initialPageLoad === "yes") {  //removed
    //     // console.log("13. Next Page address : " + nextPage);  //removed
    //     // console.log("14. " + nextPage); //removed
    //     fetchAPIdata(nextPage, itemsFetched, "yes");  //removed

    // }

    // If the API data is part of the initial 'Page Loading' process then convert the results into selectable option in the 'Quick Search' box.

    // if (initialPageLoad === "yes") {  //removed

    // jQuery 'Autocomplete' function  ----  populates the 'Quick Search' text box with the results   //removed
    // of the initial API request to give potential events for the user to select from or ignore as required.  //removed

    //     $(function autocompleteQuickSearchBox() {  //removed
    //         totalOptions = totalOptions.concat(options);  //removed
    //         // console.log("10. Total Options are: " + totalOptions);  //removed
    //         var quickSearchList = totalOptions;  //removed
    //         $("#quick-search-input-box").autocomplete({  //removed
    //             source: quickSearchList  //removed
    //         });  //removed
    //     });  //removed

    // }  //removed

    // if (initialPageLoad === "yes") {   //removed
    //     $("#quick-search-input-box").val("Please Enter Team or Competition Name");   //removed
    // }   //removed

    // if (itemsFetched === resultsTotal || itemsFetched >= quickSearchLoadValue || initialPageLoad === "no") {   //removed
    //     // document.getElementById("map").innerHTML = totalText;   
    //     itemsFetched = 0; // resets the variable ready for the next search request.   //removed
    //     totalText = "";   //removed
    // }  //removed
}



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


    // if (myContent.results.length < 10) {
    resultsTableSize = myContent.results.length;
    // }

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

function addQuickSearchOptions(myContent) {
    for (var iter = 0, len = myContent.results.length, text = "", options = []; iter < len; iter++) {
        text += myContent.results[iter].title + "  : Rank - " + myContent.results[iter].local_rank + "<br>";
        options.push(myContent.results[iter].title);
    }

    totalOptions = totalOptions.concat(options);
    totalText = totalText.concat(text);

    // If the API data is part of the initial 'Page Loading' process then convert the results into selectable options in the 'Quick Search' box.



    // jQuery 'Autocomplete' function  ----  populates the 'Quick Search' text box with the results   //removed
    // of the initial API request to give potential events for the user to select from or ignore as required.  //removed

    if (itemsFetched >= quickSearchLoadValue || itemsFetched >= resultsTotal) {

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
        fetchAPIdata(myContent.next, "events");

    }
}

function clickedPaginationButton(apiAddress) {
    itemsFetched = 0;
    fetchAPIdata(apiAddress, itemsFetched);
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

    //  1. Build a query using the users selected event (retrieved from the 'Quick Search' box ie. it's '.value')

    var apiQueryAddress = baseAPIaddress + "active.gte=" + currentYear + "-" + currentMonth + "-" + currentDay + "&active.lte=" + nextYear + "-" + currentMonth + "-" + currentDay + "&category=sports&local_rank.gte=40&limit=10&q=" + searchItem + "+&sort=rank";

    console.log("6. Query Address: " + apiQueryAddress);

    fetchAPIdata(apiQueryAddress, "events");

}


function buildFilterSearchQuery() {

    var countryFilter = "";
    var cityFilter = "";
    var countryId = "";


    if (document.getElementById("country-filter").value != "") {
        countryFilter = document.getElementById("country-filter").value;
        countryId = countryFilter.substr(0, 2);
        console.log("Country Filter value : " + countryId);
        countryId = 'country=' + countryId;
    }

    if (document.getElementById("city-filter").value != "") {
        var cityFilter = document.getElementById("city-filter").value;
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
        fetchAPIdata(queryURL, "places")
    };

}




function filtersContinuation(myContent) {


    console.log("9.5 - array passed to Filter function", myContent);
    
    var startDateFilter = "";
    var endDateFilter = "";
    var convertedStartDateFilter = "";
    var convertedEndDateFilter = "";
    var sportFilter = "";
    var teamCompetitorFilter = "";
    var competitionFilter = "";

    console.log("9.7 - array passed to filter3 function", myContent.results[0].name);

    if (document.getElementById("start-date-filter").value === "" &&
        document.getElementById("end-date-filter").value === "" &&
        document.getElementById("sport-filter").value === "" && document.getElementById("start-date-filter").value === "" &&
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
            console.log("Sport Filter value : " + sportFilter);
            sportFilter = 'label=' + sportFilter;
            filterArray.push(sportFilter);
        }

        if (document.getElementById("team-competitor-filter").value != "") {
            teamCompetitorFilter = document.getElementById("team-competitor-filter").value;
            console.log("Team/Competitor Filter value : " + teamCompetitorFilter);
            teamCompetitorFilter = '?=' + teamCompetitorFilter;
            filterArray.push(teamCompetitorFilter);
        }

        if (document.getElementById("competition-filter").value != "") {
            var competitionFilter = document.getElementById("competition-filter").value;
            console.log("Competition Filter value : " + competitionFilter);
            competitionFilter = '?=' + competitionFilter;
            filterArray.push(competitionFilter);
        }

        // build API query string

        // eg. https://api.predicthq.com/v1/events/?active.gte=2021-06-20&active.lte=2022-06-20&category=sports&local_rank.gte=40&limit=100&sort=rank"

        let eventsBaseAPIaddress = "https://api.predicthq.com/v1/events/?";
        let filterQueryString = baseAPIaddress;

        filterArray.forEach(filterSelection => {
            filterQueryString += filterSelection;
            filterQueryString += '&';
        });

        console.log("10. Filter Query string : " + filterQueryString);




    }
}

function convertPlaceIDsToNames(placeID) {

}