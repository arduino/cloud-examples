# Arduino Cloud - Python MQTT client examples

This folder contains examples on how to use [Python](https://www.python.org) to interact with the Arduino Cloud MQTT broker service.

It uses the [paho Python client](https://eclipse.org/paho/clients/python/) library.

## Getting Started

 1. Make sure Python is installed, it can be downloaded from [here](https://www.python.org/downloads/).
 1. Run ``pip install paho-mqtt`` to install the paho Python client library.
 1. Login into https://cloud.arduino.cc with your Arduino account to view your MQTT credentials.

## Examples

### Subscriber

 1. Open [``subscriber.py``](subscriber.py) in a text editor.
 1. Update the ``username`` and ``password``, save the file.
 1. Run ``python subscriber.py``

Any messages sent to the subscribed topic will be printed out to the console.

### Publisher

 1. Open [``publisher.py``](publisher.py) in a text editor.
 1. Update the ``username`` and ``password``, save the file.
 1. Run ``python publisher.py``

To send a custom message, run with a parameter:

```sh
python publisher.py 0

python publisher.py 255
```

The first command will publish "0", while the second command will publish "255" to the topic.
 