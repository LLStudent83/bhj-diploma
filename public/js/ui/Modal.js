/**
 * Класс Modal отвечает за
 * управление всплывающими окнами.
 * В первую очередь это открытие или
 * закрытие имеющихся окон
 * */
class Modal {
  /**
   * Устанавливает текущий элемент в свойство element
   * Регистрирует обработчики событий с помощью Modal.registerEvents()
   * Если переданный элемент не существует,
   * необходимо выкинуть ошибку.
   * */
  constructor(element) {
    this.element = element;
    this.registerEvents();
    if (this.element === null) {
      alert("Ошибка Modal.constructor переданный элемент не существует"); // Не уверен в правильности
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let elemButt = this.element.querySelectorAll('button[data-dismiss="modal"]');
    let onCloseFix = this.onClose.bind(this.element);

    for (let i = 0; i < elemButt.length; i++) {
        elemButt[i].onclick = closeWindow;
      }
    function closeWindow() {
      console.log("Сработал обработчик события закрытия окна" + this);
      onCloseFix();
    }
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    console.log("Сработал onClose" + this);
    Modal.close();
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
    removeEventListener("click", closeWindow);
  }
  /**
   * Открывает окно: устанавливает CSS-свойство display
   * со значением «block»
   * */
  open() {
    this.element.setAttribute("style", "display:block");
  }
  /**
   * Закрывает окно: удаляет CSS-свойство display
   * */
  close() {
    this.element.removeAttribute("style");
  }
}
