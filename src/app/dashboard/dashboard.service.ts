import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Preview } from './document-preview/document-preview.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const host = 'ec2-3-92-147-12.compute-1.amazonaws.com';

@Injectable({
    providedIn: 'root'
})
export class DashboardService {

    constructor(private httpClient: HttpClient) { }

    private myDocs: Subject<Preview[]> = new Subject<Preview[]>();
    private sharedDocs: Subject<Preview[]> = new Subject<Preview[]>();

    // TODO: Replace with actual server, and use the LOGGED-IN user id
    myDocsRefresh() {

        this.httpClient.get<{ resp: string, docs: Preview[] }>(`http://${environment.hostname}:3000/api/docs/my`)
            .subscribe((response) => {

                console.log(response.resp)
                this.myDocs.next(response.docs);

            });

    }

    sharedDocsRefresh() {

        this.httpClient.get<{ resp: string, docs: Preview[] }>(`http://${environment.hostname}:3000/api/docs/shared`)
            .subscribe((response) => {

                console.log(response.resp)
                this.sharedDocs.next(response.docs);

            });

    }

    myDocsAdd() {

        this.httpClient.post<{ resp: string }>(`http://${environment.hostname}:3000/api/docs/my`, { data: 'oy' })
            .subscribe((response) => {
                alert(response.resp)
            });

    }

    myDocsListener() { return this.myDocs.asObservable(); }
    sharedDocsListener() { return this.sharedDocs.asObservable(); }

}
