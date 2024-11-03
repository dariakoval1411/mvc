import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ToDoItem } from "./app.model";

@Injectable({
    providedIn: 'root',
})

export class AppService { 
    private httpClient = inject(HttpClient);
    
    //Calculte 
    public calculateSum(num1: number, num2: number): Observable<number> { 
        return this.httpClient.get<number>(`api-ui/api/calculate?number1=${num1}&number2=${num2}`);
    }

    //ToDoList
    public getToDoList(): Observable<ToDoItem[]> { 
        return this.httpClient.get<ToDoItem[]>(`api-ui/api/todo`);
    }

    public addToDo(task: ToDoItem): Observable<ToDoItem> { 
        return this.httpClient.post<ToDoItem>(`api-ui/api/todo`, task);
    }

    public deleteToDoItem(id: number): Observable<void>{
        return this.httpClient.delete<void>(`api-ui/api/todo/${id}`);
    }

    public updateToDoItem(id: number,task: ToDoItem): Observable<ToDoItem>{
        return this.httpClient.put<ToDoItem>(`api-ui/api/todo/${id}`, task);
    }
}