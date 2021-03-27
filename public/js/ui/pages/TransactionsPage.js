/**
 * Класс TransactionsPage управляет
 * страницей отображения доходов и
 * расходов конкретного счёта
 * */
class TransactionsPage {
  //static lastOptions;
  /**
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * Сохраняет переданный элемент и регистрирует события
   * через registerEvents()
   * */
  constructor(element) {
    if (!element) {
      throw new Error("переданый в AsyncForm элемент не существует")
    }
    this.element = element;
    this.registerEvents();
  }

  /**
   * Вызывает метод render для отрисовки страницы
   * В случае, если метод render() был ранее вызван с какими-то опциями,
   * при вызове update() эти опции необходимо передать повторно
   * */
  update() {
    this.render(this.lastOptions);
    //this.render(TransactionsPage.lastOptions);
  }

  /**
   * Отслеживает нажатие на кнопку удаления транзакции
   * и удаления самого счёта. Внутри обработчика пользуйтесь
   * методами TransactionsPage.removeTransaction и
   * TransactionsPage.removeAccount соответственно
   * */
  registerEvents() {
    let elementWrapper = document.querySelector(".content-wrapper");
    elementWrapper.addEventListener("click", (event) => {
      if (event.target.closest(".remove-account")) {
        // удаление счета
        this.removeAccount();
        console.log("кликнули удалить счет");
      }

      if (event.target.closest(".transaction__remove")) {
        console.log("Сработала кнопка удаления тракзакции");
        let id = event.target
          .closest(".transaction__remove")
          .getAttribute("data-id");
        this.removeTransaction(id);
      }
    });
  }

  /**
   * Удаляет счёт. Необходимо показать диаголовое окно (с помощью confirm())
   * Если пользователь согласен удалить счёт, вызовите
   * Account.remove, а также TransactionsPage.clear с
   * пустыми данными для того, чтобы очистить страницу.
   * По успешному удалению необходимо вызвать метод App.update()
   * для обновления приложения
   * */
  removeAccount() {
    if (!this.lastOptions) {
      return;
    } else {
      let message = confirm("Вы действительно хотите удалить счет?");
      if (message) {
        let accountActive = document.querySelector(".account.active"); //main-header
        let id = accountActive.getAttribute("data-id");
        Account.remove(id, User.current(), (response) => {
          if (response.success) {
            App.update();
          }
        });
        this.clear();
      }
    }
  }

  /**
   * Удаляет транзакцию (доход или расход). Требует
   * подтверждеия действия (с помощью confirm()).
   * По удалению транзакции вызовите метод App.update()
   * */
  removeTransaction(id) {
    let message = confirm("Вы действительно хотите удалить транзакцию?");
    if (message) {
      Transaction.remove(id, User.current(), (response) => {
        if (response.success) {
          App.update();
        }
      });
    }
  }
  //<button class="btn btn-danger transaction__remove" data-id="18jz9sc2ckmc3loze">

  /**
   * С помощью Account.get() получает название счёта и отображает
   * его через TransactionsPage.renderTitle.
   * Получает список Transaction.list и полученные данные передаёт
   * в TransactionsPage.renderTransactions()
   * */
  render(options) {
    //account_id - идентификатор счёта
    if (options === undefined) {
      return;
    }
    this.lastOptions = options;
    //TransactionsPage.lastOptions = options;
    this.renderTransactions([]); // что бы не задваивал транзакции на странице
    Account.get(options, {}, (response) => {
      this.renderTitle(response.data.name);
    });
    let data = { account_id: options };
    Transaction.list(data, (response) => {
      this.renderTransactions(response.data);
    });
  }

  /**
   * Очищает страницу. Вызывает
   * TransactionsPage.renderTransactions() с пустым массивом.
   * Устанавливает заголовок: «Название счёта»
   * */
  clear() {
    this.renderTransactions([]);
    this.renderTitle("Название счёта");
    this.lastOptions = null;
  }

  /**
   * Устанавливает заголовок в элемент .content-title
   * */
  renderTitle(name) {
    let elementNameScore = document.querySelector(".content-title");
    //name === undefined ? (name = "Название счёта") : (name = name);
    elementNameScore.textContent = name;
  }

  /**
   * Форматирует дату в формате 2019-03-10 03:20:41 (строка)
   * в формат «10 марта 2019 г. в 03:20»
   * */
  formatDate(date) {
    let newDate = new Date(date);
    let dateDME = newDate.toLocaleString("ru", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    let time = newDate.toLocaleTimeString("ru", {
      hour: `2-digit`,
      minute: `2-digit`,
    });
    return `${dateDME} в ${time}`;
  }

  /**
   * Формирует HTML-код транзакции (дохода или расхода).
   * item - объект с информацией о транзакции
   * */
  getTransactionHTML(item) {
    let html = `
    <div class="transaction transaction_${item.type} row">
    <div class="col-md-7 transaction__details">
      <div class="transaction__icon">
          <span class="fa fa-money fa-2x"></span>
      </div>
      <div class="transaction__info">
          <h4 class="transaction__title">${item.name}</h4>
          <!-- дата -->
          <div class="transaction__date">${this.formatDate(
            item.created_at
          )}</div>
      </div>
    </div>
    <div class="col-md-3">
      <div class="transaction__summ">
      <!--  сумма -->
          <span class="currency">${item.sum}₽</span>
      </div>
    </div>
    <div class="col-md-2 transaction__controls">
        <!-- в data-id нужно поместить id -->
        <button class="btn btn-danger transaction__remove" data-id="${item.id}">
            <i class="fa fa-trash"></i>  
        </button>
    </div>
</div>
`;
    return html;
  }

  /**
   * Отрисовывает список транзакций на странице
   * используя getTransactionHTML
   * */
  renderTransactions(data) {
    let elementContent = this.element.querySelector(".content");

    if (data.length === 0) {
      elementContent.innerHTML = "";
    } else {
      for (let item of data) {
        elementContent.insertAdjacentHTML(
          "beforeEnd",
          this.getTransactionHTML(item)
        );
      }
    }
  }
}
