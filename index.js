var totalOptions = [];
var totalText = [];
var resultsTotal;
var pageLength;
var itemsFetched = 0;
const initialAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2021-06-19&active.lte=2022-06-18&category=sports&local_rank.gte=40&limit=100&sort=rank";
var APIaddress = "";
var nextPage = "";
const baseAPIaddress = "https://api.predicthq.com/v1/events/?"



// 1. Connects to API when page is loaded.

$(document).ready(function populateQuickSearchBox() {
    // APIaddress = initialAPIaddress;
    // console.log("1. " + initialAPIaddress)
    fetchAPIdata(initialAPIaddress);
    // populateQuickSearchBox(initialAPIaddress);
});


// 2. Handles API GET requests

function fetchAPIdata(apiAddress) {
    if (apiAddress != initialAPIaddress) {
        // queryAddress = apiAddress;
        // object.freeze(queryAddress);
    }
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
            continuationFunction(myContent, apiAddress);

        });

}

// 3. fetchAPIdata function (see item 2.) dumps the API data into here.
// It then loops through each page of results 'pushing' the 'title' of each result into the 'options' array.

function continuationFunction(myContent, apiAddress) {
    // console.log("3.5 Content before 'Count' (line20)" + myContent);
    // console.log("4. Count =" + myContent.count);
    var nextPage = myContent.next;
    // console.log("5. Next page address : " + nextPage);
    // console.log("6. Type of Next Page : " + typeof nextPage)
    pageLength = myContent.results.length;
    // console.log("7. Page length : " + pageLength);
    // console.log("8. Page Length type : " + typeof pageLength);
    resultsTotal = myContent.count;
    itemsFetched += pageLength;
    myContent = myContent.results;
    for (i = 0, len = myContent.length, text = "", options = []; i < len; i++) {
        text += myContent[i].title + "  : Rank - " + myContent[i].local_rank + "<br>";
        options.push(myContent[i].title);
    }

    

    // console.log("11. Items fetched : " + itemsFetched);
    // console.log("12. Total results : " + resultsTotal);
    totalText = totalText.concat(text);
    // document.getElementById("data").innerHTML = totalText;

    // localStorage.setItem('apiData', options);

    if (itemsFetched < resultsTotal && itemsFetched < 50) {
        // console.log("13. Next Page address : " + nextPage);
        // console.log("14. " + nextPage);
        fetchAPIdata(nextPage);
    }

    // If the API data is part of the initial 'Page Loading' process then convert the results into selectable option in the 'Quick Search' box.

    if (apiAddress === initialAPIaddress) {

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

    } else {
        document.getElementById("data").innerHTML = totalText;
        
        
    };
    itemsFetched = 0;    // resets the variable ready for the next search request.
    totalText = "";
}

// $(document).ready(function () {
//     $("#quick-search-button").on("click", function () {
//         if (document.getElementById("data").innerHTML != "You turned me on!") {
//             document.getElementById("data").innerHTML = "You turned me on!";
//         } else {
//             document.getElementById("data").innerHTML = "Now I'm switched off!";
//         }
//     });
// });

// Get the text typed into the 'Quick Search' box by the User (happens when the User clicks the 'Search Button' in the Nav Bar).

function retrieveChosenEventDetails() {
    var searchItem = document.getElementById("quick-search-input-box").value;
    console.log("4. User Search Request: " + searchItem);
    var d = new Date();
    var currentDay = d.getDate();
    var currentMonth = d.getMonth() + 1;
    var currentYear = d.getFullYear();
    var nextYear = currentYear + 1;
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

    fetchAPIdata(apiQueryAddress)


}