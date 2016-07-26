
var websocket = new WebSocket("ws://localhost:8001","Connect");     // try to find ws server

websocket.onopen = function() {                                 // if server accepted

    console.log("connected to server");
};

websocket.onmessage = function(event) {

    var wsObject = JSON.parse(event.data);  // parse packet to an Object
    var cmd = wsObject.cmd;                 // this is included in all packets

    if(cmd===0x10)      // MTC object
        {
            mtcDisplay.fps(wsObject.fps);
            mtcDisplay.hour(wsObject.hour);
            mtcDisplay.min(wsObject.min);
            mtcDisplay.sec(wsObject.sec);
            mtcDisplay.frame(wsObject.frame);
            position = wsObject.position;       // 32 bit position
            

        }
    if(cmd===0x21)       // automation track
        {
            autoPts[wsObject.track]=wsObject.points;  
            // render the points to a canvas object right away
            timelinePaths[wsObject.track] = trackPointsToImage(autoPts[wsObject.track]);
        }
    if(cmd===0x30)       // recording frame
        {
            //
            writeRegions[wsObject.track].feed(wsObject.position, wsObject.level);
        }

    if(cmd===0xFA)       // total recall data
        {
            var trRegion    = wsObject.region;
            var trBank      = wsObject.bank;
            var trAddress   = wsObject.address;
            var trData      = wsObject.data;
            
            /*
             * 
             *  the code for dealing with the Recall data is taken out for this file
             *  
             */
        }
};

websocket.onclose = function() {
    console.log('Websocket closed.');
};


// this is my paint method
function paintWorker(){
// will give itself as a callback
    requestAnimationFrame(paintWorker);
    /*
     * 
     *  a lot of canvas drawing from pre rendered objects
     * 
     */
    // example snippet for drawing the 8 time line tracks + / - 1 for smooth scrolling
    if(rePaintFlag){   
        for(var n=0;n<10;n++) {   
            var chn=n+(chnOffset);
            if(chn>0 && chn<97){
               timelinePaths[chn-1] = trackPointsToImage(autoPts[chn-1]);
            }
        }  
        rePaintFlag=0;
        drawRuler();
    }
}