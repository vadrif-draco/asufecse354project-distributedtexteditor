import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'
import { Subscription } from 'rxjs';

import { ClientWebSocketService } from '../../client-web-socket.service';

@Component({
    selector: 'app-document-page-main',
    templateUrl: 'document-page-main.component.html',
    styleUrls: ['document-page-main.component.css']
})
export class DocumentPageMainComponent implements OnInit {

    public loaded: boolean = false

    uuid: string = ''

    ws!: WebSocket
    incomingDocInit: string | null = null
    incomingDataDiff: any
    incomingDataFlag: boolean = false;
    private incomingDiffSubscription!: Subscription;

    constructor(private _route: ActivatedRoute, private _clientSock: ClientWebSocketService) { }

    ngOnInit(): void {

        this._route.paramMap
            .subscribe((parameters: ParamMap) => {

                this.uuid = parameters.get('uuid')!

            })

        // First we asynchronously initialize the websocket on which we will be listening (hard-coded to 3001 for now)

        this._clientSock.initializeWebSocket("3000")

            // And when the websocket is ready...
            .subscribe((ws: WebSocket) => {

                // Store it
                this.ws = ws

                // Request document load using given uuid
                this._clientSock.sendWebSocketData(this.ws, { type: 'load', id: this.uuid });

                // Asynchronously setup the subscription which will update our document
                this.incomingDiffSubscription = this._clientSock.getWebSocketListener(ws)

                    // Which is required to use the dataDiff received via the websocket to update the local textarea
                    .subscribe((msg: MessageEvent) => {

                        var res = JSON.parse(msg.data)

                        if (res.type == 'change') {

                            this.incomingDataFlag = true
                            this.incomingDataDiff = res.diff // textarea should call updateDocument with this

                        }

                        else if (res.type == 'load') {

                            // this.incomingDataFlag = true;
                            this.incomingDocInit = res.doc; // textarea should directly update innerHTML with this
                            this.loaded = true; // indicate that document loading is finished

                        }

                    });

            });

    }

    ngOnDestroy(): void {

        this.incomingDiffSubscription.unsubscribe();

    }

    sendLocalDiff(diff: any) {

        if (this.ws) {
            this._clientSock.sendWebSocketData(this.ws, { type: 'change', id: this.uuid, diff: diff });
            console.log("Sent:")
            console.log(diff)
        }

    }

    confirmDiffReceipt() {

        this.incomingDataFlag = false

    }

}
