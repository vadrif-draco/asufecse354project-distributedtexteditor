import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
    providedIn: 'root'
})
export class DocumentEditorService {

    constructor(private httpClient: HttpClient) { }

    outgoingUpdate(dataDiff: any) {

        this.httpClient.post<{ resp: string }>('http://localhost:3000/api/docs/document', { data: dataDiff })
            .subscribe((response) => { console.log("Server sent: " + response.resp) });

    }
}
