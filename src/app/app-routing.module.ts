import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';


const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true }),
    // RouterModule.forRoot([
    //   { path: '', component: AppComponent },
    // ])
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule { }
