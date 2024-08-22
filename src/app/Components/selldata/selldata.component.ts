import { Component, OnInit } from '@angular/core';
import { SalesService } from '../../Services/sales.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-selldata',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './selldata.component.html',
  styleUrl: './selldata.component.css'
})
export class SelldataComponent implements OnInit{
  Selldata:any
  maxDate?: string;
  
  
  filteredSales: any[] = [];
    startDate: string = '';
    endDate: string = '';
    monthYear:string='YYYY-MM';
  constructor(private ser:SalesService){
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }
  ngOnInit(): void {
    this.ser.getSelldata().subscribe((data) => {
      this.Selldata = data;
    },(err) => {
      console.log('Something gets Wrong');
    });
    
  }

  filterAndGroupSales() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    const groupedSales = this.Selldata
      .filter((item:any) => {
        const saleDate = new Date(item.selldate);
        return saleDate >= start && saleDate <= end;
      })
      .reduce((acc:any, item:any) => {
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
      }, {});

    this.filteredSales = groupedSales;
  }

}
