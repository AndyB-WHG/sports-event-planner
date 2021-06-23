var totalOptions = [];
var totalText = "";
var resultsTotal;
var pageLength;
// var itemsFetched = 0;
const initialAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2021-06-20&active.lte=2022-06-20&category=sports&local_rank.gte=40&limit=10&sort=rank";
var APIaddress = "";
var nextPage = "";
const baseAPIaddress = "https://api.predicthq.com/v1/events/?"
var initialPageLoad = "yes";
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
    // APIaddress = initialAPIaddress;
    // console.log("1. " + initialAPIaddress)
    let itemsFetched = 0;
    var apiType = "events";
    fetchAPIdata(initialAPIaddress, apiType);
    // populateQuickSearchBox(initialAPIaddress);
    console.log("1. Items Fetched: " + itemsFetched);
    var quickSearchLoaderAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2021-06-20&active.lte=2022-06-20&category=sports&local_rank.gte=40&limit=50&sort=rank";
    fetchAPIdata(quickSearchLoaderAPIaddress, apiType);

});


// 2. Handles API GET requests

function fetchAPIdata(apiAddress, apiType) {
    // if (initialPageLoad === "yes") {   // removed
    //     $("#quick-search-input-box").val("Loading......");
    // }  // removed
    // if (apiAddress != initialAPIaddress) {
    //     queryAddress = apiAddress;
    //     object.freeze(queryAddress);
    // }
    console.log("2.5 : " + apiAddress);
    fetch(apiAddress, {
            headers: {
                Authorization: `Bearer w1Fryp6ndPrExYWAQc8Wr5Y8Sp4_4ac0cQFeFQks`
            }
        })
        .then(response => {
            return response.json();

        })
        .then((myContent) => {
            // console.log("3. " + myContent.results);
            // myContent = myContent;
            continuationFunction(myContent, apiType);
        });

}

// 3. fetchAPIdata function (see item 2.) dumps the API data into here.
// It then loops through each page of results 'pushing' the 'title' of each result into the 'options' array.

function continuationFunction(myContent, apiType) {
    // console.log("3.5 Content before 'Count' (line20)" + myContent);
    // console.log("4. Count =" + myContent.count);
    var nextPage = myContent.next;
    let APItype = apiType;
    console.log(myContent);
    if (apiType = "places" && myContent === null) {
        console.log("6. Places Array not found.");
        return;
    } else if (APItype === "places") {
        return (myContent);
    }

    // console.log("5. Next page address : " + nextPage);
    // console.log("6. Type of Next Page : " + typeof nextPage)
    pageLength = myContent.results.length;
    console.log("3. Page Length = " + pageLength);
    // console.log("7. Page length : " + pageLength);
    // console.log("8. Page Length type : " + typeof pageLength);
    resultsTotal = myContent.count; //removed
    itemsFetched += pageLength; //removed
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
        (addQuickSearchOptions(myContent))
    };

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
    console.log("Previous url: " + myContent.previous)
    console.log("Next url: " + myContent.next)
    if (myContent.previous || myContent.next) {
        pagination = generatePaginationButtons(myContent.previous, myContent.next);
    } else {
        pagination = `<p></p>`;
    }

    // apiResults.forEach(result => {
    //     tableData.push(`<td>${result.title}</td>`);

    //     let strToShorten = result.start.toString();
    //     reorderedString = cleanUpDates(strToShorten);
    //     tableData.push(`<td>${reorderedString}</td>`);

    //     strToShorten = result.end.toString();
    //     reorderedString = cleanUpDates(strToShorten);
    //     tableData.push(`<td>${reorderedString}</td>`);

    //     strToShorten = result.place_hierarchies[0, 0].toString();
    //     shortenedString = strToShorten.substring(0, 7);
    //     tableData.push(`<td>${shortenedString}</td>`);

    //     tableData.push(`<td>${result.country}</td>`);

    //     for (i = 0, len = result.labels.length; i < len; i++) {
    //         if (result.labels[i] != "sport") {
    //             tableData.push(`<td>${result.labels[i]}</td>`);
    //         }
    //     }

    //     tableRows.push(`<tr>${tableData}</tr>`);

    //     tableData = [];

    // })

    if (myContent.results.length < 10) {
        resultsTableSize = myContent.results.length;
    }

    for (i = 0; i < resultsTableSize; i++) {
        tableData.push(`<td>${myContent.results[i].title}</td>`);

        let strToShorten = myContent.results[i].start.toString();
        reorderedString = cleanUpDates(strToShorten);
        tableData.push(`<td>${reorderedString}</td>`);

        strToShorten = myContent.results[i].end.toString();
        reorderedString = cleanUpDates(strToShorten);
        tableData.push(`<td>${reorderedString}</td>`);

        strToShorten = myContent.results[i].place_hierarchies[0, 0].toString();
        shortenedString = strToShorten.substring(0, 7);
        tableData.push(`<td>${shortenedString}</td>`);

        tableData.push(`<td>${myContent.results[i].country}</td>`);

        myContent.results[i].labels.forEach(label => {
            if (label != "sport") {
                tableData.push(`<td>${label}</td>`);
            }
        })

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
    let shortStrLength = shortenedString.length;
    let reorderedString = "";
    // console.log("Shortened date string : " + shortenedString)
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
    // console.log("reordered date string : " + reorderedString);

    return reorderedString;
}

