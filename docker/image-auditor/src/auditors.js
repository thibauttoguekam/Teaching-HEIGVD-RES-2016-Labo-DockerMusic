var musicians = [];
var uid = [];


var Musician = function(uid, instrument) {
		this.uid = uid;
		this.instrument = instrument;
		this.activeSince = Date.now();
		this.lastActivity = Date.now();
	}

var jouer = function(joue) {
		console.log("sound: " + joue);
		var musician;
		var instrument;
		var j = uid.indexOf(joue.uid);
		if (j == -1) {

			switch (joue.sound) {
			case 'ti-ta-ti':
				instrument = 'piano';
				break;
			case 'pouet':
				instrument = 'trumpet';
				break;
			case 'gzi-gzi':
				instrument = 'violin';
				break;
			case 'trulu':
				instrument = 'flute';
				break;
			case 'boum-boum':
				instrument = 'drum';
				break;
			}
			console.log("joue:");
			console.log(joue);
			console.log("instrument:");
			console.log(instrument);
			musician = new Musician(joue.uid, instrument);
			musicians.push(musician);
			uid.push(joue.uid);
			console.log(joue.uid + " started emitting : " + joue.sound);
		} else {
			musician = musicians[j];
			musician.lastActivity = Date.now();
		}
	}


preparePayload = function() {
	deleteSilentMusicians();
	var valide = [];
	for (var i = 0; i < musicians.length; i++) {
		var musician = {
			uid: musicians[i].uid,
			instrument: musicians[i].instrument,
			activeSince: musicians[i].activeSince
		};
		valide.push(musician);
	}

	return JSON.stringify(valide);
}

function deleteSilentMusicians() {
	var now = Date.now();
	for (var i = 0; i < musicians.length; i++) {
		if (now - musicians[i].lastActivity > 5000) {
			musicians.splice(i, 1);
			uid.splice(i, 1);
		}
	}
}
setInterval(deleteSilentMusicians, 5000);

/*
 * We use a standard Node.js module to work with UDP
 */
var dgram = require('dgram');
var net = require('net');
var server = net.createServer();
/*
 * Let's create a datagram socket. We will use it to listen for datagrams published in the
 * multicast group by thermometers and containing measures
 */
var s = dgram.createSocket('udp4');
s.bind(9907, function() {
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
	socket.write(preparePayload());
	socket.destroy();
}
