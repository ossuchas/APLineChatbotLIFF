import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadlagByprojectComponent } from './leadlag-byproject/leadlag-byproject.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RegisterComponent } from './register/register.component';
import { LlByprojectComponent } from './ll-byproject/ll-byproject.component';
import { LeadlagByroleprojectComponent } from './leadlag-byroleproject/leadlag-byroleproject.component';

const routes: Routes = [
  { path: 'llbyproject', component: LeadlagByprojectComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'llbyproject1', component: LlByprojectComponent},
  { path: 'llbyroleproject', component: LeadlagByroleprojectComponent},
  { path: '', redirectTo: '/llbyproject', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
