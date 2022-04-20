export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialItems = items;
    this._renderer = renderer;
    this._container = containerSelector;
  }

  //принимает DOM-элемент и добавляет его в контейнер
  addItem(element, addCard) {
    if (addCard) {
      this._container.prepend(element);
    } else {
      this._container.append(element);
    }
  }
  // отрисовка всех элементов
  renderItems() {
    this._initialItems.forEach((item) => {
      this._renderer(item, this._container);
    });
  }
}
