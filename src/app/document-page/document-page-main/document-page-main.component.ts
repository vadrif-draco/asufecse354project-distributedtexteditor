import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router'

@Component({
    selector: 'app-document-page-main',
    templateUrl: 'document-page-main.component.html',
    styleUrls: ['document-page-main.component.css']
})
export class DocumentPageMainComponent implements OnInit {

    uuid: string = ''

    constructor(private _route: ActivatedRoute) { }

    ngOnInit(): void {

        this._route.paramMap
        .subscribe((parameters: ParamMap) => {

            this.uuid = parameters.get('uuid')!

        })
        
    }

}
