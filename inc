#!/bin/bash

for x in {100..400}; do
    printf "GET /save?id=1&temp=$(shuf -i 20-35 -n 1)&wind=$(shuf -i 100-350 -n 1)&humid=$(shuf -i 50-100 -n 1)&water=$(shuf -i 50-100 -n 1) HTTP/1.0\r\n\r\n" | nc 127.0.0.1 80
	sleep 5
done
