import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Custom imports for generated componenets:-
import { HomeComponent } from './home/home.component';
import { FlaskComponent } from './flask/flask.component';
import { DjangoComponent } from './django/django.component';
import { ApiComponent } from './api/api.component';
import { NotFoundComponent } from './not-found/not-found.component';

// Custom routes defined:-
const routes: Routes = [
  {
    path:'',component:HomeComponent
  },
  {
    path:'flask',component:FlaskComponent
  },
  {
    path:'django',component:DjangoComponent
  },
  {
    path:'api',component:ApiComponent
  },
// Not-Found component defined:-
  {
    path:'**',component:NotFoundComponent
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
