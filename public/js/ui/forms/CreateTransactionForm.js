/**
 * Класс CreateTransactionForm управляет формой
 * создания новой транзакции
 * Наследуется от AsyncForm
 * */
class CreateTransactionForm extends AsyncForm {
  /**
   * Вызывает родительский конструктор и
   * метод renderAccountsList
   * */
  constructor(element) {
    super(element);
    this.renderAccountsList();
  }

  /**
   * Получает список счетов с помощью Account.list
   * Обновляет в форме всплывающего окна выпадающий список
   * */
  renderAccountsList() {
    Account.list(User.current(), (response) => {
      if (this.element === document.querySelector("#new-income-form")) {
        document.querySelector("#income-accounts-list").innerHTML = "";
        for (let item of response.data) {
          let html = `<option value="${item.id}">${item.name}</option>`;
          let elemAccountsList = this.element.querySelector(
            "#income-accounts-list"
          );
          elemAccountsList.insertAdjacentHTML("beforeEnd", html);
        }
      } else {
        document.querySelector("#expense-accounts-list").innerHTML = "";
        for (let item of response.data) {
          let html = `<option value="${item.id}">${item.name}</option>`;
          let elemAccountsList = this.element.querySelector(
            "#expense-accounts-list"
          );
          elemAccountsList.insertAdjacentHTML("beforeEnd", html);
        }
      }
    });
  }

  /**
   * Создаёт новую транзакцию (доход или расход)
   * с помощью Transaction.create. По успешному результату
   * вызывает App.update(), сбрасывает форму и закрывает окно,
   * в котором находится форма
   * */
  onSubmit(options) {
    Transaction.create(options, (response) => {
      if (response.success) {
        this.element.reset(); //сбрасывает форму
        if (this.element === document.querySelector("#new-income-form")) {
          App.getModal("newIncome").close(); //доход
        } else {
          App.getModal("newExpense").close();
        }

        App.update();
      } else {
        alert(response.err);
      }
    });
  }
}
