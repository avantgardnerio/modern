mkdir -p data
rm -rf data/*
docker run \
    -v `pwd`:/workspace \
    -v `pwd`/data:/ORCL \
    -p 3000:3000 \
    -p 1521:1521 \
    -it modern /bin/bash -c "/home/oracle/setup/dockerInit.sh && bash"
