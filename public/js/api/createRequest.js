/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (data = {}, metod, URL, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  if (metod === "GET") {
    console.log("data из createRequest ", data);
    
    URL += "?";
    for(let key in data) {
      URL += `${key}=${data[key]}&`
    }
    

    //let body = "email=" + data.email + "&password=" + data.password;
    try {
      xhr.open(metod, URL, true);
      //event.preventDefault();
      xhr.onload = () => {
        callback(null, xhr.response);
      };
      xhr.onerror = () => {
        callback(err, xhr.response);
        console.log("Печатаем xhr ошибка", xhr);
      };
      xhr.send();
    } catch {
      // перехват сетевой ошибки
      callback(e);
    }
  } else {
    let form = new FormData();
    form.append("name", data.name);
    form.append("email", data.email);
    form.append("password", data.password);

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
      xhr.send(form);

    } catch (e) {
      // перехват сетевой ошибки
      callback(e);
    }
  }
  return xhr;
};
