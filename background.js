var browser = chrome;
if (!chrome){
	browser = browser;
}

extension_replacements = {".jpg:orig"  : ".jpg", ".png:orig"  : ".png",
                          ".jpg:large" : ".jpg", ".png:large" : ".png",
                          ".jpg:medium": ".jpg", ".png:medium": ".png",
                          ".jpg:small" : ".jpg", ".png:small" : ".png",
                          ".jpg:tiny"  : ".jpg", ".png:tiny"  : ".png"}

function multiReplace(string_var, replace_pairs) {
    for (let [key, val] of Object.entries(replace_pairs)) {
        string_var = string_var.replace(key, val);
    }
    return string_var
}

browser.webRequest.onHeadersReceived.addListener(details => {
    let url_split = details.url.split("/"); let filename = url_split[url_split.length - 1];
    let fixed_filename = multiReplace(filename, extension_replacements);
    details.responseHeaders.push({name: "content-disposition", value: "inline; filename=\"" + fixed_filename + "\";"});

    return {responseHeaders: details.responseHeaders}
},
{
    urls: ["*://pbs.twimg.com/media/*"]
},
          ["blocking", "responseHeaders"])
