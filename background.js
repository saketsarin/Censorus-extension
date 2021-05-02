// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//         if(/^https:\/\/www\.youtube/.test(current_tab_info.url)){
//             chrome.tabs.executeScript(null, {
//                 file:'./foreground.js'
//             }, ()=>{
//                 console.log("I injected")
//             })
//         } 
//         else if(/^https:\/\/twitter*/.test(current_tab_info.url)){
//             chrome.tabs.executeScript(null, {
//                 file:'./twitter.js'
//             }, ()=>{
//                 console.log("I injected")
//             })
//         }
//     })
// });
const executeScripts = () => {
    console.log("helo");

    chrome.tabs.query({currentWindow: true, active: true}, function(current_tab_info){
        console.log(current_tab_info[0].url);
 
                console.log(current_tab_info);
                if(/^https:\/\/www\.youtube/.test(current_tab_info[0].url)){
                    chrome.tabs.executeScript(null, {
                        file:'./foreground.js'
                    }, ()=>{
                        console.log("I injected")
                    })
                } 
                else if(/^https:\/\/twitter*/.test(current_tab_info[0].url)){
                    chrome.tabs.executeScript(null, {
                        file:'./twitter.js'
                    }, ()=>{
                        console.log("I injected")
                    })
                }
          
        });
}
chrome.runtime.onMessage.addListener((request, sender, sendResponse)=>{
    if(request.message === "checked"){
        console.log("checked");
    //   chrome.runtime.sendMessage({message:"execute script"})
        executeScripts();
       
    }
})

