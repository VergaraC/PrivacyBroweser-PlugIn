const sumScore = () => {
    var webSec = document.getElementById('website-security-status');
    var score = document.getElementById("website-score");
    var cookies = document.getElementById('cookies-status').getAttribute('value');
    var localStorage = document.getElementById('local-storage-status').getAttribute('value');
    var sessionStorage = document.getElementById('session-storage-status').getAttribute('value');
    var fingerprint = document.getElementById('fingerprint-status').getAttribute('value');

    var cookiesScore = parseInt(cookies);
    var lSScore = parseInt(localStorage);
    var sSScore = parseInt(sessionStorage);
    var fingerprintScore = parseInt(fingerprint);
  
    var progBar = document.getElementById('score-progress-bar');
  
    var score = cookiesScore + lSScore + sSScore + fingerprintScore;
    score.innerHTML = "Website score: " + score;
    
    if(score > 250){
      webSec.innerHTML = "Website is Insecure";
      webSec.style.color = "red";
      progBar.setAttribute("value", score);
    }
    else if(score <= 250 && score > 150){
      webSec.innerHTML = "Website is Sus";
      webSec.style.color = "orange";
      progBar.setAttribute("value", score);
    }
    else{
      webSec.innerHTML = "Website is Secure";
      webSec.style.color = "green";
      progBar.setAttribute("value", score);
    }
  }
  
  function getActiveTab() {
    return browser.tabs.query({
      currentWindow: true, active: true
    });
  }
  
  setTimeout(() => { //sem TimeOut n pega todos os dados
    getActiveTab().then(sumScore);
  }, 500);