import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter } from "@angular/core";
import { fastDiff, updateDocument } from "./document-editor-text-area.fast-diff";

@Component({
    selector: "app-document-editor-text-area",
    templateUrl: "document-editor-text-area.component.html",
    styleUrls: ["document-editor-text-area.component.css"]
})
export class DocumentEditorTextAreaComponent implements OnInit, AfterViewInit {

    constructor() { }

    @Input() uuid: string = ''
    @Input() loaded: boolean = false
    @Input() incomingDocInit: string | null = null
    @Input() incomingDataDiff: any
    @Input() incomingDataFlag: boolean = false;
    @Output() confirmDiffReceipt = new EventEmitter<any>();
    @Output() outgoingDataDiffRequest = new EventEmitter<any>();

    lastChange: number = 0;
    prevState: string = ``;
    POLLING_INTERVAL: number = 1;

    ngOnInit(): void { }

    ngAfterViewInit(): void {

        while (!this.loaded) { }
        let textarea = document.getElementById("textarea")!
        if (this.incomingDocInit) textarea.innerHTML = this.incomingDocInit
        this.prevState = textarea.innerHTML
        textarea!.focus()
        let that = this

        setInterval(function () { that.checkForChanges(textarea!) }, this.POLLING_INTERVAL);

    }

    // This function triggers whenever an input event occurs to the text area
    // It is used to update the time
    trackTime() { this.lastChange = performance.now() }

    checkForChanges(textarea: HTMLElement): void {

        if (this.incomingDataFlag) {

            console.log(this.incomingDataDiff)
            textarea.innerHTML = updateDocument(textarea.innerHTML, this.incomingDataDiff)
            this.prevState = textarea.innerHTML
            // this.incomingDataFlag = false
            this.confirmDiffReceipt.emit()
            // return

        }

        // anti-spam strategy...

        // if change is too fast (within the polling interval), skip it
        if (Math.abs(this.lastChange - performance.now()) < this.POLLING_INTERVAL) { // skip skip

            console.log(this.lastChange)

        } else { // otherwise, if there is a difference, emit it

            if (this.prevState.localeCompare(textarea.innerHTML) != 0) {

                var diff = fastDiff(this.prevState, textarea.innerHTML)
                this.outgoingDataDiffRequest.emit(diff)
                this.prevState = textarea.innerHTML;

            }

        }

    }

}