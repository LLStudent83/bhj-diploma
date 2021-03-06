/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  static URL = "/user";
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static setCurrent(user) {
    localStorage.setItem("user", JSON.stringify(user)); //user = { id: 12, name: 'Vlad'};
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    localStorage.removeItem("user");
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    let user = JSON.parse(localStorage.getItem("user"));
    return user;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(data, callback = (f) => f) {
    createRequest(data, "GET", User.URL + "/current", (err, response) => {
      if (response === null) {
        alert("response d User.Fetch равен noll");
        return;
      }
      if (response.success) {
        let user = {
          id: response.user.id,
          name: response.user.name,
        };
        User.setCurrent(user);
      }
      if (!response.success) {
        User.unsetCurrent();
        alert(response.error);
      }
      callback(); //Вызываю callback который находится в методе App.initUser
    });
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static login(data, callback = (f) => f) {
    // data = {email: 'test@test.ru', password: 'abracadabra'}
    createRequest(data, "POST", User.URL + "/login", (err, response) => {
      if (response.success) {
        let user = {
          id: response.user.id,
          name: response.user.name,
        };
        User.setCurrent(user);
      } else {
        alert(response.error)
      }
      callback(response);
    });
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    //data = {name: 'Vlad', email: 'test@test.ru', password: 'abracadabra'}
    createRequest(data, "POST", User.URL + "/register", (err, response) => {
      if (response.success) {
        let user = {
          id: response.user.id,
          name: response.user.name,
        };
        User.setCurrent(user);
        callback(response);
      } else {
        throw response.error;
      }
    });
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback = (f) => f) {
    let xhr = createRequest(
      data,
      "POST",
      User.URL + "/logout",
      (err, response) => {
        if (response.success) {
          User.unsetCurrent();
          callback(response);
        }
      }
    );
  }
}
