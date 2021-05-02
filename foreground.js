let comments = 0;
let currentComments = 0;


const censorData = (textArr, callback) => {
    var xhttp = new XMLHttpRequest();
    let emote;
    
    chrome.storage.local.get("emote", value => {
        console.log(value.emote);
        if(value.emote==="normal"){
            emote='*';
        } else if(value.emote === "blahaj") {
            emote="🦈"
        } else if(value.emote === "rainbow") {
            emote="🌈"
        } else if(value.emote === "pizza") {
            emote="🍕"
        }
    console.log(emote);    
    const data1 = {
        data:textArr,
        config:{
            "placeHolder":emote
        }
    }
    xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        callback(xhttp.responseText);
    }
};
    xhttp.open("POST", "http://localhost:3000/filter", true);
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send(JSON.stringify(data1));
})
}

const changeComments = (censoredStr) => {
    let censoredJson = JSON.parse(censoredStr);
    let censoredMsg = censoredJson["message"];
    console.log("hello");
    for(i=comments;i<currentComments;i++){
        document.querySelectorAll("ytd-comment-thread-renderer #content #content-text")[i].innerText = censoredMsg[i];
    }
    console.log("Done")
    comments = currentComments;
}

const getData = () => {
    const arr = document.querySelectorAll("ytd-comment-thread-renderer #content #content-text");
    const textArr = [];
    for(i=comments;i<currentComments;i++){
        textArr.push(arr[i].innerText);
    }
    if(arr.length != 0){
       censorData(textArr,changeComments);
    }

    
}

const checkChanges = ()=>{
    currentComments = document.querySelectorAll("ytd-comment-thread-renderer").length;
    if(currentComments !== comments){
        getData(comments);
        console.log("should render");
       
    }
}

setTimeout(function () {
    checkChanges();
}, 5000);

