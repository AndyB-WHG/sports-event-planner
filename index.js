var totalOptions = [];
var totalText = [];
var resultsTotal;
var pageLength;
var itemsFetched = 0;
var initialAPIaddress = "https://api.predicthq.com/v1/events/?active.gte=2020-06-15&active.lte=2021-07-15&category=sports&local_rank.gte=40&limit=100&sort=rank";
var APIaddress = "";
var nextPage = "";

$(document).ready(function populateQuickSearchBox() {
    if (APIaddress === "") {
        APIaddress = initialAPIaddress;
    } else {
        APIaddress = nextPage;
    }
    console.log(APIaddress);
    fetch(APIaddress, {
            headers: {
                Authorization: `Bearer GVtsmjii14RZzzBNhgGypHC8k7CVwNoHrERr6Xqf`
            }
        })
        .then(response => {
            return response.json();
        })
        .then((myContent) => {
            console.log(myContent);
            console.log("Count =" + myContent.count);
            var nextPage = myContent.next;
            console.log("Next page address : " + nextPage);
            console.log("Type of Next Page : " + typeof nextPage)
            pageLength = myContent.results.length;
            console.log("Page length : " + pageLength);
            console.log("Page Length type : " + typeof pageLength);
            resultsTotal = myContent.count;
            itemsFetched += pageLength;
            myContent = myContent.results;
            console.log(myContent);
            for (i = 0, len = myContent.length, text = "", options = []; i < len; i++) {
                text += myContent[i].title + "  : Rank - " + myContent[i].local_rank + "<br>";
                options.push(myContent[i].title);
            }
            // totalOptions += options;
            // console.log("Total Options are: " + totalOptions);
            // totalText += text;
            $(function () {
                totalOptions = totalOptions.concat(options);
                console.log("Total Options are: " + totalOptions);
                var quickSearchList = totalOptions;
                $("#quick-search-input-box").autocomplete({
                    source: quickSearchList
                });
            });

            console.log("Items fetched : " + itemsFetched);
            console.log("Total results : " + resultsTotal);
            totalText = totalText.concat(text);
            document.getElementById("data").innerHTML = totalText;

            if (itemsFetched < resultsTotal && itemsFetched < 200) {
                console.log("Next Page address : " + myContent.next);
                // nextPage = myContent.next;
                console.log(nextPage);
                populateQuickSearchBox();
            }
        });
});


$(document).ready(function () {
    $("#quick-search-button").on("click", function () {
        if (document.getElementById("data").innerHTML != "You turned me on!") {
            document.getElementById("data").innerHTML = "You turned me on!";
        } else {
            document.getElementById("data").innerHTML = "Now I'm switched off!";
        }
    });
});