/*
  Implement a class `Todo` having below methods
    - add(todo): adds todo to list of todos
    - remove(indexOfTodo): remove todo from list of todos
    - update(index, updatedTodo): update todo at given index
    - getAll: returns all todos
    - get(indexOfTodo): returns todo at given index
    - clear: deletes all todos

  Once you've implemented the logic, test your code by running
*/

class Todo {
  constructor(todo = []) {
    this.todo = todo;
  }
  add(data) {
    this.todo.push(data);
  }
  remove(index) {
    if (index < this.todo.length)
      this.todo.splice(index, 1);
  }
  update(index, updatedToDo) {
    if (index < this.todo.length)
      this.todo[index] = updatedToDo;
  }
  getAll() {
    return this.todo;
  }
  get(ind) {
    if (ind < this.todo.length)
      return this.todo[ind];
    else 
    return null;
  }
  clear() {
    this.todo = [];
  }


}

//let todoList = new Todo();
//todoList.add('Task 1');
//todoList.add('Task 2');
//todoList.add('Task 3');
//todoList.update(1, 'Updated Task 2');
//todoList.update(3, 'Invalid Task');
//console.log(todoList.getAll());
module.exports = Todo;
