import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { DetailsComponent } from './pages/details/details.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/:symbol', component: DetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent, HomeComponent, AssetsComponent, DetailsComponent],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
