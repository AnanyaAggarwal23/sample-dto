import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymentEffects } from './state/payment.effects';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/payment.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PaymentService } from './state/payment.service';
import {
  HttpClient,
  HttpClientModule,
  HttpHandler,
} from '@angular/common/http';
import { DataTableComponent } from './components/data-table/data-table.component';
import { DataFormComponent } from './components/data-form/data-form.component';

@NgModule({
  declarations: [AppComponent, DashboardComponent, DataTableComponent, DataFormComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    StoreModule.forRoot({ payment: reducer }),
    EffectsModule.forRoot([PaymentEffects]),
  ],
  providers: [PaymentService],
  bootstrap: [AppComponent],
})
export class AppModule {}
