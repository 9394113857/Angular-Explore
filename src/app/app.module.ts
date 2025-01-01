import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms'; // custom error resolved after this import
import { FormsModule } from '@angular/forms'; // custom error resolved after this import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FlaskComponent } from './flask/flask.component';
import { DjangoComponent } from './django/django.component';
import { ApiComponent } from './api/api.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HttpClientModule } from '@angular/common/http';
import { FlaskService } from './flask.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    FlaskComponent,
    DjangoComponent,
    ApiComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, // ReactiveFormsModule from @angular/forms to enable reactive form functionality
    HttpClientModule,
    FormsModule, //This will resolve the ngModel binding error.

  ],
  providers: [FlaskService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
