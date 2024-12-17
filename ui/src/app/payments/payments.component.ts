import { Component, OnInit } from '@angular/core';
import { PaymentsDTO } from '../app.model';
import { AppService } from '../app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-payments',
  templateUrl: './payments.component.html',
  styleUrl: './payments.component.css'
})
export class PaymentsComponent implements OnInit{

  payments : PaymentsDTO[] = [];
  socket!: WebSocket;

  constructor(private appService: AppService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.loadPayments();
    this.socket = new WebSocket('ws://localhost:8080/ws/payments')

  }
  loadPayments(): void {
    this.appService.getListPyaments().subscribe(payments => {
      this.payments = payments;
      console.log('Payments loaded:', this.payments);
    },
    error => {
      console.error('Error loading payments:', error);
    });
  }


}
