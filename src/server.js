const app = require('./app')
const config = require('./configs/env');

const PORT = config.port || 5000;

(async () => {
    const serverIP = "localhost"; // config.serverIP || "localhost";

    app.listen(PORT, () => {
        console.log("=".repeat(50));
        console.log(`🚀 Server is running on http://${serverIP}:${PORT}`);
        console.log("=".repeat(50));
    })
})();
