/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (data = {}, metod, URL, callback) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = "json";
  if (metod === "GET") {
    console.log("data из createRequest ", data);
    let body = "mail=" + data.email + "&password=" + data.password;
    console.log("печатаю боди ", body);
    try {
      xhr.open(metod, URL + body, true);
      //event.preventDefault();
      xhr.onsuccess = () => {
    callback(null, xhr.response);
    console.log("Печатаем xhr успех", xhr);
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
      xhr.open(metod, User.URL, true);
      xhr.onsuccess = () => {
        callback(null, xhr.response);
        console.log("Печатаем xhr успех", xhr);
      };
      xhr.onerror = () => {
        callback(err, xhr.response);
        console.log("Печатаем xhr ошибка", xhr);
      };
      xhr.send(form);
    } catch (e) {
      // перехват сетевой ошибки
      callback(e);
    }
  }

  
  console.log("Печатаем xhr перед ретёрн", xhr)
  return xhr;
};


/*createRequest({
        url: 'https://example.com', // адрес
        headers: { // произвольные заголовки, могут отсутствовать
          'Content-type': 'application/json' 
        },
        data: { // произвольные данные, могут отсутствовать
          email: 'ivan@poselok.ru',
          password: 'odinodin'
        },
        responseType: 'json', // формат, в котором необходимо выдать результат
        method: 'GET', // метод запроса
        /*
          Функция, которая сработает после запроса.
          Если в процессе запроса произойдёт ошибка, её объект
          должен быть в параметре err.
          Если в запросе есть данные, они должны быть переданы в response.
        */
/*callback: (err, response) => {
          console.log( 'Ошибка, если есть', err );
          console.log( 'Данные, если нет ошибки', response );
        }
      });*/
