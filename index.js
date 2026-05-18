const { exec } = require("child_process");
const fs = require("fs");
const http = require("http");

// Choreo එකෙන් දෙන Port එක ගන්නවා (Default 8080)
const PORT = process.env.PORT || 8080;

// නිකන් වෙබ් සර්වර් එකක් දුවවනවා Choreo එකට පේන්න
http.createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("VPN Server Running Successfully!");
}).listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
    startXray();
});

function startXray() {
    if (!fs.existsSync("./xray")) {
        console.log("Downloading Xray...");
        // GitHub Releases වලින් කෙලින්ම Binary එක බාගන්නවා
        exec("curl -L -o xray.zip https://github.com/XTLS/Xray-core/releases/latest/download/Xray-linux-64.zip && unzip -o xray.zip && chmod +x xray", (err) => {
            if (err) {
                console.error("Download failed:", err);
                return;
            }
            console.log("Xray Downloaded. Starting...");
            runXrayCore();
        });
    } else {
        runXrayCore();
    }
}

function runXrayCore() {
    const xray = exec("./xray run -config config.json");
    xray.stdout.on("data", (data) => console.log(data.toString()));
    xray.stderr.on("data", (data) => console.error(data.toString()));
}
