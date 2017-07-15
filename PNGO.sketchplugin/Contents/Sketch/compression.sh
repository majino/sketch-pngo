#! /bin/bash

filePath=$1

pngcrush="./pngcrush -ow $1"
optipng="./optipng $1 -force"
pngquant="./pngquant $1 --ext=.png --force"

eval $pngcrush
eval $optipng
eval $pngquant
