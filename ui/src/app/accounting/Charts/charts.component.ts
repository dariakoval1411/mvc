import { Component, OnInit } from "@angular/core";
import { Chart, registerables } from 'chart.js';
import { AppService } from "../../app.service";

Chart.register(...registerables);

@Component({
    selector: 'app-charts',
    templateUrl: './charts.component.html',
    styleUrls: ['./charts.component.scss']
})
export class ChartsComponent implements OnInit {
    salesChart: any;
    customerSalesChart: any;

    constructor(private appService: AppService) {}

    ngOnInit() {
        this.initSalesByMonthChart();
        this.initSalesByCustomerChart();
    }

    private initSalesByMonthChart() {
        this.appService.getSalesByMonth().subscribe(salesData => {
            const labels = Object.keys(salesData).map(month => `Month ${month}`);
            const data = Object.values(salesData).map(value => parseFloat(value.toString()));

            this.salesChart = new Chart('salesChart', {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Sales by Month',
                        data: data,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    }

    private initSalesByCustomerChart() {
        this.appService.getTotalSalesByCustomer().subscribe(customerSalesData => {
            const labels = Object.keys(customerSalesData);
            const data = Object.values(customerSalesData).map(value => parseFloat(value.toString()));

            this.customerSalesChart = new Chart('customerSalesChart', {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: [{
                        label: 'Total Sales by Customer',
                        data: data,
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });
    }
}
