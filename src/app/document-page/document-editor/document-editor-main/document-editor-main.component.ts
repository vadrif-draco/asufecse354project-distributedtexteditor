import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-document-editor-main',
    templateUrl: 'document-editor-main.component.html',
    styleUrls: ['document-editor-main.component.css']
})
export class DocumentEditorMainComponent implements OnInit {

    @Input() uuid: string = ''
    constructor() { }

    ngOnInit(): void {
    }

    hidden: boolean = false;
    hide() {
        this.hidden = !this.hidden;
    }

}
