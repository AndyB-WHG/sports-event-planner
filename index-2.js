

// fetch("https://api.predicthq.com/v1/places/?q=Nottingham,England", {

  $(document).ready(function () {
    fetchAPIdata("https://api.predicthq.com/v1/places/?country=GB");
});


// 2. Handles API GET requests

function fetchAPIdata(apiAddress) {
    // if (initialPageLoad === "yes") {   // removed
    //     $("#quick-search-input-box").val("Loading......");
    // }  // removed
    // if (apiAddress != initialAPIaddress) {
    //     queryAddress = apiAddress;
    //     object.freeze(queryAddress);
    // }
    // console.log("2.5 : " + apiAddress);
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
            continuationFunction(myContent);
        });

}

// 3. fetchAPIdata function (see item 2.) dumps the API data into here.
// It then loops through each page of results 'pushing' the 'title' of each result into the 'options' array.

function continuationFunction(myContent) {
    // console.log("3.5 Content before 'Count' (line20)" + myContent);
    // console.log("4. Count =" + myContent.count);
    // var nextPage = myContent.next;
    console.log(myContent);
}