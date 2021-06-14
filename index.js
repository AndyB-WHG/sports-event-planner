fetch("https://api.predicthq.com/v1/events/?q=european&rank.gte=10&active.gte=2021-06-14&active.lte=2021-07-20&category=sports&limit=50&label=soccer&sort=start", {
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
        for (i = 0, len = myContent.length, text = ""; i < len; i++) {
            text += "<option value=" + myContent[i].title + "></option><br>";
        }
        document.getElementById("quick-search-input-box").innerHTML = text;
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