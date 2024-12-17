import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { AppService } from '../../app.service';
import { InvoiceDTO } from '../../app.model';

@Component({
    selector: 'app-invoices',
    templateUrl: './invoices.component.html',
    styleUrls: ['./invoices.component.scss']
})
export class InvoicesComponent implements OnInit, OnDestroy {
    displayedColumns: string[] = ['id', 'invoiceNumber', 'dueDate', 'grossPrice', 'paymentDate', 'paymentStatus'];
    invoices: InvoiceDTO[] = [];
    private socket: WebSocket | undefined;
    private subscription: Subscription | undefined;

    constructor(private appService: AppService) { }

    ngOnInit(): void {
        this.loadInvoices();
        this.setupWebSocket();
    }

    ngOnDestroy(): void {
        if (this.socket) {
            this.socket.close();
        }
    }
    loadInvoices(): void {
        this.subscription = this.appService.getListInvoices().subscribe({
            next: (data) => {
                this.invoices = data;
            },
            error: (error) => {
                console.error('Error getting invoices', error);
            }
        });
    }

    setupWebSocket(): void {
        this.socket = new WebSocket('ws://localhost:8080/ws/payments');

        this.socket.onmessage = (event) => {
            console.log('Message WebSocket:', event.data);
            this.showNotification(event.data);
            this.loadInvoices();
        };
        this.socket.onopen = () => console.log('WebSocket open');
        this.socket.onclose = () => console.log('WebSocket close');
    }

    showNotification(message: string): void {
        alert(message);
    }
}
