console.log("hello")

const censorData = (textArr, callback) => {
    var xhttp = new XMLHttpRequest();
    let emote;
    chrome.storage.local.get("emote", value => {
        if(value.emote==="normal"){
            emote='*';
        } else if(value.emote === "blahaj") {
            emote="🦈"
        } else if(value.emote === "rainbow") {
            emote="🌈"
        } else if(value.emote === "pizza") {
            emote="🍕"
        }
   
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
    console.log("hello123");
    const n = document.querySelectorAll(".css-901oao.r-1fmj7o5.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0").length;
    for(i=0;i<n;i++){
        document.querySelectorAll(".css-901oao.r-1fmj7o5.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0")[i].innerText = censoredMsg[i];
    }
    console.log("Done")
}

const getData = () => {
    const arr = document.querySelectorAll(".css-901oao.r-1fmj7o5.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0");
    const textArr = [];

    for(i=0;i<arr.length;i++){
        textArr.push(arr[i].innerText);
    }
    if(arr.length != 0){
       censorData(textArr,changeComments);
    }

}

var observer = new MutationObserver(function(mutations) {
    let str ="";
    let arr = [...document.querySelectorAll(".css-901oao.r-1fmj7o5.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0")];
    let count = 0;
    mutations.forEach(function(mutation) {
      if(count!=0) return;
        count=1
      const carr = [...document.querySelectorAll(".css-901oao.r-1fmj7o5.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0")];
    //   if(!carr.includes(arr[arr.length-1])){
        console.log(document.querySelectorAll(".css-901oao.r-1fmj7o5.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0").length);
        getData();
        arr = carr
    //   }
      
    });
    count =0;
  });

var config = {
    childList: true,
    // subtree: true,
    characterData: true,
    // attributes: false,
    // attributesOldValue: true
};

observer.observe(document.querySelector("div[aria-label='Timeline: Your Home Timeline']>div"), config);

// document.addEventListener("scroll",()=>{
//     console.log(document.querySelectorAll(".css-901oao.r-1fmj7o5.r-1qd0xha.r-a023e6.r-16dba41.r-rjixqe.r-bcqeeo.r-bnwqim.r-qvutc0").length);

// })