// src/app/app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SearchSiteComponent } from './components/search-site/search-site.component';
import { AddSiteComponent } from './components/add-site/add-site.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { ViewsiteComponent } from './viewsite/viewsite.component'; // Import the new component

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'search-site', component: SearchSiteComponent },
  { path: 'add-site', component: AddSiteComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'view-site', component: ViewsiteComponent }, // New route added
  { path: 'login-admin', component: LoginAdminComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }  // Wildcard route for 404
];




@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
