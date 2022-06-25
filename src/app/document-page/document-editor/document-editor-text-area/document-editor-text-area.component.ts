import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Subscription } from 'rxjs';

import { ClientWebSocketService } from '../../../client-web-socket.service';
import { fastDiff, updateDocument } from "./document-editor-text-area.fast-diff";

@Component({
    selector: "app-document-editor-text-area",
    templateUrl: "document-editor-text-area.component.html",
    styleUrls: ["document-editor-text-area.component.css"]
})
export class DocumentEditorTextAreaComponent implements OnInit, OnDestroy, AfterViewInit {

    constructor(private _clientSock: ClientWebSocketService) { }

    ws!: WebSocket

    incomingDataChange: boolean = false;

    lastChange: number = 0;
    prevState: string = ``;
    POLLING_INTERVAL: number = 1;

    private incomingDiffSubscription!: Subscription;

    ngOnInit(): void {

        // First we asynchronously initialize the websocket on which we will be listening (hard-coded to 3001 for now)
        this._clientSock.initializeWebSocket("3000")

            // And when the websocket is ready...
            .subscribe((ws: WebSocket) => {

                this.ws = ws

                // Asynchronously setup the subscription which will update our document
                this.incomingDiffSubscription = this._clientSock.getWebSocketListener(ws)

                    // Which is required to use the dataDiff received via the websocket to update the local textarea
                    .subscribe((dataDiff: MessageEvent) => {

                        let textarea = document.getElementById("textarea")!;
                        
                        this.incomingDataChange = true
                        
                        // TODO: Actual parsing into textarea... Just logging it for now
                        // console.log(dataDiff.data)
                        // console.log(JSON.parse(dataDiff))
                        textarea.innerHTML = updateDocument(textarea.innerHTML, JSON.parse(dataDiff.data))

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
        setInterval(function () { that.checkForChanges(textarea!) }, this.POLLING_INTERVAL);

    }

    // This function triggers whenever an input event occurs to the text area
    // It is used to update the time
    trackTime() { this.lastChange = performance.now() }

    checkForChanges(textarea: HTMLElement): void {

        if (this.incomingDataChange) {

            this.incomingDataChange = false
            this.prevState = textarea.innerHTML
            return

        }

        // anti-spam strategy...

        // if change is too fast (within the polling interval), skip it
        if (Math.abs(this.lastChange - performance.now()) < this.POLLING_INTERVAL) { // skip skip

            console.log(this.lastChange)

        } else { // otherwise, if there is a difference, emit it

            if (this.prevState.localeCompare(textarea.innerHTML) != 0) {

                var diff = fastDiff(this.prevState, textarea.innerHTML)
                if (this.ws) this._clientSock.sendWebSocketData(this.ws, diff);
                this.prevState = textarea.innerHTML;

            }

        }

    }

}