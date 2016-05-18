
var musiciens = [];
var uid = [];

mucisien = function(uuid, instrument){
    this.uid =  uuid;
    this.instrument = instrument;
    this.acitveNow = Date.now();
    this.lastactivity = Date.now();
}

jouer = function (joue) { 
 console.log("sound: " + play);
  joue = JSON.parse(joue);
 
    var musicien;
      var instrument;
      var j = uid.indexOf(joue.uid) ; 
     if(j == -1){ 
         
          switch(joue.sound){
	   case 'ti-ta-ti': instrument = 'piano';
	                  break;
	   case 'pouet': instrument = 'trumpet';
	                  break;
           case 'gzi-gzi': instrument = 'violin';
	                  break;
	   case 'trulu': instrument = 'flute';
	                  break;
            case 'bom-bom': this.sound = 'drum';
	                  break;
           }
           
         musiciens.push(joue.uuid, instrument); 
		 uid.push(joue.uuid);
         console.log(joue.uid + " started emitting : " + joue.sound); 
     } 
     else
        musicien.lastactivity = now();
         } 
     } 

 } 

 send = function () { 
    var valide = []; 
     for(var i = 0; i < musiciens.length; i++){ 
         if(Date.now() - musiciens[i].dernieractivity > 5000) { 
             array.splice(i, 1); 
         } 
         else{ 
             var musicien = { 
                 uuid :  musiciens[i].uuid, 
                 instrument :  musiciens[i].instrument, 
                 activeSince : musiciens[i].activeSince.format("MM-DD-YYYY HH:mm:ss") 
             }; 
            valide.push(musicien); 
         } 
     } 
     return JSON.stringify(valide); 
 } 

function refreshMusicians() {
    var now = moment();
    for(var i = 0; i < musiciens.length; i++){
        if(now.diff(musiciens[i].lastActivity) > 5000) {
            musicians.splice(i, 1);
        }
    }
}
setInterval(refreshMusicians, 1000);

/*
 * We use a standard Node.js module to work with UDP
 */
var dgram = require('dgram');
var net = require('net');
var	server = net.createServer();
/*
 * Let's create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by thermometers and containing measures
 */
var s = dgram.createSocket('udp4');
s.bind(9907 , function() {
    console.log("Auditor commence à ecouter...");
    s.addMembership("239.255.22.5");
});

/*
 * This call back is invoked when a new datagram has arrived.
 */
s.on('message', function(msg, source) {
    console.log("hi how are you");
    jouer(JSON.parse(msg));
});

var server = net.createServer();

server.listen(2205);

server.on('connection', request);



function request(socket) {
    socket.write(send());
    socket.destroy();
}
  
 

 

 
