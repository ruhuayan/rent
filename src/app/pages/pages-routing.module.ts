import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { NotFoundComponent } from './errors/notFound.component';

const routes: Routes = [
    {
        path: '', component: PagesComponent,
        children: [
            
        ]
    },
    
    {path: '404', component: NotFoundComponent}
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class PagesRoutingModule {}