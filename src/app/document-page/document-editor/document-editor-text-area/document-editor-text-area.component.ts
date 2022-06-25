import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { DocumentEditorService } from "../document-editor.service";
import { fastDiff } from "./document-editor-text-area.fast-diff";
import { Subscription } from 'rxjs';

@Component({
    selector: "app-document-editor-text-area",
    templateUrl: "document-editor-text-area.component.html",
    styleUrls: ["document-editor-text-area.component.css"]
})
export class DocumentEditorTextAreaComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor(private _docEditService: DocumentEditorService) { }

    lastChange: number = 0;
    prevState: string = ``;

    private incomingDiffSubscription!: Subscription;

    ngOnInit(): void {

        // First we asynchronously initialize the websocket on which we will be listening (hard-coded to 3001 for now)
        this._docEditService.initIncomingDataDiffListenerWebSocket("3001")

            // And when the websocket is ready...
            .subscribe((ws: WebSocket) => {

                // Asynchronously setup the subscription which will update our document
                this.incomingDiffSubscription = this._docEditService.createIncomingDataDiffListener(ws)

                    // Which is required to use the dataDiff received via the websocket to update the local textarea
                    .subscribe((dataDiff: MessageEvent) => {

                        let textarea = document.getElementById("textarea");
                        console.log("Server also sent: ") // TODO: Actual parsing into textarea... Just logging it for now
                        // console.log(JSON.parse(dataDiff))
                        console.log(dataDiff.data)

                    });

            });

    }

    ngOnDestroy(): void {

        this.incomingDiffSubscription.unsubscribe();

    }

    ngAfterViewInit(): void {

        let textarea = document.getElementById("textarea");
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