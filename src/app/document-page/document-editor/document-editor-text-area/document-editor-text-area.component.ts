import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DocumentEditorService } from "../document-editor.service";
import { fastDiff } from "./document-editor-text-area.fast-diff";

@Component({
    selector: "app-document-editor-text-area",
    templateUrl: "document-editor-text-area.component.html",
    styleUrls: ["document-editor-text-area.component.css"]
})
export class DocumentEditorTextAreaComponent implements OnInit, AfterViewInit {

    constructor(private _docEditService: DocumentEditorService) { }

    baseHTML: string = `
        <style>
        div #text, div div { padding-bottom: 16px; }
            div br { padding-bottom: 0px; }
            .inuse { background-color: #f6f6ff; border-bottom: 1px solid #d8d8ff; } // should be randomunique per user
        </style>
    `.trim();

    stupidHTML: string = `
        <div><span><br></span></div>
    `.trim();

    lastChange: number = 0;
    prevState: string = this.baseHTML + this.stupidHTML;

    ngOnInit(): void { }

    ngAfterViewInit(): void {

        let textarea = document.getElementById("textarea");
        textarea!.innerHTML = this.baseHTML + this.stupidHTML;
        textarea!.focus();
        let that = this;
        setInterval(function () { that.checkForChanges(textarea!) }, 1000);

    }

    // This function triggers whenever an input event occurs to the text area
    // It is used to update the time
    trackTime() { this.lastChange = performance.now() }

    checkForChanges(textarea: HTMLElement): void {

        // anti-spam strategy...

        // if change is too fast (within 100ms), skip it
        if (Math.abs(this.lastChange - performance.now()) < 100) { // skip skip

            console.log(this.lastChange)

        } else { // otherwise, if there is a difference, emit it

            if (this.prevState.localeCompare(textarea.innerHTML) != 0) {

                var diff = fastDiff(this.prevState, textarea.innerHTML)
                this._docEditService.outgoingUpdate(diff);
                this.prevState = textarea.innerHTML;

            }

        }

    }

}