function Client(){
    var self = this;
    var MAX_BUFFER = 1000;
    var LOOKUP_TIMEOUT = 1000;
    var CONNECTED = 0;
    var connectState = 0;
    var websocket;
    var bufferUnloadTimer;
    var socketBuffer = [];

    var COOKIE_IP = LocalStorage.ip;
    var COOKIE_IP = "192.168.0.248";
    var SW96_PORT = "8001";
    
    this.connect = function(){
        // try to connect to cookie address
        if(connectState == 0){
            connectState = 1;
            websocket = new WebSocket("ws://" + COOKIE_IP + ":" + SW96_PORT, "connect");
            // timeOut after XX ms
            setTimeout(function(){
                // if cookie address wasn't found
                if(!CONNECTED){
                    // start scanning
                    self.connect();
                }
            },LOOKUP_TIMEOUT)
        }
        else if (connectState == 1){
            // start scanning
            findServers(SW96_PORT,"192.168.0.",1,254,50,250, function(ip){
                connectState = 0;
                self.connect();
            })     
            // timeOut after XX ms
            setTimeout(function(){
                // if scanning address wasn't found
                if(!CONNECTED){
                    // start scanning
                    console.log("Can't find server");
                }
            },(LOOKUP_TIMEOUT*10))      
        }
    };
    
// **** **** **** SERVER CONNECTION **** **** ****
    websocket.onopen = function() {
        console.log('Server Found!');
        CONNECTED = 1;
        /*
        bufferUnloadTimer = setInterval(function(){
            bufferUnload();
        },10);
        */
    };         
    
// **** **** **** INCOMING MESSAGE **** **** ****        
    websocket.onmessage = function(event) {
    //    websocket.send('ACKNOWLEDGE BYTES');
        var wsObject;
        try {
            wsObject = JSON.parse(event.data);
        } catch (e) {
            console.log(e);
            console.log(event.data);
            return;
        }
        checkBuffer();
        socketBuffer.push(wsObject);
    };
    
// **** **** **** CLIENT CONNECTION CLOSED **** **** ****
    websocket.onclose = function() {
        console.log('Websocket closed.');
        var reason;
        // See http://tools.ietf.org/html/rfc6455#section-7.4.1
        if (event.code === 1000)
            reason = "Normal closure, meaning that the purpose for which the connection was established has been fulfilled.";
        else if(event.code === 1001)
            reason = "An endpoint is \"going away\", such as a server going down or a browser having navigated away from a page.";
        else if(event.code === 1002)
            reason = "An endpoint is terminating the connection due to a protocol error";
        else if(event.code === 1003)
            reason = "An endpoint is terminating the connection because it has received a type of data it cannot accept (e.g., an endpoint that understands only text data MAY send this if it receives a binary message).";
        else if(event.code === 1004)
            reason = "Reserved. The specific meaning might be defined in the future.";
        else if(event.code === 1005)
            reason = "No status code was actually present.";
        else if(event.code === 1006)
        reason = "The connection was closed abnormally, e.g., without sending or receiving a Close control frame";
        else if(event.code === 1007)
            reason = "An endpoint is terminating the connection because it has received data within a message that was not consistent with the type of the message (e.g., non-UTF-8 [http://tools.ietf.org/html/rfc3629] data within a text message).";
        else if(event.code === 1008)
            reason = "An endpoint is terminating the connection because it has received a message that \"violates its policy\". This reason is given either if there is no other sutible reason, or if there is a need to hide specific details about the policy.";
        else if(event.code === 1009)
        reason = "An endpoint is terminating the connection because it has received a message that is too big for it to process.";
        else if(event.code === 1010) // Note that this status code is not used by the server, because it can fail the WebSocket handshake instead.
            reason = "An endpoint (client) is terminating the connection because it has expected the server to negotiate one or more extension, but the server didn't return them in the response message of the WebSocket handshake. <br /> Specifically, the extensions that are needed are: " + event.reason;
        else if(event.code === 1011)
            reason = "A server is terminating the connection because it encountered an unexpected condition that prevented it from fulfilling the request.";
        else if(event.code === 1015)
            reason = "The connection was closed due to a failure to perform a TLS handshake (e.g., the server certificate can't be verified).";
        else
            reason = "Unknown reason";
        
        websocket = null;
        console.log(reason);
        clearInterval(bufferUnloadTimer);
    };
    
// **** **** **** CLIENT CONNECTION ERROR **** **** ****  
    websocket.onerror = function(e) {
        console.log('Websocket error');
        console.log(e);
        clearInterval(bufferUnloadTimer);
    };
    
// **** **** **** CHECK BUFFER OVERFLOW **** **** ****          
    function checkBuffer(){
        var size = sizeof(socketBuffer);
        if(size>MAX_BUFFER){
            console.log("Buffer overflow "+(MAX_BUFFER));
            socketBuffer = [];
            websocket.send(JSON.stringify({
                "cmd"   : "buffer overflow",
                "size"  : size
            }))
            return 0;
        }
        else return 1
    }
    
// **** **** **** DUMMY BUFFER UNLOAD **** **** **** 
    function bufferUnload(){
        var d = new Date();
        var t = d.getTime();
        var secs = Math.round(t / 1000);
        var size = sizeof(socketBuffer);
        socketBuffer = [];
    }
    
// **** **** **** FIND SERVERS **** **** ****         
    function findServers(port, ipBase, ipLow, ipHigh, maxInFlight, timeout, cb) {
            var ipCurrent = +ipLow, numInFlight = 0, servers = [];
            var ipFull;
            ipHigh = +ipHigh;

            function tryOne(ip) {
                ++numInFlight;
                var address = "ws://" + ipBase + ip + ":" + port;
                var socket = new WebSocket(address);
                var timer = setTimeout(function() {
                    console.log(address + " timeout");
                    var s = socket;
                    socket = null;
                    s.close();
                    --numInFlight;
                    next();
                }, timeout);
                socket.onopen = function() {
                    if (socket) {
                        console.log(address + " success");
                        clearTimeout(timer);
                        servers.push(socket.url);
                        --numInFlight;
                        ipFull = ipBase+ip;
                        next();
                    }
                };
                socket.onerror = function(err) {
                    if (socket) {
                        console.log(address + " error");
                        clearTimeout(timer);
                        --numInFlight;
                        next();
                    }
                }
            }

            function next() {
                while (ipCurrent <= ipHigh && numInFlight < maxInFlight) {
                    tryOne(ipCurrent++);
                }
                // if we get here and there are no requests in flight, then
                // we must be done
                if (numInFlight === 0) {
                    cb(ipFull);
                }
            }
            next();
        }     
}

