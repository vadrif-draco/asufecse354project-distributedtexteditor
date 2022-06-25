import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Preview } from '../document-preview/document-preview.model';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-dashboard-main',
    templateUrl: 'dashboard-main.component.html',
    styleUrls: ['dashboard-main.component.css']
})
export class DashboardMainComponent implements OnInit, OnDestroy {

    constructor(private _dashService: DashboardService) { }

    public myDocs: Preview[] = [];
    public sharedDocs: Preview[] = [];

    private myDocsSubscription!: Subscription;
    private sharedDocsSubscription!: Subscription;


    ngOnInit(): void {

        // this.myDocs = [
        //     new Preview("The Methodology of Mutuality", 'https://data.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg', '/edit'),
        //     new Preview("The blobology of blobs", 'https://www.kindpng.com/picc/m/332-3322562_document-hd-png-download.png', '/edit'),
        //     new Preview("The bruh de la bruh", 'https://whc.unesco.org/uploads/thumbs/whc-99-conf204-inf1rev2e-500--20040502174412.jpg', '/edit'),
        // ]

        // this.sharedDocs = [
        //     new Preview("Communism", 'https://data.unhcr.org/images/documents/big_fc9ae0efd72a628326e6aef6eeceb17759f2eca5.jpg', '/edit'),
        //     new Preview("Hocus Pocus Focus Locus Everybody is Among Us",  'https://www.falsof.com/images/Document_Mutual_Release.gif', '/edit'),
        // ]

        this.myDocsSubscription = this._dashService.myDocsListener()
            .subscribe((docs: Preview[]) => { this.myDocs = docs; });

        this.sharedDocsSubscription = this._dashService.sharedDocsListener()
            .subscribe((docs: Preview[]) => { this.sharedDocs = docs; });

        this._dashService.myDocsRefresh();
        this._dashService.sharedDocsRefresh();

    }

    ngOnDestroy(): void {

        this.myDocsSubscription.unsubscribe();
        this.sharedDocsSubscription.unsubscribe();

    }

}
