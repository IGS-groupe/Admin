import { Component } from '@angular/core';
import { ChartData } from 'chart.js';
import { ChartjsComponent } from '@coreui/angular-chartjs';
import {
  RowComponent,
  ColComponent,
  TextColorDirective,
  CardComponent,
  CardHeaderComponent,
  CardBodyComponent
} from '@coreui/angular';
import { DocsCalloutComponent } from '@docs-components/public-api';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
  standalone: true,
  imports: [
    RowComponent,
    ColComponent,
    DocsCalloutComponent,
    TextColorDirective,
    CardComponent,
    CardHeaderComponent,
    CardBodyComponent,
    ChartjsComponent
  ]
})
export class ChartsComponent {
  options = {
    maintainAspectRatio: false
  };

  // Example months (simulate parameters created each month)
  chartBarData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Paramètres ajoutés',
        backgroundColor: '#42a5f5',
        data: [5, 8, 12, 7, 9, 15, 10]
      }
    ]
  };

  // Line chart simulating average RDL value per month
  chartLineData: ChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Moyenne RDL',
        borderColor: '#66bb6a',
        backgroundColor: 'rgba(102,187,106,0.2)',
        data: [4.2, 3.8, 5.0, 4.6, 5.5, 4.1, 4.9]
      }
    ]
  };

  // Doughnut chart simulating unit distribution
  chartDoughnutData: ChartData = {
    labels: ['mg/L', 'g/L', 'ppm', 'µg/mL'],
    datasets: [
      {
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4bc0c0'],
        data: [15, 25, 10, 5]
      }
    ]
  };

  // Pie chart for availability status
  chartPieData: ChartData = {
    labels: ['Disponible', 'Indisponible'],
    datasets: [
      {
        backgroundColor: ['#4caf50', '#f44336'],
        data: [30, 10]
      }
    ]
  };

  // Polar chart showing parameter type coverage (fake types)
  chartPolarAreaData: ChartData = {
    labels: ['Métaux', 'Nitrates', 'Chlorures', 'Sulfates', 'pH'],
    datasets: [
      {
        backgroundColor: ['#2196f3', '#e91e63', '#ffc107', '#9c27b0', '#607d8b'],
        data: [12, 9, 7, 5, 10]
      }
    ]
  };

  // Radar chart comparing parameter growth (2 fake years)
  chartRadarData: ChartData = {
    labels: ['Jan', 'Mar', 'May', 'Jul', 'Sep', 'Nov'],
    datasets: [
      {
        label: '2023',
        borderColor: '#3f51b5',
        backgroundColor: 'rgba(63,81,181,0.2)',
        data: [4, 7, 5, 9, 6, 8]
      },
      {
        label: '2024',
        borderColor: '#ff9800',
        backgroundColor: 'rgba(255,152,0,0.2)',
        data: [6, 8, 6, 10, 9, 11]
      }
    ]
  };
}
