import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'libros',
    loadChildren: () => import('src/app/pages/libros/libros.module').then(m => m.LibrosModule),
  },
];


@NgModule({
  declarations: [
    PagesComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialModule,
    SharedModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class PagesModule { }
