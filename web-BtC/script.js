var port, writer;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("disCon").addEventListener("click", async () => {
        try {
            if (writer) await writer.close();
            if (port) await port.close();
            log("Disconnected successfully.");
        } catch (error) {
            log("Disconnection failed: " + error.message);
        }
    });

    document.getElementById("reCon").addEventListener("click", async () => {
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600 });
            writer = port.writable.getWriter();
            log("Connection: Success");
        } catch (error) {
            log("Connection Failed: " + error.message);
        }
    });

    for (let i = 1; i <= 8; i++) {
        setupButton("btn" + i, 64 + i, 96 + i);
    }
});

function setupButton(id, onCode, offCode) {
    let button = document.getElementById(id);
    let isOn = false;
    button.addEventListener("click", async () => {
        sendByte(isOn ? offCode : onCode);
        isOn = !isOn;
        button.innerHTML = isOn ? "On" : "Off";
    });
}

function log(text) {
    document.getElementById("logs").innerHTML += `${text}\r\n`;
}

async function sendByte(byte) {
    if (!writer) writer = port.writable.getWriter();
    const data = new Uint8Array([byte]);
    await writer.write(data);
}

// THEME TOGGLE
const themeSwitch = document.getElementById("themeSwitch");

function setTheme(theme) {
    document.body.classList.toggle("light", theme === "light");
    localStorage.setItem("theme", theme);
}

function initTheme() {
    const stored = localStorage.getItem("theme");
    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    const theme = stored || (prefersLight ? "light" : "dark");
    themeSwitch.checked = (theme === "light");
    setTheme(theme);
}

themeSwitch.addEventListener("change", () => {
    const theme = themeSwitch.checked ? "light" : "dark";
    setTheme(theme);
});

initTheme();
