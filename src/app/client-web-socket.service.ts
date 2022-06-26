
import { Injectable } from '@angular/core';
import { Observable, Subscriber, TeardownLogic } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientWebSocketService {

    // Alternative implementation
    // private incomingData!: Subject<any>;
    
    constructor() {}

    // This function initializes a web socket at the defined PORT
    // FIXME: Also uses localhost, which should be changed in production
    // Returns an observable of type websocket such that upon connection it has the methods defined below
    initializeWebSocket(PORT: string): Observable<WebSocket> {

        return new Observable<WebSocket>(
            (subscriber: Subscriber<WebSocket>): TeardownLogic => {

                const ws = new WebSocket(`ws://${environment.hostname}:` + PORT);
                
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

        // Alternative implementation
        // this.wsSubject = webSocket("ws://localhost:" + PORT);
        // const dataDiff = this.wsSubject.pipe(

        //     tap({ error: (error) => { console.log(error) } }),
        //     catchError(_ => EMPTY)

        // );
        // this.incomingData.next(dataDiff);
        // this.incomingData.complete();

    }

    // Alternative implementation
    // incomingDataListener() { return this.incomingData.asObservable(); }

    // This function creates an observable of any type (for listening to generic data)
    // Whenever the server-side sends a message (ws.onmessage) on the provided websocket it is asynchronously updated
    // Whatever app component subscribed to this observable will act accordingly (based on its subscription method)
    getWebSocketListener(ws: WebSocket): Observable<any> {

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

    // This function is required to send the provided generic data
    // 
    sendWebSocketData(ws: WebSocket, data: any) {

        ws.send(JSON.stringify(data))

        // TODO: Replace HTTP with websocket

        // this.httpClient.post<{ resp: string }>('http://localhost:3000/api/docs/document', { data: dataDiff })
        //     .subscribe((response) => { console.log("Server sent: " + response.resp) });

    }

}
