/******************************************* BEGIN CODE TO DEPLOY *******************************************/
//Get current page performance metrics related to the loading and navigation of a web page
function getCurrentPagePerformanceInfo() {
  try {
    let currentPagePerformanceInfo = { pageurl: "", navigationType: "", connectEnd: "", responseStart: "", domInteractive: "", domComplete: "", pageLoadEventEnd: "" };

    currentPagePerformanceInfo.pageurl = window.location.href;

    //provides access to performance metrics related to the loading and navigation of a web page
    let performanceEntries = performance.getEntriesByType("navigation")[0];
    if (performanceEntries !== undefined) {
      //Represents the type of navigation that occurred. This can be one of the following values
      //reload, navigate, back_forward
      if (performanceEntries.type) currentPagePerformanceInfo.navigationType = performanceEntries.type;

      //time required for the connection to the server was fully established and the server is ready to receive requests.
      //including DNS lookup, TCP connection, and SSL handshake timings
      if (performanceEntries.connectEnd) currentPagePerformanceInfo.connectEnd = (performanceEntries.connectEnd / 1000).toFixed(2);

      //time till the browser received the first byte of the response from the server
      if (performanceEntries.responseStart) currentPagePerformanceInfo.responseStart = (performanceEntries.responseStart / 1000).toFixed(2);

      //time till the browser has finished parsing the document and it is now interactive, meaning that it is capable of responding to user interactions
      if (performanceEntries.domInteractive) currentPagePerformanceInfo.domInteractive = (performanceEntries.domInteractive / 1000).toFixed(2);

      //time till the document has completed loading
      if (performanceEntries.domComplete) currentPagePerformanceInfo.domComplete = (performanceEntries.domComplete / 1000).toFixed(2);

      //time till the load event's handlers have finished executing
      if (performanceEntries.loadEventEnd) currentPagePerformanceInfo.pageLoadEventEnd = (performanceEntries.loadEventEnd / 1000).toFixed(2);
    }
    return currentPagePerformanceInfo;
  } catch (err) {
    console.log("[PageLoadTime utility] Error occured" + err.message);
  }
}
//Get previous page performance metrics related to the loading and navigation of a web page
function getPreviousPagePerformanceInfo() {
  try {
    let prevPagePerformanceInfo = { pageurl: "", navigationType: "", connectEnd: "", responseStart: "", domInteractive: "", domComplete: "", pageLoadEventEnd: "" };

    //read cookie-cust_ppi
    let cookieIndex = document.cookie.indexOf("cust_ppi");
    if (cookieIndex == -1) return prevPagePerformanceInfo;
    let cookieEndIndex = document.cookie.indexOf(";", cookieIndex);
    if (cookieEndIndex == -1) cookieEndIndex = document.cookie.length;
    let cust_ppi_cookie = document.cookie.substring(cookieIndex, cookieEndIndex).split("=");
    cust_ppi_cookie = decodeURIComponent(cust_ppi_cookie[1]);
    if (cust_ppi_cookie) {
      let previousPagePerformanceInfo = cust_ppi_cookie.split(",");
      prevPagePerformanceInfo.pageurl = previousPagePerformanceInfo[0];
      prevPagePerformanceInfo.navigationType = previousPagePerformanceInfo[1];
      prevPagePerformanceInfo.connectEnd = previousPagePerformanceInfo[2];
      prevPagePerformanceInfo.responseStart = previousPagePerformanceInfo[3];
      prevPagePerformanceInfo.domInteractive = previousPagePerformanceInfo[4];
      prevPagePerformanceInfo.domComplete = previousPagePerformanceInfo[5];
      prevPagePerformanceInfo.pageLoadEventEnd = previousPagePerformanceInfo[6];
    }
    return prevPagePerformanceInfo;
  } catch (err) {
    console.log("[PageLoadTime utility] Error occured" + err.message);
  }
}
(function () {
  window.addEventListener("beforeunload", () => {
    try {
      let currentPagePerformanceInfo = window.getCurrentPagePerformanceInfo();
      let pagePerformanceInfo = "";

      pagePerformanceInfo += window.location.href;

      pagePerformanceInfo += "," + currentPagePerformanceInfo.navigationType;

      pagePerformanceInfo += "," + currentPagePerformanceInfo.connectEnd;

      pagePerformanceInfo += "," + currentPagePerformanceInfo.responseStart;

      pagePerformanceInfo += "," + currentPagePerformanceInfo.domInteractive;

      pagePerformanceInfo += "," + currentPagePerformanceInfo.domComplete;

      pagePerformanceInfo += "," + currentPagePerformanceInfo.pageLoadEventEnd;

      document.cookie = "cust_ppi=" + encodeURIComponent(pagePerformanceInfo) + "; path=/";
    } catch (err) {
      console.log("[PageLoadTime utility] Error occured" + err.message);
    }
  });
})();
/******************************************** END CODE TO DEPLOY ********************************************/
