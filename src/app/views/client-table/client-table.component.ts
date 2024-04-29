import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.scss'
})
export class ClientTableComponent {
  clients = [
    { id: 1, name: 'John Doe', email: 'john.doe@company.com', company: 'Doe Industries', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane.smith@webtech.com', company: 'WebTech', phone: '987-654-3210' },
    // Add more clients as needed
  ];
}
