# Arduino Cloud - Node.js MQTT client examples

This folder contains examples on how to use [Node.js](https://nodejs.org/en/) to interact with the Arduino Cloud MQTT broker service.

It uses the [MQTT.js](https://github.com/mqttjs/MQTT.js) library.

## Getting Started

 1. Make sure Node.js is installed, it can be downloaded from [here](https://nodejs.org/en/download/).
 1. Run ``npm install`` in this folder to install the MQTT.js library.
 1. Login into https://cloud.arduino.cc with your Arduino account to view your MQTT credentials.

## Examples

### Subscriber

 1. Open [``subscriber.js``](subscriber.js) in a text editor.
 1. Update the ``username`` and ``password``, save the file.
 1. Run ``node subscriber.js``

Any messages sent to the subscribed topic will be printed out to the console.

### Publisher

 1. Open [``publisher.js``](publisher.js) in a text editor.
 1. Update the ``username`` and ``password``, save the file.
 1. Run ``node publisher.js``

To send a custom message, run with a parameter:

```sh
node publisher.js 0

node publisher.js 255
```

The first command will publish "0", while the second command will publish "255" to the topic
