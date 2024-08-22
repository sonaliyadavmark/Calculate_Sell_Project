import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  Apiurl = 'http://localhost:3000/Sell';

  constructor(private data:HttpClient) { }

  getSelldata() {
    return this.data.get(this.Apiurl);
  }

  CreateSelldata(res: any) {
    return this.data.post(this.Apiurl, res);
  }
}
