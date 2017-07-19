#! /bin/bash
if [[ $# -eq 0 ]] ; then
    echo "Error: No argument supplied"
    exit 1
fi

filePath=$1

# [https://sourceforge.net/projects/pngnqs9/]
pngnq_s9="./pngnq-s9 -f -e '.png' $filePath"

# [https://github.com/pornel/pngquant]
pngquant="./pngquant $filePath --ext=.png --force --speed 1 --skip-if-larger"

# [https://github.com/google/zopfli/blob/master/README.zopflipng]
zopflipng="./zopflipng -m -y $filePath $filePath"

# [https://pmt.sourceforge.io/pngcrush/]
pngcrush="./pngcrush -rem alla -nofilecheck -reduce -m 7 -ow $filePath"

# [http://optipng.sourceforge.net]
optipng="./optipng -o2 -strip all -clobber $filePath"

echo "Using pngnq-s9…"
eval $pngnq_s9

# echo "Using pngquant2…"
# eval $pngquant

echo "Using zopflipng…"
eval $zopflipng

# echo "Using pngcrush…"
# eval $pngcrush

echo "Using optipng…"
eval $optipng
