import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AssetsComponent } from './pages/assets/assets.component';
import { DetailsComponent } from './pages/details/details.component';
import { FollowStocksComponent } from './components/follow-stocks/follow-stocks.component';
import { TransactionGridComponent } from './components/transaction-grid/transaction-grid.component';
import { AssetsGridComponent } from './components/assets-grid/assets-grid.component';
import { StockDetailsComponent } from './components/stock-details/stock-details.component';
import { StockGraphComponent } from './components/stock-graph/stock-graph.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/TokenInterceptor';
import { FollowStocksPopupComponent } from './components/follow-stocks-popup/follow-stocks-popup.component';

@NgModule({
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  declarations: [
    AppComponent,
    HomeComponent,
    AssetsComponent,
    DetailsComponent,
    FollowStocksComponent,
    TransactionGridComponent,
    AssetsGridComponent,
    StockDetailsComponent,
    StockGraphComponent,
    FollowStocksPopupComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
