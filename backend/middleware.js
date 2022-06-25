const Preview = require('./document-preview.model')

// To be fetched from mongodb later...

myDocs = [
    new Preview("The Methodology of Mutuality", 'https://data.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg', '/edit'),
    new Preview("The blobology of blobs", 'https://www.kindpng.com/picc/m/332-3322562_document-hd-png-download.png', '/edit'),
    new Preview("The bruh de la bruh", 'https://whc.unesco.org/uploads/thumbs/whc-99-conf204-inf1rev2e-500--20040502174412.jpg', '/edit'),
]

sharedDocs = [
    new Preview("Communism", 'https://data.unhcr.org/images/documents/big_fc9ae0efd72a628326e6aef6eeceb17759f2eca5.jpg', '/edit'),
    new Preview("Hocus Pocus Focus Locus Everybody is Among Us", 'https://www.falsof.com/images/Document_Mutual_Release.gif', '/edit'),
]

// --------------------------------------------------------------------------------------------------------------------------------------

const express = require('express');
const mongoose = require("mongoose")
const Document = require("./Document")
const middleware = express();

const WebSocket = require('ws').Server;
// Hard-coded for now as 3001 for testing purposes...
const websocket = new WebSocket({ server: middleware.listen(3001) });
let dataDiffSockets = [];

const parser = require('body-parser');
middleware.use(parser.json());
// middleware.use(parser.urlencoded(extended: false));

websocket.on('connection', socket => {

    dataDiffSockets.push(socket);

});

// connecting to database
mongoose.connect("mongodb://localhost/database",
    err => {
        if(err) throw err;
        console.log('connected to MongoDB')
    });

let documentStr = "";

async function findOrCreateDocument(id) {
    if (id == null) return
  
    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: null })
  }

function applyChanges(input, changes) {
    changes.forEach(change => {
        if (change.type == 'insert') {
            input.splice(change.index, 0, ...change.values);
        } else if (change.type == 'delete') {
            input.splice(change.index, change.howMany);
        }
    });
}

middleware.use((request, response, nextuse) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    nextuse(); // To go to the following use() calls
})

middleware.post('/api/docs/document', async (request, response, nextuse) => {
    console.log("Server received from client:") // Mongooooo
    console.log(request.body) // Mongooooo
    var docId = 1;
    const document = await findOrCreateDocument(docId);

    var docArray = Array.from(documentStr);
    applyChanges(docArray, request.body.data);
    documentStr = docArray.join('');
    console.log(documentStr);

    await Document.findByIdAndUpdate(docId, {data: documentStr})

    response.status(201).json({
        resp: 'HELO'
    })
    for (dataDiffSock of dataDiffSockets) {
        dataDiffSock.send(JSON.stringify(request.body))
    }
})

middleware.post('/api/docs/my', (request, response, nextuse) => {
    console.log(request.body) // Later should extract its content and store into mongodb
    response.status(201).json({
        resp: 'MESSAGE FROM SERVER: Cool document bro'
    })
})

middleware.get('/api/docs/my', (request, response, nextuse) => {
    response.status(200).json({
        resp: 'Fetched user XYZ\'s documents',
        docs: myDocs
    })
    // nextuse();
})

middleware.get('/api/docs/shared', (request, response, nextuse) => {
    response.status(200).json({
        resp: 'Fetched documents shared with user XYZ',
        docs: sharedDocs
    })
})

module.exports = middleware;