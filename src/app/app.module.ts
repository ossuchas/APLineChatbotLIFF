import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule  } from '@angular/forms';


import {
  MatTableModule,
  MatIconModule,
  MatButtonModule,
  MatSortModule,
  MatDialogModule,
  MatSnackBarModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatInputModule,
  MatCardModule,
  MatPaginatorModule,
  MatRadioModule,
  MatSelectModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule
} from '@angular/material';
import { LeadlagByprojectComponent } from './leadlag-byproject/leadlag-byproject.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LlByprojectComponent } from './ll-byproject/ll-byproject.component';
import { LeadlagByroleprojectComponent } from './leadlag-byroleproject/leadlag-byroleproject.component';
import { VendorregisterComponent } from './vendorregister/vendorregister.component';
import { ApregisterComponent } from './apregister/apregister.component';
import { HelpdeskdetailComponent } from './helpdeskdetail/helpdeskdetail.component';
import { HelpdeskinquiryComponent } from './helpdeskinquiry/helpdeskinquiry.component';


@NgModule({
  declarations: [
    AppComponent,
    LeadlagByprojectComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LlByprojectComponent,
    LeadlagByroleprojectComponent,
    VendorregisterComponent,
    ApregisterComponent,
    HelpdeskdetailComponent,
    HelpdeskinquiryComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatSortModule,
    MatDialogModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatCardModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatProgressSpinnerModule,
    MatAutocompleteModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
