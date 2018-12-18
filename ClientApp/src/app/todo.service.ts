import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Todo } from "./todo";
import { Observable } from 'rxjs/Observable';
import { tap } from "rxjs/operators";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class TodoService {

  private apiURL: string;

  constructor( 
    private http: HttpClient, 
    @Inject('BASE_URL') baseUrl: string)   
  {
    this.apiURL = baseUrl + "api/todo";
    // this.apiURL = "localhost:5000/api/todo";
  }

  getAll(): Observable<Todo[]> {
    return this.http.get<Todo[]>(this.apiURL)
    // .pipe(
    //   tap(td => console.log("Fetched all TODO items ", td))
    //   tap(td => Todo = td)
    // );
  }

  add(tdItem: Todo): Observable<Todo>{
    return this.http.post<Todo>(this.apiURL, tdItem, httpOptions)
    // .pipe(
    //   tap((td: Todo) => console.log(`Added new ToDo Item w/ id=${td.id}`)))
  }

  removeTodo(tdItem: Todo | number): Observable<Todo> {
    const id = typeof tdItem === 'number' ? tdItem : tdItem.id;
    const url = `${this.apiURL}/${id}`;

    return this.http.delete<Todo>(url, httpOptions)
    // .pipe(
    //   tap(_ => console.log(`Deleting hero id=${id}`))
    // )
  }

  updateTodo(tdItem: Todo) {
    const id = tdItem.id;
    const url = `${this.apiURL}/${id}`;

    return this.http.put(url, tdItem, httpOptions)
    // .pipe(
    //   tap(_ => console.log(`Updated Todo status id=${tdItem.id}`))
    // );
  }

}
