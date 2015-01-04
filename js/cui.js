   
 var websocket;
// $(document).ready(function() {
  
   
    // Init Global objects
    Mixes = [
        new Mix(0, 'Mix A'),
        new Mix(1, 'Mix B'),
        new Mix(2, 'Mix C'),
        new Mix(3, 'Mix D'),
        new Mix(4, 'Mix E')
    ];
    
    admin = 1;
    inputAttention = 0;
    mixSwap = 0;
    serverInput = 0;
    scribbleInput = 0;
    scribbleId = 0;
    currentMix = 0;
    maxChannels = 8;
    online = 0;
    urlPre = 'ws://'
    url = '192.168.0.'
    urlPost = ':8001'
    userAgent = 0; // 0=Browser, 1=iPad, 2=iPhone
    
    if(localStorage.url != null){
        url = localStorage.url;
    } 
    if(localStorage.currentMix != null){
        currentMix = localStorage.currentMix;
    }
    
   if((navigator.userAgent.match(/iPhone/i))){
       admin = 0;
       userAgent = 2;
       
   }
   if((navigator.userAgent.match(/iPad/i))){
       admin = 0;
       userAgent = 1;
   }
   
    
    if (window.navigator.standalone === true) {                          // check for webApp mode
        if(userAgent===1)
        {
            $('body').addClass('iPad');
        }
        if(userAgent===2)
        {
            $('body').addClass('iPhone');
        }
    }else{
        $('body').addClass('browser');
    }
    
    var serverHtmlPre = '<div class="miscInputDialog"><div class="miscInputDialogLabel">Server IP address</div>';
    serverHtmlPre += '<input class="miscInput" id="serverInput" value="';
    serverHtmlPost = '"></input><br/>';
    serverHtmlPost += '<div class="butt" id="serverButton" onclick="showServers()">';
    serverHtmlPost += 'OK</div></div>';
  
    var scribbleHtmlPre = '<div class="miscInputDialog"><div class="miscInputDialogLabel" id="scribbleInputDialogLabel">Channel scribble</div>';
    scribbleHtmlPre += '<input class="miscInput" id="scribbleInput" value="';
    scribbleHtmlPost = '"></input><br/>';
    scribbleHtmlPost += '<div class="butt" id="scribbleButton" onclick="changeScribble()">';
    scribbleHtmlPost += 'OK</div></div>';
    
    musiList = ""
    musiList += '<ul>';
    musiList += '<li onclick="pickMix(0)">'+Mixes[0].name+'</li>';
    musiList += '<li onclick="pickMix(1)" id="0">'+Mixes[1].name+'</li>';
    musiList += '<li onclick="pickMix(2)" id="0">'+Mixes[2].name+'</li>';
    musiList += '<li onclick="pickMix(3)" id="0">'+Mixes[3].name+'</li>';
    musiList += '<li onclick="pickMix(4)" id="0">'+Mixes[4].name+'</li>';
    musiList += '</ul>';
    
    
    var muteSoloTableCells = ""
    for(i=0;i<maxChannels;i++){
        muteSoloTableCells += '<td>';
        muteSoloTableCells += '<div class="muteButton" onclick="mutePress('+i+')"></div>';
        muteSoloTableCells += '<div class="soloButton" onclick="soloPress('+i+')"></div>';
        muteSoloTableCells += '</td>';
    }
 //   muteSoloTableCells += '<td><div class="masterFader"></div></td>';
    
    var panTableCells = ""
    for(i=0;i<maxChannels;i++){
        panTableCells += '<td>';
        panTableCells += '<div class="panPot" onclick="panPress('+i+')"></div>';
        panTableCells += '</td>';
    }
    panTableCells += '<td><div class="blankPanPot"></div></td>';
    
    var faderTableCells = ""
    for(i=0;i<maxChannels;i++){
        faderTableCells += '<td>';
        faderTableCells += '<div class="fader"><div class="aeSlider" id="slider'+i+'" title="'+i+'"></div></div>';
        faderTableCells += '</td>';
    }
    faderTableCells += '<td><div class="fader"><div class="aeSlider" id="slider8" title="8"></div></div></td>';
    
    var scribbleTableCells = ""
    for(i=0;i<maxChannels;i++){
        scribbleTableCells += '<td>';
        scribbleTableCells += '<div class="scribble" id="scribble'+i+'"onclick="changeScribble('+i+')">'+Mixes[0].scribble[i]+'</div>';
        scribbleTableCells += '</td>';
    }
    scribbleTableCells += '<td><div class="scribble">'+Mixes[0].scribble[8]+'</div></td>';
    
    if(userAgent !== 2)         // iPhone view is smaller
    {
        $('#muteSoloRow').html(muteSoloTableCells);
        $('#panPotsRow').html(panTableCells);
    }
    $('#fadersRow').html(faderTableCells);
    $('#scribbleRow').html(scribbleTableCells);

    $('#musiData').html(Mixes[currentMix].name);
    $('#connData').html('Not connected!');
    $('#mixList').addClass('hidden');
    $('#serverInputBox').addClass('hidden');
    $('#scribbleInputBox').addClass('hidden');
  
    var heartbeatTimer = setInterval(function () {heartbeat();}, 500);
    
   // connect();
     /*
    var url = document.getElementById('url'),
    connect = document.getElementById('connect'),
    msg = document.getElementById('msg');
    */

    // flag for ignoring the current moving fader, as it's controlled by finger
    var passFlag=0;
    

   function connect() {
       
     console.log('Connecting to: ' +urlPre+url+urlPost);
     websocket = new WebSocket(urlPre+url+urlPost);

     // Eventhandler when the websocket is opened.
     websocket.onopen = function() {
       console.log('The websocket is now open.');
       $('#connData').html(url);
       online = 1;
       var sendBytes = [];
       var sendStr = "";
       sendBytes[0]=0x1F;
       sendStr = String.fromCharCode.apply(null, sendBytes);
       websocket.send(sendStr);  
     };
     // Eventhandler when the websocket is opened.
     websocket.onerror = function() {
       console.log('error.');
     };

     websocket.onmessage = function(event) {
         
       var payload = event.data;
       var arr = [];
       for (index = 0; index < payload.length; ++index) {
           arr[index] = payload.charCodeAt(index);
       }
       $('#connData').html(url);

       if(arr[0]==0x10)
        {      
            if(!passFlag)
            {
                if(arr[3]==currentMix)
                 {
                      var idStr="#slider"+arr[1].toString();
                      $(idStr).slider( "option", "value", arr[2] );
                 }
                Mixes[arr[3]].level[arr[1]] = arr[2];
            }
            else 
            {
                passFlag=0;
            }
        }
        if(arr[0]==0x11)
        {  
            var chn = arr[1];
            var len = arr[2];
            var scribble = payload.substring(4);
            $('#scribble'+chn).html(scribble);
        }
        if(arr[0]==0x90) console.log("heartbeat - response");
        
     };

     // Eventhandler when the websocket is closed.
     websocket.onclose = function() {
        console.log('The websocket is now closed.');
        $('#connData').html('Not connected!');
        online=0;
     };
   };
   
   
   document.ontouchmove = function(event){
        event.preventDefault();
    }

   $( "#slider0" ).slider({ orientation: "vertical" });
   $( "#slider1" ).slider({ orientation: "vertical" });
   $( "#slider2" ).slider({ orientation: "vertical" });
   $( "#slider3" ).slider({ orientation: "vertical" });
   $( "#slider4" ).slider({ orientation: "vertical" });
   $( "#slider5" ).slider({ orientation: "vertical" });
   $( "#slider6" ).slider({ orientation: "vertical" });
   $( "#slider7" ).slider({ orientation: "vertical" });
   $( "#slider8" ).slider({ orientation: "vertical" });
