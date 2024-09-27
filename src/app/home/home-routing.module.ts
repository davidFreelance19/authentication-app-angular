import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LayoutHomePageComponent } from './pages/layout-home-page/layout-home-page.component';


const routes: Routes = [
  {
    path: '',
    component: LayoutHomePageComponent,
    children: [
      {
        path: 'home',
        component: HomePageComponent,
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
]
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule { }
