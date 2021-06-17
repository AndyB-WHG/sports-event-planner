var totalOptions = [];
var totalText = [];
var resultsTotal;
var pageLength;
var itemsFetched = 0;
var initialAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2020-06-15&active.lte=2021-07-15&category=sports&local_rank.gte=40&limit=100&sort=rank";
var APIaddress = "";
var nextPage = "";

$(document).ready(function () {
    // APIaddress = initialAPIaddress;
    console.log("1. " + initialAPIaddress)
    populateQuickSearchBox(initialAPIaddress);
});


function populateQuickSearchBox(apiAddress) {
    console.log("2. " + apiAddress);

    fetchAPIdata(apiAddress);

};



function fetchAPIdata(apiAddress) {
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
            console.log("3. " + myContent.results);
            myContent = myContent;
            continuationFunction(myContent);

        });
    
}

function continuationFunction(myContent) {
    console.log("3.5 Content before 'Count' (line20)" + myContent);
    console.log("4. Count =" + myContent.count);
    var nextPage = myContent.next;
    console.log("5. Next page address : " + nextPage);
    console.log("6. Type of Next Page : " + typeof nextPage)
    pageLength = myContent.results.length;
    console.log("7. Page length : " + pageLength);
    console.log("8. Page Length type : " + typeof pageLength);
    resultsTotal = myContent.count;
    itemsFetched += pageLength;
    myContent = myContent.results;
    for (i = 0, len = myContent.length, text = "", options = []; i < len; i++) {
        text += myContent[i].title + "  : Rank - " + myContent[i].local_rank + "<br>";
        options.push(myContent[i].title);
    }
    // totalOptions += options;
    // console.log("Total Options are: " + totalOptions);
    // totalText += text;
    $(function () {
        totalOptions = totalOptions.concat(options);
        console.log("10. Total Options are: " + totalOptions);
        var quickSearchList = totalOptions;
        $("#quick-search-input-box").autocomplete({
            source: quickSearchList
        });
    });

    console.log("11. Items fetched : " + itemsFetched);
    console.log("12. Total results : " + resultsTotal);
    totalText = totalText.concat(text);
    document.getElementById("data").innerHTML = totalText;

    localStorage.setItem('apiData', options);

    if (itemsFetched < resultsTotal && itemsFetched < 500) {
        console.log("13. Next Page address : " + nextPage);
        // console.log("14. " + nextPage);
        fetchAPIdata(nextPage);
    }
}

$(document).ready(function () {
    $("#quick-search-button").on("click", function () {
        if (document.getElementById("data").innerHTML != "You turned me on!") {
            document.getElementById("data").innerHTML = "You turned me on!";
        } else {
            document.getElementById("data").innerHTML = "Now I'm switched off!";
        }
    });
});