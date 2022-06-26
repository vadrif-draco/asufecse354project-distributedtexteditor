const Preview = require('./document-preview.model')

// To be fetched from mongodb later...

myDocs = [
    new Preview("The Methodology of Mutuality", 'https://data.unhcr.org/images/documents/big_4cda85d892a5c0b5dd63b510a9c83e9c9d06e739.jpg', '65cd0a3f-b2f3-4f31-bef5-a082f4e07644'),
    new Preview("The blobology of blobs", 'https://www.kindpng.com/picc/m/332-3322562_document-hd-png-download.png', 'acf15013-ccb6-47fc-a416-3358844c75ea'),
    new Preview("The bruh de la bruh", 'https://whc.unesco.org/uploads/thumbs/whc-99-conf204-inf1rev2e-500--20040502174412.jpg', '8a7a1af7-aa56-4a63-b25b-29fd1a2e4670'),
]

sharedDocs = [
    new Preview("Communism", 'https://data.unhcr.org/images/documents/big_fc9ae0efd72a628326e6aef6eeceb17759f2eca5.jpg', '38f7f664-696d-42b8-b1b3-82e52dd008b8'),
    new Preview("Hocus Pocus Focus Locus Everybody is Among Us", 'https://www.falsof.com/images/Document_Mutual_Release.gif', '59f2d55a-dd82-4453-829d-13fdd633d6ab'),
]

// --------------------------------------------------------------------------------------------------------------------------------------
const http = require("http");
const express = require('express');
const mongoose = require("mongoose")
const Document = require("./Document")
const middleware = express();
const debugmodule = require("debug")("ng");
const websocketmodule = require('ws');
const parser = require('body-parser');
middleware.use(parser.json());
// middleware.use(parser.urlencoded(extended: false));

// connecting to database
mongoose.connect("mongodb://localhost/database",
    err => {
        if (err) throw err;
        console.log('connected to MongoDB')
    });

let documentStr = "";

async function findOrCreateDocument(id) {
    if (id == null) return

    const document = await Document.findById(id)
    if (document) return document
    return await Document.create({ _id: id, data: null })
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

    await Document.findByIdAndUpdate(docId, { data: documentStr })

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

middleware.get('/api/docs/:docuuid', async (request, response, nextuse) => {

    var uuid = request.params.docuuid;

    const document = await findOrCreateDocument(uuid);
    // TODO: Logic @Ahmed1Bakry

})


let openDocs = {}
function getLocalDoc(id)
{
    if(openDocs[id])
    {
        return openDocs[id];
    }

    openDocs[id] = '';
    return openDocs[id];
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


const validatePort = (portval) => {

    var portnum = parseInt(portval);
    if (isNaN(portnum)) return portval; // port is named (aka a pipe)
    if (portnum >= 0) return portnum; // port is a valid number
    return false;

};


const onError = (error) => {

    if (error.syscall !== "listen") throw error;

    switch (error.code) {

        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);

        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);

        default:
            throw error;

    }

};

const onListening = () => {

    // const addr = server.address();
    debugmodule("Listening on " + bind);

};

// This function is to be triggered when a client connects to the Web socket server
const onConnection = (ws) => {

    // TODO: What to do upon connection?
    ws.on("message", (msg) => {

        // TODO: What to do with the msg received from the client connected on this socket?

        var res = JSON.parse(msg);
        //console.log(res)


        if(res.type == 'load')
        {
            res.doc = getLocalDoc(res.id);
            ws.send(JSON.stringify(res))
        }
        else
        {

            var content = getLocalDoc(res.id);

            var docArray = Array.from(content);
            applyChanges(docArray, res.diff);
            content = docArray.join('');
            openDocs[res.id] = content;
        
            for (clientws of wsserver.clients) {

                // console.log(JSON.parse(msg))
                if (clientws != ws) { clientws.send(JSON.stringify(res)) }
    
            }
        }


    })

}

const port = validatePort(process.env.PORT || "3000");
const bind = (typeof port === "string") ? "pipe " + port : "port " + port;

middleware.set("port", port);

const server = http.createServer(middleware);
const wsserver = new websocketmodule.Server({ server });
wsserver.on("connection", onConnection);
server.on("listening", onListening);
server.on("error", onError);
server.listen(port);
