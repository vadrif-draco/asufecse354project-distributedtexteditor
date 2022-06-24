import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
    selector: 'app-document-editor-toolbar',
    templateUrl: 'document-editor-toolbar.component.html',
    styleUrls: ['document-editor-toolbar.component.css']
})
export class DocumentEditorToolbarComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {
    }

    cmd(prompt: string) {
        switch (prompt) {
            case 'ul':
                
                break;
        
            default:
                break;
        }
    }

}
