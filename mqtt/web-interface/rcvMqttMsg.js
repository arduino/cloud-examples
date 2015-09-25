// constants
var mqttBrokerURI      = "wss://mqtt.arduino.cc:9002/";
var mqttClientName     = "browser";
var mqttUsername       = "username";                  // your MQTT username
var mqttPassword       = "password";                  // your MQTT password
var mqttTopic          = "/" + mqttUsername + "/001"; // your MQTT topic /<username>/topic

// wait for page to be reader
$(document).ready(function() {
  // Create a client instance,
  // uses the paho library (https://www.eclipse.org/paho/clients/js/)
  client = new Paho.MQTT.Client(mqttBrokerURI, mqttClientName);

  // set callback handlers
  client.onConnectionLost = onConnectionLost;
  client.onMessageArrived = onMessageArrived;

  // connect the client
  client.connect({
    userName: mqttUsername,
    password: mqttPassword,
    useSSL: true,
    onSuccess: onConnect
  });

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, make a subscription and send a message.
    console.log("connected");
    client.subscribe(mqttTopic);
    console.log("subscribed to " + mqttTopic);
  }

  // called when the client loses its connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("connection lost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log(message);
    console.log("new message arrived:" + message.payloadString);

    if (message.payloadString == 0 ){
      switchoff();
    } else if (message.payloadString == 255) {
      switchOn();
    } else {
      switchTo(message.payloadString);
    }
  }

  function switchOn() {
    $(".intensity").fadeTo( "fast" , 1)
  }

  function switchoff() {
    $(".intensity").fadeTo( "fast", 0)
  }

  function sendMessage(destination, val) {
    console.log("sending " + val);
    message = new Paho.MQTT.Message(val);
    message.destinationName = destination;
    message.payloadString = val;
    client.send(message); 
    console.log(message);
  }
});
