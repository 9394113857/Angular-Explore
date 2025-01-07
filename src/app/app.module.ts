import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // custom error resolved after this import
import { ReactiveFormsModule } from '@angular/forms'; // custom error resolved after this import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FlaskComponent } from './flask/flask.component';
import { DjangoComponent } from './django/django.component';
import { ApiComponent } from './api/api.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FlaskService } from './flask.service';
import { TemplateDrivenComponent } from './template-driven/template-driven.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';
import { FormValidationComponent } from './form-validation/form-validation.component';

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
    FormValidationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule, //This will resolve the ngModel binding error.
    ReactiveFormsModule, // ReactiveFormsModule from @angular/forms to enable reactive form functionality

  ],
  providers: [FlaskService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
