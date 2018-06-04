var browser = chrome;
if (!chrome){
	browser = browser;
}

browser.webRequest.onBeforeRequest.addListener(details => {
    var url = details.url;    
    if (!url.match(/:orig$/)) {
        var filename = url.substring(url.lastIndexOf("/") + 1, url.length);
        var base_url = url.substring(0, url.lastIndexOf("/") + 1);
        if (filename.includes(":")) {
            filename = filename.substring(0, filename.lastIndexOf(":"))
        }
        var new_url = (base_url + filename + ":orig")
        return {redirectUrl: new_url}
    } 
},
{
    urls: ["*://pbs.twimg.com/media/*"]
},
          ["blocking"])

browser.webRequest.onHeadersReceived.addListener(details => {
    var url_split = details.url.split("/"); 
    var filename = url_split[url_split.length - 1];
    var fixed_filename = filename.replace(/:[a-z]+/i, "")

    details.responseHeaders.push({name: "content-disposition", value: "inline; filename=\"" + fixed_filename + "\";"});
    return {responseHeaders: details.responseHeaders}
},
{
    urls: ["*://pbs.twimg.com/media/*"]
},
          ["blocking", "responseHeaders"])
