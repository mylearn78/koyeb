FROM ubuntu:latest

RUN apt-get update && apt-get install -y curl unzip

RUN curl -L -o /tmp/xray.zip https://github.com/XTLS/Xray-core/releases/latest/download/Xray-linux-64.zip && \
    mkdir -p /usr/local/bin /usr/local/etc/xray && \
    unzip /tmp/xray.zip -d /usr/local/bin && \
    rm /tmp/xray.zip

COPY config.json /usr/local/etc/xray/config.json

# SnapDeploy සඳහා 3000 පෝට් එක විවෘත කිරීම
EXPOSE 3000

CMD ["/usr/local/bin/xray", "run", "-config", "/usr/local/etc/xray/config.json"]
