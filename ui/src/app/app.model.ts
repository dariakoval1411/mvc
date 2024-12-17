export interface ToDoItem {
    id?: number;
    name: string;
    dueDate: string;
    completed: boolean;
}

export interface CustomerDTO {
    id: number;
    city: string;
    name: string;
    nip: string;
    street: string;
    zipCode: string;
}
export interface PaymentsDTO{ 
    id: number;
    invoiceId: number;
    paymentDate : string;
    status : string;
}
export interface  InvoiceDTO{ 
    id: number;
    invoiceId : number;
    invoiceNumber: string;
    dueDate: string;
    grossPrice: number; 
    paymentDate: string; 
    paymentStatus : string;
}
export interface ResultsPage<T> {
    elements: T[];
    total: number;
}

export interface Page {
    pageSize: number;
    pageIndex: number;
}

export type Filters = { [column: string]: string | null };