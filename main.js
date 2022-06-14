const getExternalLinks = () => {
    var ExternalLinks = Array.prototype.map.call(
      document.querySelectorAll(
        "link, img, video, audio, script, iframe, source, embed"
      ),
      (HTMLtag) => { 
        return HTMLtag.href || HTMLtag.src; 
      }
    )
    const data = {
      links: ExternalLinks,
      numberOfLinks: ExternalLinks.length
    }
    return data;
  } 
const getFingerprint = () => {
const fpLink = import('https://openfpcdn.io/fingerprintjs/v3')
    .then(FingerprintJS => FingerprintJS.load()
)
fpLink
    .then(fp => fp.get())
    .then(result => {
    const visitorId = result.visitorId;
    let visitorIdElement = document.getElementById('teste');
    visitorIdElement.innerHTML = visitorId;
    if(visitorId){
        return visitorId;
    }else {
        return null;
    }
    }
    )
}
  
browser.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.method == "sessionStorageData") {
        sendResponse({ 
            data: Object.entries(sessionStorage) 
        });
    }else if (request.method == "localStorageData") {
        sendResponse({ 
            data: Object.entries(localStorage) 
        });
    }else if (request.method == "thirdPartyDomains") {
            sendResponse({ 
                data: getExternalLinks() 
            });
    }else if (request.method == "fingerprintData") {
        sendResponse({ 
            data: getFingerprint() 
        });
    }else{
        sendResponse({ 
            data: null 
        });
    }
});