const http = require("http");
const middleware = require("./middleware");
const debugmodule = require("debug")("ng");
const websocketmodule = require('ws');

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

        for (clientws of wsserver.clients) {

            // console.log(JSON.parse(msg))
            if (clientws != ws) { clientws.send(JSON.stringify(JSON.parse(msg))) }

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