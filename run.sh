mkdir -p data
rm -rf data/*
docker run \
    -v `pwd`:/workspace \
    -v `pwd`/data:/ORCL \
    -p 3000:3000 \
    -p 1521:1521 \
    -u 124:132 \
    -it modern /bin/bash -c "bash"
