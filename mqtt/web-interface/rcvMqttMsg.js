// constants
var mqttBrokerURI      = "wss://mqtt.arduino.cc:9002/";
var mqttClientName     = "browser";
var mqttUsername       = "username";                  // your MQTT username
var mqttPassword       = "password";                  // your MQTT password
var mqttTopic          = "/" + mqttUsername + "/001"; // your MQTT topic /<username>/topic

// variable for slider value
var sliderValue = 0;

// wait for page to be reader
$(document).ready(function() {
  // initiliaze slider
  var mySlider = $('.slider').slider({
    disabled: true
  });

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
    client.subscribe(MQTTqueue);
    console.log("subscribed to " + MQTTqueue);
  }

  // attach event listeners to the slider
  $('.slider').on("slide", function(slideEvt) {
    switchTo(slideEvt.value);
    console.log("sliding");
  });

  $('.slider').on("slideStop", function(slideEvt) {
    switchTo(slideEvt.value);
    sendMessage(MQTTqueue, "" + slideEvt.value);
  });


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

  $("#buttonSwitch").click(function() {
    if ($("#buttonSwitch").hasClass("on")){
       switchoff();
       sendMessage(mqttTopic, "0");
     } else {
      switchOn();
      sendMessage(mqttTopic, "255");
    }
  });

  function switchOn() {
    $("#buttonSwitch").addClass("on").removeClass("off");
    $("#buttonSwitch").html("off");

    mySlider.slider('setValue', 255);

    $(".intensity").fadeTo( "fast" , 1)
  }

  function switchoff() {
    $("#buttonSwitch").addClass("off").removeClass("on");
    $("#buttonSwitch").html("on");

    mySlider.slider('setValue', 0);

    $(".intensity").fadeTo( "fast", 0)
  }

  function switchTo(val) {
    mySlider.slider('setValue', val);

    $(".intensity" ).fadeTo("fast" , val / 255);
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
