function getTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
}
 
const getLocalStorage = async (tabs) => {
    let length = 0;
    let tab = tabs.pop();
    var localStorageList = document.getElementById('local-storage-list');
    var size = document.getElementById('size-local-storage');

  
    const response = await browser.tabs.sendMessage(tab.id, {method: "localStorageData"})
  
    var webSec = document.getElementById('website-security-status');
    var lStorageSec = document.getElementById('local-storage-status');
  
    if (response.data.length > 0){
        for (let localStorageItem of response.data){
            if (localStorageItem){
                let li = document.createElement("li");
                let item = document.createTextNode(localStorageItem);
                li.appendChild(item);
                localStorageList.appendChild(li);
                length++;
            }
        }
      let sizeLS = document.createTextNode("Items on Local Storage: " + length);
      size.appendChild(sizeLS);
      
      if(length > 10){
          webSec.innerHTML = "Website uses a lot of local storage";
          webSec.style.color = "red";
          lStorageSec.style.color = "red";
          lStorageSec.setAttribute("value", "10");
      } else{
          lStorageSec.setAttribute("value", "100");
      }
  
    }else {
          let noLSTag = document.createElement("h5");
          let noLSData = document.createTextNode("Local storage isn't used in this tab.");
      
          noLSTag.appendChild(noLSData);
          localStorageList.appendChild(noLSTag);
          lStorageSec.setAttribute("value", "100");
    }
}
      
  getTab().then(getLocalStorage);