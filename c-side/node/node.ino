// network
# include <Dhcp.h>
# include <Dns.h>
# include <Ethernet.h>
# include <EthernetClient.h>
# include <EthernetServer.h>
# include <EthernetUdp.h>

// C libraries
# include <stdio.h>
# include <string.h>


// server info
IPAddress server (192, 168, 1, 1);
char *host_header="Host: 192.168.1.1\r\n";
# define SERVER_PORT 80

// client info
EthernetClient client;
# define DEVID 1

// transmission parameters
# define BUFFLEN 200
char buff[BUFFLEN]="";

// transmission data containers
float	waterlevel=0.0,
		wind=0.0,
		humidity=0.0,
		temperature=0.0;

// byte mac[] = {  0x98, 0x4F, 0xEE, 0x01, 0xCA, 0x28 };

void setup ()
{
	Serial.begin(9600);
	while (!Serial) {;}	// wait till serial port connects

//        if (Ethernet.begin(mac) == 0) {
//          Serial.println("Failed to configure Ethernet using DHCP");
//          // no point in carrying on, so do nothing forevermore:
//          for(;;)
//            ;
//        } else {
//          Serial.println("Eth begin (mac) != 0");
//        }

        delay (4000);
        Serial.println("Configuring IP...");
        system("telnetd -l /bin/sh");
        system("ifconfig eth0 192.168.1.2 netmask 255.255.255.0 up");
//        system("ifup eth0");
        
	delay (0000);	// wait till openning up a serial monitor
        Serial.println("Configured IP");
        Serial.println(Ethernet.localIP());
	Serial.println("Starting the node...");
}

void loop ()
{
	// data acquisition
	getTemperature();
	getWind();
	getHumitdity();
	getWaterLevel();

        Serial.println("Attempting transmission...");
	transmit();

	// acquisition period
	delay(1000);	// [] to be increased
}

void transmit ()
{
	if (client.connect(server, SERVER_PORT))
	{
		Serial.println("Connected.");

		// data to transmit
		//buff='';
		snprintf(buff, BUFFLEN,
			"GET /save?id=%d&temp=%.4f&wind=%.4f&humid=%.4f&water=%.4f HTTP/1.0\r\n",
			DEVID,
			temperature, wind, humidity, waterlevel
		);

		// transmission
		client.print(buff);
		client.print(host_header);
		client.print("User-Agent: arduino-ethernet\r\n");
		client.print("Connection: close\r\n");
		client.print("\r\n");

		Serial.println("Transmitted.");
	}else {
                Serial.println("Failed to connect.");
        }
        client.stop();

	// transmission period
	delay(2000);	// [] to be increased
}

void getTemperature ()
{
	temperature=20.0;
}

void getWind ()
{
	wind=20.0;
}

void getHumitdity ()
{
	humidity=20.0;
}

void getWaterLevel ()
{
	waterlevel=20.0;
}
