import { Component, EventEmitter, OnInit, AfterViewInit } from "@angular/core";
import { DocumentEditorService } from "../document-editor.service";

@Component({
    selector: "app-document-editor-text-area",
    templateUrl: "document-editor-text-area.component.html",
    styleUrls: ["document-editor-text-area.component.css"]
})
export class DocumentEditorTextAreaComponent implements OnInit, AfterViewInit {

    constructor(private _docEditService: DocumentEditorService) { }

    ngOnInit(): void { }

    baseHTML: string = `
        <style>
            div #text, div div { padding-bottom: 16px; }
            div br { padding-bottom: 0px; }
            .inuse { background-color: #f6f6ff; border-bottom: 1px solid #d8d8ff; } // should be randomunique per user
        </style>
    `.trim();

    stupidHTML: string = `
        <div><span><br></span></div>
    `.trim();

    ngAfterViewInit(): void {
        let textarea = document.getElementById("textarea")
        textarea!.innerHTML = this.baseHTML + this.stupidHTML;
        textarea!.focus();
    }


    // private getParentDiv(sel: Selection): Node {

    //     let child: Node = sel.anchorNode!;

    //     while (true) {

    //         let parent = child!.parentNode;
    //         if (!parent) return child;
    //         if (parent!.nodeName == "DIV") return parent;
    //         child = parent;

    //     }
    // }

    currNode?: HTMLElement | null = null;
    lastChange: DOMHighResTimeStamp = 0;
    updateEvent: EventEmitter<any> = new EventEmitter();

    localChange(event: KeyboardEvent | MouseEvent, textarea: HTMLElement): void {

        let newNode: HTMLElement = <HTMLElement>getSelection()!.anchorNode!;

        if (this.currNode == null && newNode && newNode.id !== "textarea") {

            console.log("Nodes have changed")

            this.currNode = newNode;
            if (this.currNode.nodeName == "#text") {

                let currNodeParent: HTMLElement | null = this.currNode.parentElement;
                if (currNodeParent && currNodeParent.id != "textarea") currNodeParent.className = "inuse";

            } else this.currNode.className = "inuse";

        } else if (this.currNode && newNode && !this.currNode.isSameNode(newNode)) {

            console.log("Nodes have changed")

            if (this.currNode.nodeName == "#text") {

                let currNodeParent: HTMLElement | null = this.currNode.parentElement;
                if (currNodeParent && currNodeParent.id != "textarea") currNodeParent.className = "";

            } else this.currNode.className = "";

            // Emit to server the last state of the node before switching out

            this.currNode = newNode;
            if (this.currNode.nodeName == "#text") {

                let currNodeParent: HTMLElement = this.currNode.parentElement!;
                if (currNodeParent.id != "textarea") currNodeParent.className = "inuse";
            
            } else this.currNode.className = "inuse";

        } else if (this.currNode && newNode && this.currNode.isSameNode(newNode)) {

            console.log("Nodes are same; no changes") // i.e., do nothing

        } else {

            if (this.currNode != null) this.currNode.className = "";
            this.currNode = null;

        }

        // forcing first child (after base style) to be a div, cause it isn"t by default
        console.log(textarea.childNodes)
        if (!textarea!.innerHTML.trim().includes(this.baseHTML)
            || textarea!.childNodes[1]!.nodeName != "DIV"
            || textarea!.childNodes[1]!.firstChild!.nodeName != "SPAN") {
            textarea.innerHTML = this.baseHTML + this.stupidHTML;
        }

        // anti-spam, only fire events every 1000ms
        if (Math.abs(this.lastChange - event.timeStamp) > 1000) {

            this.lastChange = event.timeStamp;

            // Emit latest state of currently selected node to server

            // Should perhaps consider using deltas instead of the entire innerHTML every time

        }

        console.dir(this.currNode)
        console.dir(newNode)

    }

}