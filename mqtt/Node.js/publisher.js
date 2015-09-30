var mqtt = require('mqtt'); // https://github.com/mqttjs/MQTT.js

var brokerURI = 'mqtts://mqtt.arduino.cc';

// use the values shown after logging into https://cloud.arduino.cc
var username  = 'username';
var password  = 'password';
var baseTopic = '/' + username;
var topic     = baseTopic + '/001';

// default message
var message   = '0';

if (process.argv.length > 2) {
  // use command line argument as message
  message = process.argv[2]
}

// create client and connect
var client  = mqtt.connect(brokerURI, {
  username: username,
  password: password
});

// attatch event listener for 'connect' event
client.on('connect', function () {
  // client has connected to the broker
  console.log('connected');

  // publish the message to the topic
  client.publish(topic, message, {}, function() {
    // mesage has been published
    console.log('message published: ' + message);

    // all done, exit
    process.exit(0);
  });
});