function addQuickSearchOptions(myContent) {
    for (iter = 0, len = myContent.results.length, text = "", options = []; iter < len; iter++) { //removed
        text += myContent.results[iter].title + "  : Rank - " + myContent.results[iter].local_rank + "<br>"; //removed
        options.push(myContent.results[iter].title); //removed
    } //removed   

    totalOptions = totalOptions.concat(options);
    totalText = totalText.concat(text); //removed

    // If the API data is part of the initial 'Page Loading' process then convert the results into selectable option in the 'Quick Search' box.

    // if (initialPageLoad === "yes") {  //removed

    // jQuery 'Autocomplete' function  ----  populates the 'Quick Search' text box with the results   //removed
    // of the initial API request to give potential events for the user to select from or ignore as required.  //removed

    if (itemsFetched >= quickSearchLoadValue || itemsFetched >= resultsTotal) {

        $(function autocompleteQuickSearchBox() { //removed
            //removed
            // console.log("10. Total Options are: " + totalOptions);  //removed
            var quickSearchList = totalOptions; //removed
            $("#quick-search-input-box").autocomplete({ //removed
                source: quickSearchList //removed
            }); //removed
        }); //removed
        $("#quick-search-button-wrapper").html(
            `<button type="button" onclick="retrieveChosenEventDetails()" id="quick-search-button"
              class="btn btn-success mb-2">Quick Search</button>`
        );
        $("#quick-search-input-box").val("");

    } else {
        fetchAPIdata(myContent.next, apiType="events");

    } //removed
}

function clickedPaginationButton(apiAddress) {
    // initialPageLoad = "no";   //removed
    itemsFetched = 0;
    fetchAPIdata(apiAddress, itemsFetched);
}

// Get the text typed into the 'Quick Search' box by the User (happens when the User clicks the 'Search Button' in the Nav Bar).

function retrieveChosenEventDetails() {
    // initialPageLoad = "no";
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

    fetchAPIdata(apiQueryAddress, "places")

}





function buildFilterSearchQuery() {
    var startDateFilter = "";
    var endDateFilter = "";
    var convertedStartDateFilter = "";
    var convertedEndDateFilter = "";
    var sportFilter = "";
    var teamCompetitorFilter = "";
    var competitionFilter = "";
    var countryFilter = "";
    var cityFilter = "";

    if (document.getElementById("start-date-filter").value === "" &&
        document.getElementById("end-date-filter").value === "" &&
        document.getElementById("sport-filter").value === "" && document.getElementById("start-date-filter").value === "" &&
        document.getElementById("team-competitor-filter").value === "" &&
        document.getElementById("competition-filter").value === "" &&
        document.getElementById("country-filter").value === "" &&
        document.getElementById("city-filter").value === "") {

        alert("Please enter a value in at least one Filter.")
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
            var convertedStartDateFilter = 'active.gte=' + startDateYear + '-' + startDateMonth + '-' + startDateDay;
            console.log("Converted Start Date Filter value : " + convertedStartDateFilter);

            filterArray.push(convertedStartDateFilter);

        }

        if (document.getElementById("end-date-filter").value != "") {
            endDateFilter = document.getElementById("end-date-filter").value;
            var endDateDay = endDateFilter.substring(0, 2);
            var endDateMonth = endDateFilter.substring(3, 5);
            var endDateYear = endDateFilter.substring(6);
            var convertedEndDateFilter = 'active.lte=' + endDateYear + '-' + endDateMonth + '-' + endDateDay;
            console.log("Converted End Date Filter value : " + convertedEndDateFilter);
            filterArray.push(convertedEndDateFilter);
        }

        if (document.getElementById("sport-filter").value != "") {
            var sportFilter = document.getElementById("sport-filter").value;
            console.log("Sport Filter value : " + sportFilter);
            sportFilter = 'label=' + sportFilter;
            filterArray.push(sportFilter);
        }

        if (document.getElementById("team-competitor-filter").value != "") {
            var teamCompetitorFilter = document.getElementById("team-competitor-filter").value;
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

        if (document.getElementById("country-filter").value != "") {
            countryFilter = document.getElementById("country-filter").value;
            var countryId = countryFilter.substr(0, 2);
            console.log("Country Filter value : " + countryId);
            countryId = 'country=' + countryId;
            // countryId = countryId.toLowerCase();
            filterArray.push(countryId);
        }

        if (document.getElementById("city-filter").value != "") {
            var cityFilter = document.getElementById("city-filter").value;
            console.log("City Filter value : " + cityFilter);
            cityFilter = 'q=' + cityFilter;
            filterArray.push(cityFilter);
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
        let apiType = "places";
        if (countryId != "" || cityFilter != "") {
            fetchAPIdata("https://api.predicthq.com/v1/places/?country=GB", apiType);
        }

        // https://api.predicthq.com/v1/places/?country=GB&limit=10&q=london&type=metro

        // build API query string

        // https://api.predicthq.com/v1/events/?active.gte=2021-06-20&active.lte=2022-06-20&category=sports&local_rank.gte=40&limit=100&sort=rank"

        let eventsBaseAPIaddress = "https://api.predicthq.com/v1/events/?";
        let filterQueryString = baseAPIaddress;

        filterArray.forEach(filterSelection => {
            filterQueryString += filterSelection;
            filterQueryString += '&';
        })

        filterQueryString += 'category=sports&local_rank.gte=40&limit=10&sort=rank';

        console.log("Filter Query string : " + filterQueryString);

    }


}

function convertPlaceIDsToNames(placeID) {

}