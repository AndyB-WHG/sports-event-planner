var xhr = new XMLHttpRequest();

xhr.open("GET", "https://api.schedjoules.com/categories/");

xhr.setRequestHeader("Authorization", "Bearer {0443a55244bb2b6224fd48e0416f0d9c}");

xhr.send();

xhr.onstatereadychange = function () {
    if (this.readyState == 4 && this.status == 200) {
        document.getElementById("data").innerHTML = this.responseText;
    }
};