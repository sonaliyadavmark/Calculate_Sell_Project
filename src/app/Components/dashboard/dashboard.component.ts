import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SalesService } from '../../Services/sales.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  constructor(private sellser: SalesService) {}
  Selldata: any;
  ngOnInit(): void {
    this.sellser.getSelldata().subscribe(
      (mydata) => {
        this.Selldata = mydata;
      },
      (err) => {
        console.log('Something gets Wrong');
      }
    );
  }
}
