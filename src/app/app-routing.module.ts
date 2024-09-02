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

const routes: Routes = [
  {path:"signup",component:SignupComponent},
  {path:"signin",component:SigninComponent},
  {path:"",component:HomeComponent},
  {path:"factors",component:FactorsComponent},
  {path:"water",component:WaterComponent},
  {path:"electricity",component:ElectricityComponent},
  {path:"waste",component:WasteComponent},
  {path:"fuels",component:FuelsComponent},
  {path:"transport",component:TransportComponent},
  {path:"diet",component:DietComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
