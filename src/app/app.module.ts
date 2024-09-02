import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { SigninComponent } from './signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home/home.component';
import { FactorsComponent } from './factors/factors.component';
import { ElectricityComponent } from './electricity/electricity.component';
import { WaterComponent } from './water/water.component';
import { WasteComponent } from './waste/waste.component';
import { TransportComponent } from './transport/transport.component';
import { DietComponent } from './diet/diet.component';
import { FuelsComponent } from './fuels/fuels.component';
import { RadialBarChartComponent } from './radial-bar-chart/radial-bar-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    FactorsComponent,
    ElectricityComponent,
    WaterComponent,
    WasteComponent,
    TransportComponent,
    DietComponent,
    FuelsComponent,
    RadialBarChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
