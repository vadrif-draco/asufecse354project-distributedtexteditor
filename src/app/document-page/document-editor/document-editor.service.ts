import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable, Subscriber, TeardownLogic } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DocumentEditorService {

    constructor(private httpClient: HttpClient) { }

    private incomingDataDiff = new Subject();

    initIncomingDataDiffListenerWebSocket(PORT: string): Observable<WebSocket> {

        return new Observable<WebSocket>(
            (subscriber: Subscriber<WebSocket>): TeardownLogic => {

                const ws = new WebSocket("ws://localhost:" + PORT);
                
                ws.onopen = () => {
                    subscriber.next(ws);
                    subscriber.complete();
                };
                
                ws.onerror = (err) => {
                    console.error("Websocket errored while trying to connect", err);
                    subscriber.error(err);
                };
                
                ws.onclose = (_ev) => {
                    console.log("Websocket closed before having emitted any message");
                    subscriber.complete();
                };
            }
        );

        // this.wsSubject = webSocket("ws://localhost:" + PORT);
        // const dataDiff = this.wsSubject.pipe(

        //     tap({ error: (error) => { console.log(error) } }),
        //     catchError(_ => EMPTY)

        // );
        // this.incomingDataDiff.next(dataDiff);
        // this.incomingDataDiff.complete();

    }

    // incomingDataDiffListener() { return this.incomingDataDiff.asObservable(); }

    createIncomingDataDiffListener(ws: WebSocket): Observable<any> {

        return new Observable<any>(
            (subscriber: Subscriber<MessageEvent>): TeardownLogic => {

                ws.onmessage = (msg: MessageEvent) => {
                    subscriber.next(msg);
                };

                ws.onerror = (err) => {
                    console.error("Websocket errored while streaming messages");
                    subscriber.error(err);
                };

                ws.onclose = () => {
                    console.log("Websocket closed");
                    subscriber.complete();
                };

                return () => { ws.onmessage = null; };
            }
        );
    }

    outgoingUpdate(dataDiff: any) {

        this.httpClient.post<{ resp: string }>('http://localhost:3000/api/docs/document', { data: dataDiff })
            .subscribe((response) => { console.log("Server sent: " + response.resp) });

    }
}
