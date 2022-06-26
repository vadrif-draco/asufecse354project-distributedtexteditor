import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DocumentPageMainComponent } from './document-page/document-page-main/document-page-main.component';
import { DashboardRoutingGuard } from './dashboard/dashboard-routing.guard';
import { v4 as uuid } from 'uuid';

const routes: Routes = [
    // Should add guard to decide whether to redirect to dashboard or login/signup
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: 'dashboard', component: DashboardMainComponent },
    { path: 'create',redirectTo: ('edit/'+ uuid())},
    { path: 'edit/:uuid', component: DocumentPageMainComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
