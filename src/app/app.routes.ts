import { Routes } from '@angular/router';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { CreatedataComponent } from './Components/createdata/createdata.component';
import { SelldataComponent } from './Components/selldata/selldata.component';
import { TotalSellComponent } from './Components/total-sell/total-sell.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
    
        children: [
          {
            path: 'createdata',
            component: CreatedataComponent,
          },
    
          
          {
            path:"selldata",
            component:SelldataComponent,
          },
          // {
          //   path:"graph",
          //   component:GraphComponent
          // },
          {
            path:"total_sell",
            component:TotalSellComponent
          }
        ]
    }
];
