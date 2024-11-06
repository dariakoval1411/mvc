import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerDTO, ResultsPage, ToDoItem } from "./app.model";

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

    public deleteToDoItem(id: number): Observable<void> {
        return this.httpClient.delete<void>(`api-ui/api/todo/${id}`);
    }

    public updateToDoItem(id: number, task: ToDoItem): Observable<ToDoItem> {
        return this.httpClient.put<ToDoItem>(`api-ui/api/todo/${id}`, task);
    }

    public findCustomers( id?: number,city?: string,name?: string,nip?: string,zipCode?: string,orderBy: string = 'id',
        offset: number = 0,
        limit: number = 20
    ): Observable<ResultsPage<CustomerDTO>> {
        let params = new HttpParams()
            .set('offset', offset.toString())
            .set('limit', limit.toString())
            .set('orderBy', orderBy);

        if (id) params = params.set('id', id.toString());
        if (city) params = params.set('city', city);
        if (name) params = params.set('name', name);
        if (nip) params = params.set('nip', nip);
        if (zipCode) params = params.set('zipCode', zipCode);

        return this.httpClient.get<ResultsPage<CustomerDTO>>(`api/ac/find`, { params });
    }

    public deleteCustomer(id: number) : Observable<void> {
        return this.httpClient.delete<void>(`api/ac/${id}`);
    }

    public updateCustomer(id: number, customer: CustomerDTO) : Observable<CustomerDTO> {
        return this.httpClient.put<CustomerDTO>(`api/ac/${id}`, customer);
    }

    public addCustomer(customer: CustomerDTO) : Observable<CustomerDTO> {
        return this.httpClient.post<CustomerDTO>(`api/ac`, customer);
    }
}