//   $( "#slider9" ).slider({ orientation: "vertical" });

   $( ".ui-slider" ).on( "slide", function( event, ui ) {
     var thisSliderStr = this.id;
     var thisSliderNo= this.title;
     var sendBytes = [];
     var value = $( "#"+thisSliderStr).slider( "option", "value" );    
     Mixes[currentMix].level[thisSliderNo] = value;
     
        sendBytes[0]=0x10;
        sendBytes[1]=thisSliderNo;
        sendBytes[2]=value;
        sendBytes[3]=currentMix;

        var sendStr = "";
        sendStr = String.fromCharCode.apply(null, sendBytes);
        passFlag=1;
        websocket.send(sendStr);  
   });

// });


$('#connData').html('Not connected!');
UpdateFaders();
   
function showMixes(){
    if(!online)return;
    if(!mixSwap){
        if(inputAttention)return;
        $('#mixList').html(musiList);
        $('#mixList').removeClass('hidden');
        $('#mixList').addClass('notHidden');
        mixSwap = 1;
        inputAttention = 1;
    }
    else{
        $('#mixList').removeClass('notHidden');
        $('#mixList').addClass('hidden');
        mixSwap = 0;
        inputAttention = 0;
    }
};
   
function pickMix(mixPicked){
    if(!online)return;
    $('#musiData').html(Mixes[mixPicked].name);
    $('#mixList').removeClass('notHidden');
    $('#mixList').addClass('hidden');
    mixSwap = 0;
    currentMix = mixPicked;
    localStorage.currentMix = currentMix;
    updateMixer();
    inputAttention = 0;
};
function showServers(){
    if(!serverInput){
        if(inputAttention)return;
        console.log(url);
        $('#serverInputBox').html(serverHtmlPre+url+serverHtmlPost);
        $('#serverInputBox').removeClass('hidden');
        $('#serverInputBox').addClass('notHidden');
        $('#serverInput').focus();
        $('#serverInput').select();
        serverInput = 1;
        inputAttention = 1;
    }
    else{
        $('#serverInputBox').removeClass('notHidden');
        $('#serverInputBox').addClass('hidden');
        serverInput = 0;
        url = $('#serverInput').val();
        localStorage.url = url;
        connect();
        inputAttention = 0;
    }
};
function changeScribble(chn){
    if(!online)return;
    if(!admin)return;
    if(!scribbleInput){
        if(inputAttention)return;
        $('#scribbleInputBox').html(scribbleHtmlPre+scribbleHtmlPost);
        $('#scribbleInputBox').removeClass('hidden');
        $('#scribbleInputBox').addClass('notHidden');
        $('#scribbleInput').val(Mixes[0].scribble[chn]);
        $('#scribbleInputDialogLabel').html("Channel "+(chn+1)+" label");
        $('#scribbleInput').focus();
        $('#scribbleInput').select();
        scribbleInput = 1;
        scribbleId = chn;
        inputAttention = 1;
    }
    else{
        $('#scribbleInputBox').removeClass('notHidden');
        $('#scribbleInputBox').addClass('hidden');
        scribbleInput = 0;
        var val = $('#scribbleInput').val();
        Mixes[0].scribble[scribbleId]=val;
        
        var sendBytes = [];
        sendBytes[0]=0x11;
        sendBytes[1]=scribbleId;
        sendBytes[2]=val.length;
        sendBytes[3]=0;

        var sendStr = "";
        sendStr = String.fromCharCode.apply(null, sendBytes);
        sendStr += val;
        websocket.send(sendStr);   
        inputAttention = 0;  
    }
};

