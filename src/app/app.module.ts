import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import for template-driven and reactive forms
import { HttpClientModule } from '@angular/common/http'; // Import for HTTP services

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FlaskComponent } from './flask/flask.component';
import { DjangoComponent } from './django/django.component';
import { ApiComponent } from './api/api.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FormValidationComponent } from './form-validation/form-validation.component';
import { FlaskService } from './flask.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlaskComponent,
    DjangoComponent,
    ApiComponent,
    NotFoundComponent,
    TemplateDrivenComponent,
    ReactiveFormComponent,
    FormValidationComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, // Template-driven forms support
    ReactiveFormsModule, // Reactive forms support
  ],
  providers: [FlaskService],
  bootstrap: [AppComponent],
})
export class AppModule {}
