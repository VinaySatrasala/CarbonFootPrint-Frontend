import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HomeComponent } from './home/home.component';
import { FactorsComponent } from './factors/factors.component';
import { WaterComponent } from './water/water.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { WasteComponent } from './waste/waste.component';
import { FuelsComponent } from './fuels/fuels.component';
import { TransportComponent } from './transport/transport.component';
import { DietComponent } from './diet/diet.component';
import { RadialBarChartComponent } from './radial-bar-chart/radial-bar-chart.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './auth.guard';
import { HistoryComponent } from './history/history.component';
import { InsightsComponent } from './insights/insights.component';

const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  { path: '', component: HomeComponent },
  { path: 'factors', component: FactorsComponent
    // , canActivate: [authGuard] 
  },
  { path: 'water', component: WaterComponent, canActivate: [authGuard] },
  {
    path: 'electricity',
    component: ElectricityComponent,
    canActivate: [authGuard],
  },
  { path: 'waste', component: WasteComponent, canActivate: [authGuard] },
  { path: 'fuels', component: FuelsComponent, canActivate: [authGuard] },
  {
    path: 'transport',
    component: TransportComponent,
    canActivate: [authGuard],
  },
  { path: 'diet', component: DietComponent, canActivate: [authGuard] },
  {
    path: 'dashboard',
    component: DashboardComponent
    // canActivate: [authGuard],
  },{
    path:'insights',
    component:InsightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
