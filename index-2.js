var placeID;

fetch("https://api.predicthq.com/v1/places/?q=Nottingham,England", {
  headers: {
    Authorization: `Bearer GVtsmjii14RZzzBNhgGypHC8k7CVwNoHrERr6Xqf`
  }
})
  .then(response => {return response.json();}) 
  .then((myContent) => {
    placeID = myContent.results[0].id;
    return myContent.results[0].id;
  }).then (function(placeID) {
    console.log("PlaceID = " + placeID);
    fetch("https://api.predicthq.com/v1/events/?place.scope=" + placeID + "&active.gte=2021-03-01&active.lte=2021-03-31&category=sports&sort=rank", {
      headers: {
        Authorization: `Bearer GVtsmjii14RZzzBNhgGypHC8k7CVwNoHrERr6Xqf`
      }
    })
    .then(response => {return response.json();}) 
    .then((myContent) => {
      console.log(myContent);
      myContent = myContent.results;  
      console.log(myContent);
      console.log(myContent.length);
      for (i = 0, len = myContent.length, text=""; i < len; i++) {
        text += myContent[i].title + "<br>";
        document.getElementById("data").innerHTML = text; }
    }   
    )});