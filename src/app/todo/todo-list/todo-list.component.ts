import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
})
export class TodoListComponent implements OnInit {
  todos: Todo[] = [];

  constructor(private todoService: TodoService) { }

  ngOnInit(): void {
    this.loadTodos();
  }

  loadTodos(): void {
    this.todoService.getTodos().subscribe({
      next: todos => this.todos = todos.slice(0, 10),
      error: err => console.error('Error loading todos', err)
    });
  }

  addTodo(title: string): void {
    this.todoService.addTodo(title).subscribe({
      next: todo => this.todos.push(todo),
      error: err => console.error('Error adding todo', err)
    });
  }

  updateTodo(todo: Todo): void {
    this.todoService.updateTodo(todo).subscribe({
      next: updated => {
        const index = this.todos.findIndex(t => t.id === updated.id);
        if (index !== -1) this.todos[index] = updated;
      },
      error: err => console.error('Error updating todo', err)
    });
  }
}
