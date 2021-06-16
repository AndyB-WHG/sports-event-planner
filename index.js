fetch("https://api.predicthq.com/v1/places/?q=New+York&limit=5", {
        headers: {
            Authorization: `Bearer GVtsmjii14RZzzBNhgGypHC8k7CVwNoHrERr6Xqf`
        }
    })
    .then(response => {
        return response.json();
    })
    .then((myContent) => {
        console.log(myContent);
        myContent = myContent.results;
        console.log(myContent);
        console.log(myContent.length);
        console.log("First item found is : " + myContent[0].name);
        for (i = 0, len = myContent.length, text="", options = []; i < len; i++) {
            text += myContent[i].name + "<br>";
            options.push(myContent[i].name);
            $(function() {
                var quickSearchList = options;
                console.log("Options are: " + options)
                $( "#quick-search-input-box" ).autocomplete({
                  source: quickSearchList
                });
              } );
        }
        document.getElementById("data").innerHTML = text;
    });

// $(document).ready(function() {
//   $("#quick-search-button").on("click", function() {
//     if (document.getElementById("data").innerHTML != "You turned me on!") {
//         document.getElementById("data").innerHTML = "You turned me on!";
//     } else {
//         document.getElementById("data").innerHTML = "Now I'm switched off!";
//     }
// });
// });