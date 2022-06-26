import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-document-editor-main',
    templateUrl: 'document-editor-main.component.html',
    styleUrls: ['document-editor-main.component.css']
})
export class DocumentEditorMainComponent implements OnInit {

    @Input() uuid: string = ''
    @Input() loaded: boolean = false
    @Input() incomingDocInit: string | null = null
    @Input() incomingDataDiff: any
    @Input() incomingDataFlag: boolean = false;
    
    @Input() incomingDocVersions!: any[]

    @Output() outgoingDataDiffRequest = new EventEmitter<any>();
    @Output() confirmDiffReceipt = new EventEmitter<any>();
    
    @Output() requestHistories = new EventEmitter<any>();

    constructor() { }

    ngOnInit(): void { }

    delegateDataDiffRequest(request: any) {

        this.outgoingDataDiffRequest.emit(request)

    }

    delegateDataDiffReceipt() {
        
        this.confirmDiffReceipt.emit()

    }

    delegateHistoryRequest() {

        this.requestHistories.emit()

    }

    hidden: boolean = false;
    hide() {
        this.hidden = !this.hidden;
    }

}
