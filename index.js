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
            // options += "<option value=" + myContent[i].name + "></option>";
            options[i] = myContent[i].name;
            
            text += myContent[i].name + "<br>";

            $(function() {
                console.log("Starting 'Autocomplete' function");
                console.log("Options are : " + options);
                console.log(typeof options);
                var availableTags = options;
                $( "#quick-search-input-box" ).autocomplete({
                  source: availableTags
                });
              } );
        }
        document.getElementById("data").innerHTML = text;
        console.log(options);
        // document.getElementById("quick-search-input-box").innerHTML = options;
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