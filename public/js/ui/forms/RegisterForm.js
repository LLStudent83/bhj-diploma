/**
 * Класс RegisterForm управляет формой
 * регистрации
 * Наследуется от AsyncForm
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    User.register(data, () => {
      if (xhr.response.success) {
        this.element.reset();//сбрасывает форму
        App.setState("user-logged");
        this.сlose(); // пока не работает
      }
    });
  }
}
