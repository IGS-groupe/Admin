import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

interface InvoiceItem {
  item: string;
  description: string;
  quantity: number;
  unitCost: number;
  total: number;
}

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [CommonModule], // Import CommonModule to use *ngFor and currency pipe
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  invoiceItems: InvoiceItem[] = []; // Initialize with correct type
  subtotal: number = 0; // Initialize subtotal
  discount: number = 0; // Initialize discount
  vat: number = 0; // Initialize vat
  total: number = 0; // Initialize total

  ngOnInit(): void {
    // Example initialization, replace with actual data
    this.invoiceItems = [
      {
        item: 'Sample Item 1',
        description: 'Description of sample item 1',
        quantity: 2,
        unitCost: 100,
        total: 200
      },
      {
        item: 'Sample Item 2',
        description: 'Description of sample item 2',
        quantity: 1,
        unitCost: 300,
        total: 300
      }
    ];
    this.calculateInvoice();
  }

  calculateInvoice(): void {
    this.subtotal = this.invoiceItems.reduce((acc, item) => acc + item.total, 0);
    this.discount = this.subtotal * 0.2; // 20% discount
    this.vat = (this.subtotal - this.discount) * 0.1; // 10% VAT
    this.total = this.subtotal - this.discount + this.vat;
  }

  proceedToPayment() {
    // Implement the payment logic or navigation here
    console.log('Proceeding to payment...');
  }
}
