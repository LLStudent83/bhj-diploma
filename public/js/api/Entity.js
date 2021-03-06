/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  static URL = "";
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static list(data, callback = (f) => f) {
    //data {mail:, password}
    createRequest(data, "GET", this.URL, (err, response) => {
      callback(response);
      if (!response.success) {
        alert(`error: ${err}, ошибка ${response}`);
      }
      return response;
    });
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = (f) => f) {

    let modifiedData = Object.assign({ _method: "PUT" }, data);

    createRequest(modifiedData, "POST", this.URL, (err, response) => {
      callback(response);
      if (!response.success) {
        alert(`error: ${err}, ошибка ${response}`);
      }
    });
  }

  /**
   * Получает информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static get(id = "", data, callback = (f) => f) { //id счета, data 
    let modifiedData = Object.assign(data, id);

    //createRequest(id, "GET", "/account?18jz9sc68klkzsknk&", (err, response) => { //"/account?account_id=18jz9sc68klkzsknk&"
    createRequest(modifiedData, "GET", this.URL, (err, response) => {
    callback(id, response);
      if (!response.success) {
        alert(`error: ${err}, ошибка ${response}`);
      }
    });
  }


  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = "", data, callback = (f) => f) {
    let modifiedData = Object.assign({ _method: "PUT", "id": id }, data);

    createRequest(modifiedData, "POST", this.URL, (err, response) => {
      callback(response);
      if (!response.success) {
        alert(`error: ${err}, ошибка ${response}`);
      }
    });
  }
}
