import { Component } from '@angular/core';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-data-report',
  standalone: false,
  
  templateUrl: './data-report.component.html',
  styleUrl: './data-report.component.css'
})
export class DataReportComponent {
  illnesses = [
    { name: 'Flu', count: 50 },
    { name: 'Cold', count: 30 },
    { name: 'Cough', count: 20 },
  ];

  ngOnInit() {
    this.initializeBarChart();
    this.initializePieChart();
  }

  initializeBarChart() {
    const ctxBar = document.getElementById('barChart') as HTMLCanvasElement;
    new Chart(ctxBar, {
      type: 'bar',
      data: {
        labels: this.illnesses.map(illness => illness.name),
        datasets: [{
          label: 'Number of Students',
          data: this.illnesses.map(illness => illness.count),
          backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
          borderColor: ['#388e3c', '#f57c00', '#1976d2'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  initializePieChart() {
    const ctxPie = document.getElementById('pieChart') as HTMLCanvasElement;
    new Chart(ctxPie, {
      type: 'pie',
      data: {
        labels: this.illnesses.map(illness => illness.name),
        datasets: [{
          data: this.illnesses.map(illness => illness.count),
          backgroundColor: ['#4caf50', '#ff9800', '#2196f3'],
          hoverBackgroundColor: ['#66bb6a', '#ffa726', '#42a5f5']
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: true, position: 'top' }
        }
      }
    });
  }
}