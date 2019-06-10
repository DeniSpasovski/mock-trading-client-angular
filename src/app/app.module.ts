import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { DetailsComponent } from './pages/details/details.component';
import { FollowStocksComponent } from './components/follow-stocks/follow-stocks.component';
import { TransactionGridComponent } from './components/transaction-grid/transaction-grid.component';
import { AssetsGridComponent } from './components/assets-grid/assets-grid.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockGraphComponent } from './components/stock-graph/stock-graph.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'assets', component: AssetsComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'details/:symbol', component: DetailsComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssetsComponent,
    DetailsComponent,
    FollowStocksComponent,
    TransactionGridComponent,
    AssetsGridComponent,
    StockDetailsComponent,
    StockGraphComponent
  ],
  imports: [BrowserModule, RouterModule.forRoot(routes)],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
