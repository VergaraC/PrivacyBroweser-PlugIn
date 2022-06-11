function getTab(){
    return browser.tabs.query({
      currentWindow: true, active: true
    });
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
  

  
  getTab().then(getThirdParty);