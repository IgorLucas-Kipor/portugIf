import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PortugifComponent} from "./portugif/portugif.component";
import {FaqComponent} from "./faq/faq.component";
import {HomeComponent} from "./home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'portugif', component: PortugifComponent },
  { path: 'faq', component: FaqComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
