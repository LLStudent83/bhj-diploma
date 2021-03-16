/**
 * Класс AccountsWidget управляет блоком
 * отображения счетов в боковой колонке
 * */
class AccountsWidget {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью
   * AccountsWidget.registerEvents()
   * Вызывает AccountsWidget.update() для получения
   * списка счетов и последующего отображения
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    if (!element) {
      throw new Error("Переданный элемент не существует");
    }
    this.element = element; // ul.sidebar-menu accounts-panel (панель со счетами);
    //this.elemScore = document.querySelectorAll(".account");
    this.update();
    this.registerEvents();
  }

  /**
   * При нажатии на .create-account открывает окно
   * #modal-new-account для создания нового счёта
   * При нажатии на один из существующих счетов
   * (которые отображены в боковой колонке),
   * вызывает AccountsWidget.onSelectAccount()
   * */
  registerEvents() {
    let elemNewAccount = this.element.querySelector(".create-account");
    let bindOnSelectAccount = this.onSelectAccount.bind(this);

    this.element.addEventListener("click", (event) => {
      if (event.target === elemNewAccount) {
        App.getModal("createAccount").open();
      } else {
        //console.log("Меня кликнули", event);

        bindOnSelectAccount(event.target);
      }
    });
  }

  /**
   * Метод доступен только авторизованным пользователям
   * (User.current()).
   * Если пользователь авторизован, необходимо
   * получить список счетов через Account.list(). При
   * успешном ответе необходимо очистить список ранее
   * отображённых счетов через AccountsWidget.clear().
   * Отображает список полученных счетов с помощью
   * метода renderItem()
   * */
  update() {
    if (User.current()) {
      Account.list(User.current(), (response) => {
        if (response.success) {
          this.clear();
          for (let item of response.data) {
            this.renderItem(item);
          }
        }
      });
    }
    //this.registerEvents();
  }

  /**
   * Очищает список ранее отображённых счетов.
   * Для этого необходимо удалять все элементы .account
   * в боковой колонке
   * */
  clear() {
    let elemScore = document.querySelectorAll(".account");
    if (elemScore.length > 0) {
      for (let i = 0; i < elemScore.length; i++) {
        elemScore[i].remove();
      }
    }
  }
  /**
   * Срабатывает в момент выбора счёта
   * Устанавливает текущему выбранному элементу счёта
   * класс .active. Удаляет ранее выбранному элементу
   * счёта класс .active.
   * Вызывает App.showPage( 'transactions', { account_id: id_счёта });
   * */
  onSelectAccount(element) {
    // element это элемент счета по которому кликнули

    if (this.element.querySelector(".active")) {
      this.element.querySelector(".active").classList.remove("active");
      element.closest(".account").classList.add("active");
    } else {
      element.closest(".account").classList.add("active");
    }

    App.showPage(
      "transactions",
      element.closest(".account").getAttribute("data-id")
    );
  }

  /**
   * Возвращает HTML-код счёта для последующего
   * отображения в боковой колонке.
   * item - объект с данными о счёте
   * */
  getAccountHTML(item) {
    let html = `
<li class="account" data-id=${item.id}>
    <a href="#">
        <span>${item.name}</span> 
        <span>${item.sum} ₽</span>
    </a>
</li>
`;
    return html;
  }

  /**
   * Получает массив с информацией о счетах.
   * Отображает полученный с помощью метода
   * AccountsWidget.getAccountHTML HTML-код элемента
   * и добавляет его внутрь элемента виджета
   * */
  renderItem(item) {
    this.element.insertAdjacentHTML("beforeEnd", this.getAccountHTML(item));
  }
}
