// Angular Components
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

// My Components
import { DashboardMainComponent } from './dashboard/dashboard-main/dashboard-main.component';
import { DocumentPreviewComponent } from './dashboard/document-preview/document-preview.component';
import { HalfHeightContainerComponent } from './dashboard/half-height-container/half-height-container.component';
import { LeftNavbarComponent } from './dashboard/left-navbar/left-navbar.component';
import { DocumentPageMainComponent } from './document-page/document-page-main/document-page-main.component';
import { DocumentEditorMainComponent } from './document-page/document-editor/document-editor-main/document-editor-main.component';
import { DocumentEditorToolbarComponent } from './document-page/document-editor/document-editor-toolbar/document-editor-toolbar.component';
import { DocumentEditorTextAreaComponent } from './document-page/document-editor/document-editor-text-area/document-editor-text-area.component';

// Angular Material Components
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
    declarations: [
        AppComponent,
        HalfHeightContainerComponent,
        LeftNavbarComponent,
        DashboardMainComponent,
        DocumentPreviewComponent,
        DocumentPageMainComponent,
        DocumentEditorMainComponent,
        DocumentEditorToolbarComponent,
        DocumentEditorTextAreaComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatGridListModule,
        MatCardModule,
        MatSidenavModule,
        MatToolbarModule,
        MatDividerModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatTooltipModule,
        MatFormFieldModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
