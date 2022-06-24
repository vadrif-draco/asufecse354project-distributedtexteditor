import { Component, OnInit, Input } from '@angular/core';
import { Preview } from './document-preview.model';

@Component({
    selector: 'app-document-preview',
    templateUrl: 'document-preview.component.html',
    styleUrls: ['document-preview.component.css']
})
export class DocumentPreviewComponent implements OnInit {

    @Input() doc: Preview = new Preview('', '', '');
    constructor() { }

    ngOnInit(): void {
    }

}
