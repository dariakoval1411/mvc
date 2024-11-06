import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from "@angular/core";
import { MatTableDataSource } from "@angular/material/table";
import { CustomerDTO } from "../../app.model";
import { AppService } from "../../app.service";
import { MatSort, Sort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@Component({
    selector: 'app-customers',
    templateUrl: './customers.component.html',
    styleUrls: ['./customers.component.scss']
})
export class CustomersComponent implements OnInit, AfterViewInit {
    displayedColumns: string[] = ['id', 'name', 'city', 'nip', 'zipCode', 'street', 'operations'];
    dataSource: MatTableDataSource<CustomerDTO> = new MatTableDataSource();
    total: number = 0;
    selectedCustomerId: number | null = null;
    private dialogRef: MatDialogRef<any> | null = null;

    filterValues: { [key: string]: string } = {
        name: '',
        city: '',
        nip: '',
        street: '',
        zipCode: ''
    };

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    @ViewChild('editDialog') editDialog!: TemplateRef<any>;

    editForm: FormGroup;
    addForm: FormGroup;


    constructor(
        private fb: FormBuilder,
        private dialog: MatDialog,
        private appService: AppService
    ) {
        this.editForm = this.fb.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            nip: ['', Validators.required],
            zipCode: ['', Validators.required],
            street: ['', Validators.required]
        });

        this.addForm = this.fb.group({
            name: ['', Validators.required],
            city: ['', Validators.required],
            nip: ['', Validators.required],
            zipCode: [''],
            street: ['']
        });
    }

    ngOnInit(): void {
        this.loadCustomers();
    }

    ngAfterViewInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    loadCustomers(orderBy: string = 'id', offset: number = 0, limit: number = 20): void {
        this.appService.findCustomers(
            undefined,
            this.filterValues['city'] || undefined,
            this.filterValues['name'] || undefined,
            this.filterValues['nip'] || undefined,
            this.filterValues['zipCode'] || undefined,
            orderBy,
            offset,
            limit
        ).subscribe(response => {
            this.dataSource.data = response.elements;
            this.total = response.total;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
            console.log(this.dataSource);
        }, error => {
            console.error('Error fetching data', error);
        });
    }

    applySortChange(sortState: Sort): void {
        if (sortState.active === 'id') {
            const orderBy = sortState.direction === 'asc' ? sortState.active : `-${sortState.active}`;
            this.loadCustomers(orderBy);
        }
    }

    applyFilter(column: string, event: Event): void {
        const input = event.target as HTMLInputElement;
        this.filterValues[column] = input.value.trim();

        if (this.paginator) {
            this.paginator.pageIndex = 0;
        }

        this.loadCustomers(this.sort?.active || 'id', this.paginator?.pageIndex || 0, this.paginator?.pageSize || 20);
    }

    deleteCustomer(id: number): void {
        this.appService.deleteCustomer(id).subscribe(() => {
            this.loadCustomers();
        }, error => {
            console.error('Error deleting customer', error);
        });
    }
    openEditDialog(customer: CustomerDTO): void {
        this.selectedCustomerId = customer.id;
        this.editForm.patchValue(customer);

        this.dialogRef = this.dialog.open(this.editDialog, {
            width: '400px',
            data: customer
        });

        this.dialogRef.afterClosed().subscribe(() => {
            this.selectedCustomerId = null;
        });

    }
    saveEdit(): void {
        if (this.editForm.valid) {
            const customerData: CustomerDTO = this.editForm.value;

            if (this.selectedCustomerId !== null) {
                this.appService.updateCustomer(this.selectedCustomerId, customerData).subscribe(() => {
                    this.loadCustomers();
                    if (this.dialogRef) {
                        this.dialogRef.close();
                    }
                }, error => {
                    console.error('Error updating customer', error);
                });
            } else {
                this.appService.addCustomer(customerData).subscribe(() => {
                    this.loadCustomers();
                    if (this.dialogRef) {
                        this.dialogRef.close();
                    }
                }, error => {
                    console.error('Error adding customer', error);
                });
            }
        }
    }

    openAddDialog(): void {
        this.addForm.reset();
        this.dialogRef = this.dialog.open(this.editDialog, {
            width: '400px',
            data: {}
        });

        this.dialogRef.afterClosed().subscribe(result => {
            if (this.addForm.valid) {
                this.addCustomer(this.addForm.value);
            }
        });
    }

    addCustomer(newCustomerData: CustomerDTO): void {
        this.appService.addCustomer(newCustomerData).subscribe(() => {
            this.loadCustomers();
            if (this.dialogRef) {
                this.dialogRef.close();
            }
        }, error => {
            console.error('Error adding customer', error);
        });
    }
}