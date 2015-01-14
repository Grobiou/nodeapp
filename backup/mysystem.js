var os = require('os');

var message = 'Here is some info abuot your system';

var sysarray = new Array('type: '+os.type(),
	'Node Version: '+os.platform(),
	'Hostname: '+os.hostname(),
	'Total Memory: '+os.totalmem(),
	'Free Memory: '+os.freemem(),
	'Uptime: '+os.uptime()
	);

console.log(message);

var arraylen = sysarray.length;

i = 0;

while(i < arraylen) {
	console.log(sysarray[i]);
	i++;
}
