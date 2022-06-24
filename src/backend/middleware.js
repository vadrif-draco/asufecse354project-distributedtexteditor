const Preview = require('./document-preview.model')
const express = require('express');
const parser = require('body-parser');

const middleware = express();

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

middleware.use(parser.json());

// middleware.use(parser.urlencoded(extended: false));

middleware.use((request, response, nextuse) => {
    response.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
    response.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type");
    nextuse(); // To go to the following use() calls
})

middleware.post('/api/docs/document', (request, response, nextuse) => {
    console.log(request.body) // Mongooooo
    response.status(201).json({
        resp: 'HELO'
    })
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