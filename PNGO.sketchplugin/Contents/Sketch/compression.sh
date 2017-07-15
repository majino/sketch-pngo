#! /bin/bash

if [[ $# -eq 0 ]] ; then
    echo 'Error: No argument supplied'
    exit 1
fi

filePath=$1

pngcrush="./pngcrush -ow $filePath"
optipng="./optipng $filePath -force"
pngquant="./pngquant $filePath --ext=.png --force"

eval $pngcrush
eval $optipng
eval $pngquant
