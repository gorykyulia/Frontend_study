class OrdersComponent {
  constructor(options) {
    this._rootElem = options.elem,
      this._orders = orders,
      this._addBtn = document.querySelector('.addBtn');
    this._init();
  }

  _init() {
    this._buildList();
    this._rootElem.addEventListener('click', this._onClick.bind(this));
  }

  _onClick() {
    let target = event.target;
    if (target.closest('.addBtn')) {
      this._showCreateDialog();
    }
    if (target.closest('.editBtn')) {
      this._editOrder(target);
    }
    if (target.closest('.deleteBtn')) {
      this._deleteOrder(target);
    }
    if (target.closest('.addButton')) {
      this._addOrder();
    }
    if (target.closest('.cancelButton')) {
      this._deleteDialog();
    }
    if(target.closest('.saveButton')) {
      this._saveOrder();
    }
  }

  _buildList() {
    orders.forEach(order => {
      this._rootElem.querySelector('tbody').innerHTML += this._createOrder(order);
    });
  }

  _createOrder(order) {
    let rowTemplate = `<tr id=${order.id}>
                          <td>${order.id}</td>
                          <td>${order.name}</td>
                          <td>${order.createdDate}</td>
                          <td>${order.description}</td>
                          <td><button class="editBtn">Edit</button></td>
                          <td><button class="deleteBtn">Delete</button></td>
                        </tr>`;
    return rowTemplate;
  }

  _addOrder() {
    let name = this._dialogElemAddOrder.querySelector('input#nameField').value;
    let description = this._dialogElemAddOrder.querySelector('input#descrField').value;

    if (name.trim() && description.trim()) {
      let newOrder = {
        "id": `${this._orders.length + 1}`,
        "name": name,
        "createdDate": this._getDate(),
        "description": description
      };
      this._createOrder(newOrder);
      this._rootElem.querySelector('tbody').innerHTML += rowTemplate;
      this._orders.push(newOrder);
      this._deleteDialog();
    }
  }

  _getDate() {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    if (day < 10) { day = `0${day}` }
    if (month < 10) { month = `0${month}` }

    return `${day}.${month}.${year}`;
  }

  _createTemplateOrderCreate() {
    const template = `<dialog id="dialog">
                        <div>
                          <label for="nameField">Name: </label>
                          <input id="nameField" type="text">
                        </div>
                        <div>
                          <label for="descrField">Description: </label>
                          <input id="descrField" type="text">
                        </div>
                        <div class="boxBtn">
                          <button class="addButton">Add</button>
                          <button class="cancelButton">Cancel</button>
                          </div>
                      </dialog>`;
    return template;
  }

  _createTemplateOrderEdit(orderIndex) {
    const order = this._orders[orderIndex];
    const template = `<dialog id="dialog">
                        <div>
                          <label for="idField">Id: </label>
                          <input id="idField" type="number" value=${order.id}>
                        </div>
                        <div>
                          <label for="nameField">Name: </label>
                          <input id="nameField" type="text" value=${order.name}>
                        </div>
                        <div>
                          <label for="descrField">Description: </label>
                          <input id="descrField" type="text" value=${order.description}>
                        </div>
                        <div>
                          <label for="dateField">Date: </label>
                          <input id="dateField" type="text" value=${order.createdDate}>
                        </div>
                        <div class="boxBtn">
                          <button class="saveButton">Save</button>
                          <button class="cancelButton">Cancel</button>
                          </div>
                      </dialog>`;
    return template;
  }

  _showCreateDialog() {
    this._rootElem.innerHTML += this._createTemplateOrderCreate();
    this._dialogElemAddOrder = document.getElementById('dialog');
    this._dialogElemAddOrder.show();
  }

  _deleteDialog() {
    let target = event.target;
    while(target.tagName !== "DIALOG"){
      target = target.parentElement;
    }
    target.close();
    target.parentElement.removeChild(dialog);
  }

  _deleteOrder(target) {
    while (target.tagName !== "TR") {
      target = target.parentElement;
    }
    let index = target.id - 1;
    target.parentElement.removeChild(target);
    this._orders.splice(index, 1);
  }

  _editOrder(target) {
    while (target.tagName !== "TR") {
      target = target.parentElement;
    }
    let index = target.id - 1;
    this._showEditDialog(index);
    this._editedOrder = index;
  }

  _showEditDialog(index) {
    this._rootElem.innerHTML += this._createTemplateOrderEdit(index);
    this._dialogElemEditOrder = document.getElementById('dialog');
    this._dialogElemEditOrder.show();
  }

  _saveOrder() {
    let editedOrder = {
      "id": this._dialogElemEditOrder.querySelector('#idField').value,
      "name": this._dialogElemEditOrder.querySelector('#nameField').value,
      "description": this._dialogElemEditOrder.querySelector('#descrField').value,
      "createdDate": this._dialogElemEditOrder.querySelector('#dateField').value
    }
    let i = this._editedOrder;
    this._orders[i] = editedOrder;
    this._refreshRow();
    // this._dialogElemEditOrder
  }

  _refreshRow() {
    let sel = `#${this._editedOrder + 1}`;
    const refreshedRow = this._rootElem.querySelector(sel);
    const nextSibling = refreshedRow.nextElementSibling;
    const parent = refreshedRow.parentElement; 
    parent.removeChild(refeshedRow);
    parent.insertAdjacentHTML(this._createOrder(this._editOrder), nextSibling);
  }
}