function updateMixer(){
    for(i=0;i<maxChannels+1;i++){
        var idStr="#slider"+i.toString();
        var Mix = Mixes[currentMix];
        $(idStr).slider( "option", "value", Mix.level[i] );
    }
}
 
function Mix(id, name) {
   
    this.id = id;
    this.name = name;
    this.level = [0,0,0,0,0,0,0,0,79];
    this.pan = [0,0,0,0,0,0,0,0,0];
    this.scribble = ["ch 1","ch 2","ch 3","ch 4","ch 5","ch 6","ch 7","ch 8","Master"];
    function setLevel(chn, level){
        this.level[chn]=level;
    }
}

function UpdateFaders(){  
    for(i=0;i<(maxChannels+1);i++)
        {
            var idStr="#slider"+i.toString();
            $(idStr).slider( "option", "value", Mixes[currentMix].level[i]); 
            console.log('Init Faders: '+Mixes[currentMix].level[i]);
        }
}

$('#scribbleInputBox').keypress(function (e) {
  if (e.which == 13) {
    changeScribble(scribbleId);
  }
});

$('#serverInputBox').keypress(function (e) {
  if (e.which == 13) {
    showServers();
  }
});

function heartbeat()
{
    if(online)
    {
        var sendBytes = [4];
        sendBytes[0]=0x90;
        sendBytes[1]=0x00
        sendBytes[2]=0x7F
        sendBytes[3]=0;

        var sendStr = "";
        sendStr = String.fromCharCode.apply(null, sendBytes);
        websocket.send(sendStr); 
        console.log("heartbeat");            
    }
    else
    {
        if(url != '192.168.0.')
        {
            connect();
            console.log("connect");   
        }
       
    }

}


function handleVisibilityChange() {
  if (document.hidden) {
  //  Not Active
  } else  {
  //  Active
  }
}

document.addEventListener("visibilitychange", handleVisibilityChange, false);