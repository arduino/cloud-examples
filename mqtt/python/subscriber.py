import paho.mqtt.client as mqtt # https://eclipse.org/paho/clients/python/

server     = "mqtt.arduino.cc"
port       = 8883

# use the values shown after logging into https://cloud.arduino.cc
username   = "username"
password   = "password"
base_topic = "/" + username;
topic      = base_topic + "/001"


# The callback for when the client is connected to the broker
def on_connect(client, userdata, flags, rc):
    print("Connected with result: " + mqtt.connack_string(rc))

    # subscribe to the topic
    client.subscribe(topic)

# The callback for when the client is disconnected from the broker
def on_disconnect(client, userdata, rc):
    if rc != 0:
        print("Unexpected disconnection")

# The callback for when the client is subscribed to a topic
def on_subscribe(client, userdata, mid, granted_qos):
	print("Subscribed to topic: " + topic)

# The callback for when a message for a subscribed topic is received from the broker
def on_message(client, userdata, msg):
    print("Received message: " + msg.topic + " " + str(msg.payload))

# create a new MQTT client
client = mqtt.Client()

# configure CA cert for SSL connection
client.tls_set("arduino.cc.crt")

# set username and password
client.username_pw_set(username, password)

# assign callbacks
client.on_connect    = on_connect
client.on_disconnect = on_disconnect
client.on_subscribe  = on_subscribe
client.on_message    = on_message

# start connection
client.connect(server, port)

# let the client loop forever (this is a blocking call)
client.loop_forever()
