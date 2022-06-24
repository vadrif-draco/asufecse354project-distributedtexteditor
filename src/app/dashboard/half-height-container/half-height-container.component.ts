import { Component, Input, OnInit } from '@angular/core';
import { Preview } from '../document-preview/document-preview.model';
import { DashboardService } from '../dashboard.service';

@Component({
    selector: 'app-half-height-container',
    templateUrl: 'half-height-container.component.html',
    styleUrls: ['half-height-container.component.css']
})
export class HalfHeightContainerComponent implements OnInit {

    @Input() docsList: Preview[] = [];
    @Input() shared: boolean = false;

    constructor(private dashService: DashboardService) { }

    ngOnInit(): void { }

    createNewDoc(): void {
        alert("Stub for showing doc creation dialog then add after confirming.\
            \nThough, check the server side, I performed a POST on it anyway...")
        this.dashService.myDocsAdd();
    }

}
