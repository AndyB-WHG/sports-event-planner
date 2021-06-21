var totalOptions = [];
var totalText = "";
var resultsTotal;
var pageLength;
var itemsFetched = 0;
const initialAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2021-06-20&active.lte=2022-06-20&category=sports&local_rank.gte=40&limit=100&sort=rank";
var APIaddress = "";
var nextPage = "";
const baseAPIaddress = "https://api.predicthq.com/v1/events/?"
var initialPageLoad = "yes";
const quickSearchLoadValue = 250;



// 1. Connects to API when page is loaded.

$(document).ready(function populateQuickSearchBox() {
    // APIaddress = initialAPIaddress;
    // console.log("1. " + initialAPIaddress)
    fetchAPIdata(initialAPIaddress, itemsFetched);
    // populateQuickSearchBox(initialAPIaddress);
    console.log("1. Items Fetched: " + itemsFetched)
});


// 2. Handles API GET requests

function fetchAPIdata(apiAddress, itemsFetched) {
    // if (apiAddress != initialAPIaddress) {
    //     queryAddress = apiAddress;
    //     object.freeze(queryAddress);
    // }
    console.log("2.5 : " + apiAddress);
    fetch(apiAddress, {
            headers: {
                Authorization: `Bearer GVtsmjii14RZzzBNhgGypHC8k7CVwNoHrERr6Xqf`
            }
        })
        .then(response => {
            return response.json();
        })
        .then((myContent) => {
            console.log(myContent);
            // console.log("3. " + myContent.results);
            // myContent = myContent;
            continuationFunction(myContent, apiAddress, itemsFetched);

        });

}

function convertPlaceIDsToNames(placeID) {

}

// 3. fetchAPIdata function (see item 2.) dumps the API data into here.
// It then loops through each page of results 'pushing' the 'title' of each result into the 'options' array.

function continuationFunction(myContent, apiAddress, itemsFetched) {
    // console.log("3.5 Content before 'Count' (line20)" + myContent);
    // console.log("4. Count =" + myContent.count);
    var nextPage = myContent.next;
    // console.log("5. Next page address : " + nextPage);
    // console.log("6. Type of Next Page : " + typeof nextPage)
    pageLength = myContent.results.length;
    console.log("3. Page Length = " + pageLength);
    // console.log("7. Page length : " + pageLength);
    // console.log("8. Page Length type : " + typeof pageLength);
    resultsTotal = myContent.count;
    itemsFetched += pageLength;
    let fullAPI = [];
    fullAPI = myContent;
    myContent = myContent.results;
    console.log("Full API : " + fullAPI);
    console.log("myContent : " + myContent);
    for (i = 0, len = myContent.length, text = "", options = []; i < len; i++) {
        text += myContent[i].title + "  : Rank - " + myContent[i].local_rank + "<br>";
        options.push(myContent[i].title);
    }

    console.log("4. Text : " + text);
    console.log("11. Items fetched : " + itemsFetched);
    console.log("12. Total results : " + resultsTotal);
    totalText = totalText.concat(text);
    console.log("Total Text : " + totalText);
    // document.getElementById("map").innerHTML = totalText;

    // localStorage.setItem('apiData', options);

    if (itemsFetched <= 50) {
        createResultsTable(myContent, fullAPI);
    }

    if (itemsFetched < resultsTotal && itemsFetched < quickSearchLoadValue && initialPageLoad === "yes") {
        // console.log("13. Next Page address : " + nextPage);
        // console.log("14. " + nextPage);
        fetchAPIdata(nextPage, itemsFetched);
    }

    // If the API data is part of the initial 'Page Loading' process then convert the results into selectable option in the 'Quick Search' box.

    if (initialPageLoad === "yes") {

        // jQuery 'Autocomplete' function  ----  populates the 'Quick Search' text box with the results 
        // of the initial API request to give potential events for the user to select from or ignore as required.

        $(function autocompleteQuickSearchBox() {
            totalOptions = totalOptions.concat(options);
            // console.log("10. Total Options are: " + totalOptions);
            var quickSearchList = totalOptions;
            $("#quick-search-input-box").autocomplete({
                source: quickSearchList
            });
        });

    }

    if (itemsFetched === resultsTotal || itemsFetched >= quickSearchLoadValue || initialPageLoad === "no") {
        // document.getElementById("map").innerHTML = totalText;
        itemsFetched = 0; // resets the variable ready for the next search request.
        totalText = "";
    }
}

// Get the text typed into the 'Quick Search' box by the User (happens when the User clicks the 'Search Button' in the Nav Bar).

function retrieveChosenEventDetails() {
    initialPageLoad = "no";
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

    var apiQueryAddress = baseAPIaddress + "active.gte=" + currentYear + "-" + currentMonth + "-" + currentDay + "&active.lte=" + nextYear + "-" + currentMonth + "-" + currentDay + "&category=sports&local_rank.gte=40&limit=50&q=" + searchItem + "&sort=rank";

    console.log("6. Query Address: " + apiQueryAddress);

    fetchAPIdata(apiQueryAddress, itemsFetched)

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

function createResultsTable(apiResults, fullAPI) {
    let tableKeys = ["Event Title", "Start Date  dd/mm/yyyy", "End Date  dd/mm/yyyy", "Place Name", "Country", "Type", "Sub Type"];
    let tableHeaders = [];
    let tableRows = [];
    let tableData = [];

    tableKeys.forEach(header => {
        tableHeaders.push(`<th>${header}</th>`);
    });

    let pagination;
    console.log("Previous url: " + fullAPI.previous)
    console.log("Next url: " + fullAPI.next)
    if (fullAPI.previous || fullAPI.next) {
        pagination = generatePaginationButtons(fullAPI.previous, fullAPI.next);
    } else {
        pagination = `<p></p>`;
    }

    apiResults.forEach(result => {
        tableData.push(`<td>${result.title}</td>`);

        let strToShorten = result.start.toString();
        reorderedString = cleanUpDates(strToShorten);
        tableData.push(`<td>${reorderedString}</td>`);

        strToShorten = result.end.toString();
        reorderedString = cleanUpDates(strToShorten);
        tableData.push(`<td>${reorderedString}</td>`);

        strToShorten = result.place_hierarchies[0, 0].toString();
        shortenedString = strToShorten.substring(0, 7);
        tableData.push(`<td>${shortenedString}</td>`);

        tableData.push(`<td>${result.country}</td>`);

        for (i = 0, len = result.labels.length; i < len; i++) {
            if (result.labels[i] != "sport") {
                tableData.push(`<td>${result.labels[i]}</td>`);
            }
        }

        tableRows.push(`<tr>${tableData}</tr>`);

        tableData = [];
    });



    document.getElementById("data").innerHTML = `<div id=paginationButtons>${pagination}</div><table id="resultsTable">${tableHeaders}${tableRows}</table>`.replace(/,/g, "");

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

function clickedPaginationButton (apiAddress) {
    initialPageLoad = "no";
    itemsFetched = 0;
    fetchAPIdata (apiAddress, itemsFetched);
}