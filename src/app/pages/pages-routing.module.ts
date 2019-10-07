import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './errors/notFound.component';

const routes: Routes = [
  {
    path: '', component: PagesComponent,
    children: [
      {
        path: 'listing',
        loadChildren: () => import('./listing/listing.module').then(m => m.ListingModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('../auth/auth.module').then(m => m.AuthModule)
  },
  {path: '404', component: NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
