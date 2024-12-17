import { HttpClient, HttpParams } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CustomerDTO, InvoiceDTO, PaymentsDTO, ResultsPage, ToDoItem } from "./app.model";

@Injectable({
    providedIn: 'root',
})

export class AppService {
    private httpClient = inject(HttpClient);

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
    //Invoices
    public getSalesByMonth(): Observable<{ [month: number]: any }> {
        return this.httpClient.get<{ [month: number]: any }>(`/api/ac/reports/salesByMonth`);
    }

    public getTotalSalesByCustomer(): Observable<{ [name: string]: any }> {
        return this.httpClient.get<{ [name: string]: any }>(`/api/ac/reports/totalSalesByCustomer`);
    }

    public getInvoicesByCustomerId(customerId: number): Observable<InvoiceDTO[]>{
        return this.httpClient.get<InvoiceDTO[]>(`/api/ac/customers/${customerId}/invoices`);
    }
    public getListPyaments():Observable<PaymentsDTO[]>{
        return this.httpClient.get<PaymentsDTO[]>(`/api/fi`);
    }
    public updatePayment(paymentId: number, payment: Partial<PaymentsDTO>): Observable<void>{
        return this.httpClient.put<void>(`/api/fi/${paymentId}`, payment);
    }
    public getListInvoices(): Observable<InvoiceDTO[]>{
        return this.httpClient.get<InvoiceDTO[]>(`/api/fi/invoice`);
    }
}