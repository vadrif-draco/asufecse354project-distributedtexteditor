import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { MatPaginatorModule } from '@angular/material/paginator';


@Component({
    selector: 'app-document-history-pane',
    templateUrl: 'document-history-pane.component.html',
    styleUrls: ['document-history-pane.component.css']
})
export class DocumentHistoryPaneComponent implements OnInit {

    showHistoryPrompt: boolean = false

    @Input() histories!: any[]
    historiesSlice!: any[]
    pageSize: number = 5 // Number of documents in one page
    total!: number // Total number of documents

    @Output() requestHistories = new EventEmitter<any>()
    @Output() documentLoader = new EventEmitter<any>()

    constructor() { }

    ngOnInit(): void { this.requestHistories.emit() }

    update(event: PageEvent) {

        let start = event.pageIndex * event.pageSize
        this.historiesSlice = this.histories.slice(start, Math.min(this.total, start + this.pageSize))

    }

    toggleHistoryPrompt() {

        this.requestHistories.emit()
        console.log(" hey here are the histories")
        this.total = this.histories.length
        this.historiesSlice = this.histories.slice(0, 5)
        console.log(this.historiesSlice[0])
        this.showHistoryPrompt = !this.showHistoryPrompt

    }

    loadDocument(doc: string) {
        // this.documentLoader.emit(doc)
        console.log(doc)
    }

}
