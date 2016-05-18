var dgram = require('dgram');
var s = dgram.createSocket('udp4');
var uuid = require('node-uuid');

function Musicien(instruments){
     this.instruments = instruments;
         this.uid = uuid.v1();
		 
	 Musicien.prototype.update = function(){
	    
	   switch(this.instruments){
	   case 'piano': this.sound = 'ti-ta-ti';
	                  break;
	   case 'trumpet': this.sound = 'pouet';
	                  break;
           case 'flute': this.sound = 'trulu';
	                  break;
	   case 'violin': this.sound = 'gzi-gzi';
	                  break;
            case 'drum': this.sound = 'boum-boum';
	                  break;
           }
           
           var joue = {
                uid : this.uid,
                sound: this.sound
               
           };
           
           var payload = JSON.stringify(joue);
           
       message = new Buffer(payload);
       s.send(message, 0, message.length, 2205, "239.255.22.5", function(err, bytes) {
            console.log("Playing sound : " + payload + " via port " + s.address().port);
        });
       }	
       setInterval(this.update.bind(this), 1000);
    }
	
	var instrument =process.argv[2];	
     var musicien = new Musicien(instrument);