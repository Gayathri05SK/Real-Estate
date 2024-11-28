import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchSiteComponent } from './components/search-site/search-site.component';
import { AddSiteComponent } from './components/add-site/add-site.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { HomeComponent } from './components/home/home.component';
import { ViewsiteComponent } from './viewsite/viewsite.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SearchSiteComponent,
    AddSiteComponent,
    AboutUsComponent,
    HomeComponent,
    ViewsiteComponent,
    LoginAdminComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, // FormsModule is already included
    HttpClientModule, // Add HttpClientModule here
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
