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
export interface ResultsPage<T> {
    elements: T[];
    total: number;
}

export interface Page {
    pageSize: number;
    pageIndex: number;
}

export type Filters = { [column: string]: string | null };