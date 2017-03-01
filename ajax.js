function ajax(json) {
    json = json || {};
    if (!json.url) {
        console.warn('the url is none');
        return;
    }
    json.type = json.type || 'GET';
    json.time = json.time || 3000;
    var timer = null;  //超时处理
    var xml;
    if (window.XMLHttpRequest) {
        xml = window.XMLHttpRequest();
    } else {
        xml = new ActiveXObject('Microsoft.XMLHTTP');
    }
    switch(json.type.toUpperCase()) {
        case 'GET':
            xml.open('GET', json.url + (json.data ? '?' + jsonToUrl(json.data) : ''), true);
            xml.send();
            break;
        case 'POST':
            xml.open('POST', json.url);
            xml.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xml.send();
            break;
    }
    json.loading && json.loading();
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
            json.complete && json.complete();
            if (xml.status >= 200 && xml.status < 300 || xml.status == 304) {
                json.success && json.success(xml.responseText);

            } else {
                json.error && json.error(xml.status);
            }
            clearTimeout(timer);
        }
    }
    timer = setTimeout(function() {
        console.log('请求超时');
        xml.onreadystatechange = null;
    }, json.time);
}

function jsonToUrl(json) {
    var arr = [];
    for (var name in json) {
        arr.push(name + '=' + json[name]);
    }
    return arr.join('&');
}