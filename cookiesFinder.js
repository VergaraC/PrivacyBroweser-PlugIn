// https://github.com/mdn/webextensions-examples/blob/master/list-cookies/cookies.js

function getTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
}
function getCookies(){

    let tab = tabs.pop();
    let countCookies = 0;
    var cookieGetter = browser.cookies.getAll({url: tab.url});
  
    cookieGetter.then((cookies) => {
      var activeTabUrl = document.getElementById('header-title-cookies');
      var text = document.createTextNode("Cookies at: "+tab.title);
      var list = document.getElementById('cookie-list');
      var numberOfCookies = document.getElementById('number-cookies');
      activeTabUrl.appendChild(text);
  
      if (cookies.length > 0) {
        for (let cookie of cookies) {
          let li = document.createElement("li");
          let cookieDisplay = document.createTextNode(cookie.name + "--"+ cookie.value);
          li.appendChild(cookieDisplay);
          list.appendChild(li);
          countCookies++;
        }
        let cookiesText = document.createElement("p");
        let cookiesContent = document.createTextNode("Number of cookies: "+countCookies);
        cookiesText.appendChild(cookiesContent);
        numberOfCookies.appendChild(cookiesText);
      } else {
        let p = document.createElement("p");
        let content = document.createTextNode("No cookies in this tab.");
        let parent = list.parentNode;
  
        p.appendChild(content);
        parent.appendChild(p);
      }
  
      var webSec = document.getElementById('website-security-status');
      var cookiesSec = document.getElementById('cookies-status');
      
      if(countCookies > 10){
        webSec.innerHTML = "Website uses a lot of cookies";
        webSec.style.color = "red";
        cookiesSec.style.color = "red";
        cookiesSec.setAttribute("value", "10");
      } else {
        cookiesSec.setAttribute("value", "100");
      }
    });
  }
  
  getTab().then(getCookies);