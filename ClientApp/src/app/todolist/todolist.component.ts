import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class TodolistComponent implements OnInit {

  todoList: Todo[];

  constructor(private service: TodoService) { }

  ngOnInit() {
    this.getAllTodos();
  }

  getAllTodos(): void{
    this.service.getAll().subscribe(td => this.todoList = td);
    // this.service.getAll().subscribe(td => console.log(td));
    // console.log(this.todoList)
  }

  addItem(name: string): void{
    name = name.trim();
    if(!name){return};
    this.service.add({name} as Todo).subscribe( td => {
      this.todoList.push(td)
    });
  }

  deleteItem(tdItem : Todo): void{
    this.service.removeTodo(tdItem).subscribe(_ => {
      this.todoList = this.todoList.filter(td => td !== tdItem)
    });
  }

  updateItem(tdItem: Todo): void {

    tdItem.isComplete = !tdItem.isComplete;
    this.service.updateTodo(tdItem).subscribe();

  }
}
