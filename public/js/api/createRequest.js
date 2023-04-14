/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
let formData = new FormData();
    if (options.method.toUpperCase() != 'GET') {
        for (let field in options.data) {
            formData.append(field, options.data[field]);
        }
    } else {
        let param = '';
        let arr = [];
        for (let field in options.data) {
        arr.push(field + '=' + options.data[field]);
        }
        param = arr.join('&');
        options.url = options.url + '?' + param;
    }    
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    try {
        xhr.open(options.method, options.url);
        xhr.send(formData);
    }
    catch (e) {
    options.callback(e);
    }

    xhr.onload = function() {
        let response = null;
        let error = null;
        if (xhr.status != 200) {
            error = xhr.statusText;
        } else {
            response = xhr.response;
        }
        options.callback(error, response);
    }
};
