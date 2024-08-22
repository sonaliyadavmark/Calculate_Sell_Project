import { Component } from '@angular/core';
import { SalesService } from '../../Services/sales.service';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-createdata',
  standalone: true,
  imports: [FormsModule],

  templateUrl: './createdata.component.html',
  styleUrl: './createdata.component.css'
})
export class CreatedataComponent {
  selldata: any;
  newdata: any;
  maxDate?: string;
  constructor(private dataser: SalesService) {
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];
  }
  AddData(data: NgForm) {
    console.log(data.value);
    this.selldata = data.value;
    this.dataser.CreateSelldata(this.selldata).subscribe(
      (add) => {
        console.log(add);
        alert('Data Saved Successfully');
      },
      (err) => {
        alert('Something gets Wrong');
      }
    );
    this.dataser.getSelldata().subscribe((mydata) => {
      this.newdata = mydata;
    });
  }
}
