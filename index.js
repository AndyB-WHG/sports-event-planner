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
    // console.dir(myContent);
    // console.log(myContent);
    // myContent = myContent.results[1];
    myContent = myContent.results;
    console.log(myContent);
    document.getElementById("data").innerHTML = myContent;

    myContent.forEach(element => {
      document.getElementById("data").innerHTML = myContent.labels;
    });

    
  });
  

  // curl -X GET -H "Authorization: Bearer 63gK8tsgkCkaRrApdNwOll0sbnXJzAD8EsFCJSSU" \
  //           -H "Accept: application/json" \