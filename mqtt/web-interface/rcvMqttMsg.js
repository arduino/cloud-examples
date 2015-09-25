// constants
var mqttBrokerURI      = "wss://mqtt.arduino.cc:9002/";
var mqttClientName     = "browser";
var mqttUsername       = "username";                  // your MQTT username
var mqttPassword       = "password";                  // your MQTT password
var mqttTopic          = "/" + mqttUsername + "/001"; // your MQTT topic /<username>/topic

// wait for page to be ready
document.addEventListener("DOMContentLoaded", function(event) {
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
    onSuccess: onConnect
  });

  // called when the client connects
  function onConnect() {
    // Once a connection has been made, subscribe to the topic.
    console.log("connected");
    client.subscribe(mqttTopic);
    console.log("subscribed to " + mqttTopic);
  }

  // called when the client loses it's connection
  function onConnectionLost(responseObject) {
    if (responseObject.errorCode !== 0) {
      console.log("connection lost:" + responseObject.errorMessage);
    }
  }

  function onMessageArrived(message) {
    console.log(message);
    console.log("new message arrived:" + message.payloadString);

    if (message.payloadString == 0 ) {
      switchoff();
    } else if (message.payloadString == 255) {
      switchOn();
    }
  }

  function switchOn() {
    document.querySelector('.intensity').classList.remove('fadeOut');
    document.querySelector('.intensity').classList.add('fadeIn');
  }

  function switchoff() {
    document.querySelector('.intensity').classList.remove('fadeIn');
    document.querySelector('.intensity').classList.add('fadeOut');
  }
});
