function getTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
}
const getFingerprint = async (tabs) => {
    let tab = tabs.pop();
    const response = await browser.tabs.sendMessage(tab.id, {
        method: "fingerprintData"
      });
    var Exists = document.getElementById('fingerprint-exists');
    var Id = document.getElementById('fingerprint-id');
    var webSec = document.getElementById('fingertprint-security-status');
    var fingerprintSec = document.getElementById('fingerprint-status');
  
    var fingerprint = response.data;
  
    if (fingerprint){
        Exists.innerHTML = "There is a Fingerprint";
        Id.innerHTML = "Fingerprint: "+ fingerprint;
        webSec.style.color = "red";
        fingerprintSec.setAttribute("value", "100");
    }else{
        Exists.innerHTML = "There isn't a Fingerprint";
        Id.innerHTML = "";
        fingerprintSec.setAttribute("value", "0");
    }
  }
  

  
  getTab().then(getFingerprint);