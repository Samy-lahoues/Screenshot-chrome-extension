// Select Dom elements
const container = document.getElementById("container");
const capture = document.getElementById("capture");
const saveCapture = document.getElementById("save");
const deleteCapture = document.getElementById("delete");
const browseBtn = document.getElementById("browse");
const input = document.getElementById("file-name");

// Primary styling
input.style.display = "none";
container.style.width = "50px";
saveCapture.style.display = "none";
deleteCapture.style.display = "none";
saveCapture.style.fontSize = "0";
deleteCapture.style.fontSize = "0";
// Event listeners
capture.addEventListener("click", () => {
    container.style.marginBottom = "10px";
    container.style.width = "130px";
    input.style.display = "inline-block";
    input.style.width = "130px"
    saveCapture.style.display = "inline-block";
    deleteCapture.style.display = "inline-block";
    saveCapture.style.fontSize = "16px";
    deleteCapture.style.fontSize = "16px";
});
saveCapture.addEventListener('click', async () => {
    const [tab] = await chrome.tabs.query({active : true, currentWindow : true});
    chrome.tabs.captureVisibleTab(tab.windowId, {format : "png"}, (dataUrl) =>{
        const link = document.createElement("a");
        link.href = dataUrl;
        document.body.appendChild(link);
        link.download = input.value.length === 0 ? "Screenshot.png" : `${input.value}.png`;
        link.click()
        document.body.removeChild("a");
    });
})
deleteCapture.addEventListener("click", () =>{
    const anchor = document.querySelector('a');
    if (document.body.contains(anchor)){
        document.body.removeChild(anchor)
    }
    input.value = "";
});
browseBtn.addEventListener('click', async () => {
    let browse = await window.showDirectoryPicker();
    console.log(browse);
});
