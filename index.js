// var xhr = new XMLHttpRequest();

// xhr.open("GET", "https://api.schedjoules.com/categories/sports/boxing");

// xhr.setRequestHeader("Authorization", "Bearer {0443a55244bb2b6224fd48e0416f0d9c}");

// xhr.send();

// xhr.onstatereadychange = function () {
//     if (this.readyState == 4 && this.status == 200) {
//         document.getElementById("data").innerHTML = this.responseText;
//     }
// };

fetch("https://api.predicthq.com/v1/events/calendar?category=sports&country=GB", {
  headers: {
    Authorization: `Bearer 63gK8tsgkCkaRrApdNwOll0sbnXJzAD8EsFCJSSU`
  }
})
  .then(response => {return response.json();
  }) 
  .then((myContent) => {
    // myContent = myContent;
    console.log(myContent);
    mycontent = myContent.results;
    // myContent = myContent.results[0].date;
    // document.getElementById("data").innerHTML = myContent;
      console.log(myContent.count);
      // document.getElementById("data").innerHTML = myContent;
      for (i = 0, len = myContent.count, text = ""; i < len; i++) {
        
        text += myContent[i] + "<br>";
        document.getElementById("data").innerHTML = text;
      }


    // })
  });

    

  

  // curl -X GET -H "Authorization: Bearer 63gK8tsgkCkaRrApdNwOll0sbnXJzAD8EsFCJSSU" \
  //           -H "Accept: application/json" \