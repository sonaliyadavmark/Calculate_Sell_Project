import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SalesService } from '../../Services/sales.service';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
type GroupedSales = {
  [city: string]: {
    [monthYear: string]: number;
  };
};
@Component({
  selector: 'app-total-sell',
  standalone: true,
  imports: [CommonModule, FormsModule, BaseChartDirective],
  templateUrl: './total-sell.component.html',
  styleUrl: './total-sell.component.css'
})


export class TotalSellComponent implements OnInit {
Selldata:any
  maxDate?: string;

  filteredSales: GroupedSales = {}; 
  startDate: string = '';
  endDate: string = '';
  monthYear: string = 'YYYY-MM';

  public barChartType: ChartType = 'bar';
  public barChartLegend = true;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        beginAtZero: true
      }
    }
  };
  public barChartData: ChartConfiguration['data'] = {
    labels: [],
    datasets: []
  };
  constructor(private ser: SalesService) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }

  ngOnInit(): void {
    this.ser.getSelldata().subscribe((data) => {
      this.Selldata = data;
    });
  }

  filterAndGroupSales() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const groupedSales = this.Selldata
      .filter((item: any) => {
        const saleDate = new Date(item.selldate);
        return saleDate >= start && saleDate <= end;
      })
      .reduce((acc: any, item: any) => {
        const date = new Date(item.selldate);
        this.monthYear = `${date.getFullYear()}-${('0' + (date.getMonth() + 1)).slice(-2)}`;
        const city = item.city;

        if (!acc[city]) {
          acc[city] = {};
        }

        if (!acc[city][this.monthYear]) {
          acc[city][this.monthYear] = 0;
        }

        acc[city][this.monthYear] += parseInt(item.amount);
        return acc;
      }, {} as GroupedSales);
      console.log('Grouped Sales Data:', groupedSales);

    this.filteredSales = groupedSales;
    this.updateChart();
  }

  updateChart() {
    // Get all unique month-year labels
    const labels = Array.from(new Set(
      Object.values(this.filteredSales)
        .flatMap(cityData => Object.keys(cityData))
    )).sort();
  
    // Prepare datasets for each city
    const datasets = Object.keys(this.filteredSales).map(city => {
      return {
        label: city,
        data: labels.map(month => this.filteredSales[city][month] || 0),
      };
    });
  
    console.log('Chart Labels:', labels);
    console.log('Chart Datasets:', datasets);
  
    this.barChartData.labels = labels;
    this.barChartData.datasets = datasets;
  }
  


}
