import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { LayoutHomePageComponent } from './pages/layout-home-page/layout-home-page.component';


@NgModule({
  declarations: [
  
    HomePageComponent,
       LayoutHomePageComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
