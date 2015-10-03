
chrome.omnibox.onInputChanged.addListener(function(text, suggest) {
    suggest([
      {content: "count-rows", description: "Count html table rows"}
    ]);
});
chrome.omnibox.onInputEntered.addListener(function(text) {
    if(text == "count-rows") RefreshAndCount();
});
 
chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
    var currentTimer = request.timer;
    if(currentTimer!=null){
        currentTimer = currentTimer*1000;
        //alert(currentTimer);
        chrome.storage.sync.set({'x': currentTimer}, function() {
                console.log(currentTimer);
        });
    }
    if(currentTimer==null){
        currentTimer = 10000;
       //I need to set currentTimer to the stored value in chrome storage here
    }

    switch(request.type) {
        case "table-row-count_start":
            chrome.storage.sync.set({'autoreload_enabled': true}, function() {
                console.log('auto reload');
            });
            var counter=0;
            while(counter<10000){
                console.log("Hey");
                counter++;
            }
            console.log("Refershing started");
            RefreshAndCount(currentTimer);
            break;
        case "table-row-count_stop":
            console.log("Stop Refershing");
            break;
    }
    return true;
});
 
 chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
        switch(port.name) {
            case "table-row-count_start":
                RefreshAndCount();
            break;
        }
    });
});

var RefreshAndCount = function(x) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {type: "table-row-count",mytimer: x});
        chrome.browserAction.setBadgeText({tabId: tabs[0].id, text: "Counting!"});
    });
};

function sleepFor( sleepDuration ){
    var now = new Date().getTime();
    while(new Date().getTime() < now + sleepDuration){ /* do nothing */ } 
}
