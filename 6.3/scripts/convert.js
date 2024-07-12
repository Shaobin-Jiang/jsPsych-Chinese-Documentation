const origin = document.location.origin;
for (let aElem of document.querySelectorAll("a")) {
    if (aElem.href == origin + "/overview/plugins.html#parameters-available-in-all-plugins") {
        aElem.href = origin + "/overview/plugins.html#_3";
    }
    if (aElem.href == origin + "/overview/plugins.html#data-collected-by-all-plugins") {
        aElem.href = origin + "/overview/plugins.html#_4";
    }
}