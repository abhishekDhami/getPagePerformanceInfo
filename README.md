# getPagePerformanceInfo
Javascript plugin: getPagePerformanceInfo

## Install plugin
- Copy and paste javascript code from file pagePerformance.min.js to your webpage's script tag.

## Use of plugin

### getCurrentPagePerformanceInfo()
- Calling this function returns object with current page performance related information.
- Its recommended to call this function when page loaded completely, otherwise some of the metrics may results with empty value (for example, pageLoadEventEnd value only will be available when page-load completes).
- Example:
  ```javascript
  var curPagePerformance=getCurrentPagePerformanceInfo();
  console.log(curPagePerformance.pageurl); // URL of the current page
  console.log(curPagePerformance.navigationType); //type of navigation that occurred (reload, navigate, back_forward)
  console.log(curPagePerformance.connectEnd); // time(in seconds) required for the connection to the server was fully established and the server is ready to receive requests
  console.log(curPagePerformance.responseStart); // time(in seconds) till the browser received the first byte of the response from the server
  console.log(curPagePerformance.domInteractive); //time(in seconds) till the browser has finished parsing the document and it is now interactive
  console.log(curPagePerformance.domComplete); //time(in seconds) till the document has completed loading
  console.log(curPagePerformance.pageLoadEventEnd); //time(in seconds) till the load event's handlers have finished executing
  ```

### getPreviousPagePerformanceInfo()
- Calling this function returns object with previous page performance related information.
- If previous page was not fully/completely loaded then some of the metrics may results with empty value(for example, pageLoadEventEnd value only will be available when page-load completes).
- Example:
  ```javascript
  var prevPagePerformance=getPreviousPagePerformanceInfo();
  console.log(prevPagePerformance.pageurl); // URL of the previous page
  console.log(prevPagePerformance.navigationType); //type of navigation that occurred (reload, navigate, back_forward)
  console.log(prevPagePerformance.connectEnd); // time(in seconds) required for the connection to the server was fully established and the server is ready to receive requests
  console.log(prevPagePerformance.responseStart); // time(in seconds) till the browser received the first byte of the response from the server
  console.log(prevPagePerformance.domInteractive); //time(in seconds) till the browser has finished parsing the document and it is now interactive
  console.log(prevPagePerformance.domComplete); //time(in seconds) till the document has completed loading
  console.log(prevPagePerformance.pageLoadEventEnd); //time(in seconds) till the load event's handlers have finished executing
  ```
## Validations
- DO NOT DEPLOY ANY CHANGE TO PRODUCTION WITHOUT THOROUGHLY VALIDATING WEBSITE AFTER INSTALLINNG getPagePerformanceInfo UTLITY. Its best to validate implementation across browsers, devices and then should deploy this plugin to production if there is no impact.
