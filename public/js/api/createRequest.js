/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (data, callback) => {
  const xhr = new XMLHttpRequest();
  let form = new FormData();
  xhr.responseType = "json";
  xhr.open("GET", "/user/current", true);
  xhr.send(formData);
  xhr.onsuccess = () => {
      callback(null, xhr.response);
    };
  xhr.onerror = () => {
    callback(err, xhr.response);
  };
    console.log("Печатаем xhr" + xhr);
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
      });
       */
