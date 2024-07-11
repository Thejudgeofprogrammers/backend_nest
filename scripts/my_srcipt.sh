#!/bin/bash

echo "hello"
container_names=($(docker ps -a | awk '{if(NR>1) print $NF}'))

for name in "${container_names[@]}"; do
	echo "$name"
done
