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
      alert("Ошибка Modal.constructor переданный элемент не существует");// Не уверен в правильности
    }
  }

  /**
   * При нажатии на элемент с data-dismiss="modal"
   * должен закрыть текущее окно
   * (с помощью метода Modal.onClose)
   * */
  registerEvents() {
    let elemClose = this.element.querySelector(".close");
    let elemBtnDefault = this.element.querySelector(".btn-default");
    
    function closeWindow() {
      console.log("Сработал обработчик события закрытия окна")
      //onClose();
    }
    elemClose.eddEventListener("click", closeWindow);
    
    elemBtnDefault.onClick = this.onClose();
    
    
  }

  /**
   * Срабатывает после нажатия на элементы, закрывающие окно.
   * Закрывает текущее окно (Modal.close())
   * */
  onClose(e) {
    this.close(e);
  }
  /**
   * Удаляет обработчики событий
   * */
  unregisterEvents() {
removeEventListener("click", closeWindow())
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
