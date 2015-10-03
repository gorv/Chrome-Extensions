window.onload = function() {
    document.getElementById("mystartbutton").onclick = function() {
        chrome.extension.sendMessage({
            type: "table-row-count_start",
            timer: document.getElementById("timerInput").value
        });
    }
    document.getElementById("mystopbutton").onclick = function() {
        chrome.extension.sendMessage({
            type: "table-row-count_stop"
        });
    }
}