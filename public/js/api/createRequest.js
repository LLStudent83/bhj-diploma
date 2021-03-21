/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (data = {}, metod, URL, callback) => {
  const xhr = new XMLHttpRequest();
  let form = new FormData();
  xhr.responseType = "json";
  if (metod === "GET") {
    if (typeof data === "string") {
      URL += "/" + data;
    } else {
      URL += "?";
      for (let key in data) {
        URL += `${key}=${data[key]}&`;
      }
    }
    try {
      xhr.open(metod, URL, true);
      xhr.onload = () => {
        callback(null, xhr.response);
      };
      xhr.onerror = (err) => {
        callback(err, xhr.response);
        console.log("Печатаем xhr ошибка", err);
      };
    } catch {
      // перехват сетевой ошибки
      callback(e);
    }
  } else {
    
    for (let key in data) {
      form.append(key, data[key]);
    }
    try {
      xhr.open(metod, URL, true);
      xhr.onload = () => {
        if (xhr.status === 200) {
          callback(null, xhr.response);
        }
      };
      xhr.onerror = () => {
        callback(err, xhr.response);
      };
    } catch (e) {
      // перехват сетевой ошибки
      callback(e);
    }
  }
  xhr.send(metod !== "GET" && form);
  //xhr.send(metod !== "GET" ? form : null)
  //metod === "GET" ? xhr.send() : xhr.send(form);
  //xhr.send(form);
  //return xhr;
};
