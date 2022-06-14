function getTab(){
  return browser.tabs.query({
    currentWindow: true, active: true
  });
}

const getCookies = (tabs) => {
  let tab = tabs.pop();
  let nCookies = 0;

  var getAllCookies = browser.cookies.getAll({url: tab.url});

  getAllCookies.then((cookies) => {
    var activeTabUrl = document.getElementById('header-title-cookies');
    var text = document.createTextNode("Cookies at: "+tab.title);
    var cookieList = document.getElementById('cookie-list');
    var cookiesLen = document.getElementById('number-cookies');
    activeTabUrl.appendChild(text);

    if (cookies.length > 0) {
      for (let cookie of cookies) {
        let li = document.createElement("li");
        let content = document.createTextNode(cookie.name + ": "+ cookie.value);
        li.appendChild(content);
        cookieList.appendChild(li);
        nCookies++;
      }
      let cookiesText = document.createElement("p");
      let cookiesContent = document.createTextNode("Number of cookies: "+nCookies);
      cookiesText.appendChild(cookiesContent);
      cookiesLen.appendChild(cookiesText);
    }

    else {
      let p = document.createElement("p");
      let content = document.createTextNode("No cookies in this tab.");
      let parent = cookieList.parentNode;
      p.appendChild(content);
      parent.appendChild(p);
    }

    var siteSec = document.getElementById('cookies-security-status');
    var cookiesSec = document.getElementById('cookies-status');
    
    if(nCookies >= 200){
      cookiesSec.setAttribute("value", "100");
      siteSec.style.color = "#F4364C";
    } 
    else if(nCookies > 100 && nCookies < 200){
      cookiesSec.setAttribute("value", nCookies.toString());
      siteSec.style.color = "#FDB44E";
    } 
    else {
      cookiesSec.setAttribute("value", nCookies.toString());
    }
  });
}

const getSessionStorage = async (tabs) => {
  let tab = tabs.pop();
  var listHTML = document.getElementById('session-storage-list');
  var sizeHTML = document.getElementById('size-session-storage');
  let sessionStorageLength = 0;
  
  const response = await browser.tabs.sendMessage(tab.id, {method: "sessionStorageData"});
  
  var websiteSecurity = document.getElementById('session-storage-security-status');
  var sessionStorageSecurity = document.getElementById('session-storage-status');
  
  if (response.data.length > 0) {
    for (let sessionStorageItem of response.data) {
      if (sessionStorageItem) {
        sessionStorageLength++;
        let li = document.createElement("li");
        let content = document.createTextNode(sessionStorageItem);
        li.appendChild(content);
        listHTML.appendChild(li);
      }
    }
    let sizeContent = document.createTextNode("Number of items on Session Storage: " + sessionStorageLength);
    sizeHTML.appendChild(sizeContent);
    
    if(sessionStorageLength > 20){
      websiteSecurity.style.color = "#F4364C";
      sessionStorageSecurity.setAttribute("value", "20");
    } 
    else if (sessionStorageLength > 10 && sessionStorageLength < 20){
    websiteSecurity.style.color = "#FDB44E";
    sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
    } 
    else {
      sessionStorageSecurity.setAttribute("value", sessionStorageLength.toString());
    }
  }
  
  else {
    let noSessionStorageTag = document.createElement("h4");
    let noSessionStorageData = document.createTextNode("No session storage data in this tab.");
    
    noSessionStorageTag.appendChild(noSessionStorageData);
    listHTML.appendChild(noSessionStorageTag);
  }
}

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

const getThirdParty = async (tabs) => {
  let tab = tabs.pop();
  var thirdPartyList = document.getElementById('third-party-list');

  const response = await browser.tabs.sendMessage(tab.id, {
    method: "thirdPartyDomains"
  });
  
  var links = response.data.links;
  var numberOfLinks = response.data.numberOfLinks;

  var sizeLinks = document.getElementById("size-third-party");
  var sizeLinksText = document.createTextNode("Number of external links: "+ numberOfLinks);
  sizeLinks.appendChild(sizeLinksText);

  links.map(domain => {
    var li = document.createElement('li');
    li.innerText = domain;
    thirdPartyList.appendChild(li);
  });
}

getTab().then(getCookies);
getTab().then(getLocalStorage);
getTab().then(getSessionStorage);
getTab().then(getFingerprint);
getTab().then(getThirdParty);