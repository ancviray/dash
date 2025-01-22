import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend } from 'chart.js';

// Register the components explicitly
ChartJS.register(CategoryScale, LinearScale, BarElement, BarController, Title, Tooltip, Legend);

@Component({
  selector: 'app-data-report',
  standalone: false,
  templateUrl: './data-report.component.html',
  styleUrls: ['./data-report.component.css']
})
export class DataReportComponent implements OnInit {
  illnesses = [
    { name: 'Flu', count: 50 },
    { name: 'Cold', count: 30 },
    { name: 'Cough', count: 20 },
  ];

  // Define colors for background and borders
  backgroundColors: string[] = ['#4caf50', '#ff9800', '#2196f3'];
  borderColors: string[] = ['#388e3c', '#f57c00', '#1976d2'];

  constructor() { }

  ngOnInit(): void {
    this.initializeBarChart();
  }

  // Function to initialize the bar chart
  initializeBarChart(): void {
    const ctxBar = document.getElementById('barChart') as HTMLCanvasElement;

    if (!ctxBar) {
      console.error("Canvas element not found!");
      return;
    }

    new Chart(ctxBar, {
      type: 'bar', // Type of chart
      data: {
        labels: this.illnesses.map(illness => illness.name), // Dynamic labels from illnesses array
        datasets: [{
          label: 'Number of Cases', // Label for the entire dataset (for legend)
          data: this.illnesses.map(illness => illness.count), // Data from illnesses array
          backgroundColor: this.illnesses.map((_, index) => this.getColor(index)), // Color for each bar
          borderColor: this.illnesses.map((_, index) => this.getBorderColor(index)), // Border color for each bar
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top',
            labels: {
              // Customize the legend to show illness names
              generateLabels: (chart) => {
                const datasets = chart.data.datasets;
                return datasets[0].data.map((_, index) => {
                  return {
                    text: this.illnesses[index].name, // Illness name as legend label
                    fillStyle: this.backgroundColors[index], // Corresponding color
                    strokeStyle: this.borderColors[index], // Border color
                    lineWidth: 1
                  };
                });
              }
            }
          }
        }
      }
    });
  }

  // Helper function to generate background color for each bar
  getColor(index: number): string {
    // Safe check to avoid undefined errors
    return this.backgroundColors[index % this.backgroundColors.length] || '#000'; // Fallback to black if undefined
  }

  // Helper function to generate border color for each bar
  getBorderColor(index: number): string {
    // Safe check to avoid undefined errors
    return this.borderColors[index % this.borderColors.length] || '#000'; // Fallback to black if undefined
  }
}
