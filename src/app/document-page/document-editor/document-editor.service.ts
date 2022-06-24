import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class DocumentEditorService {

    constructor() { }

    outgoingUpdate(newData: string) {
        // Send to server?
    }
}
