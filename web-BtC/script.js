var port, writer;
var is1on, is2on, is3on, is4on, is5on, is6on, is7on, is8on;

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("disCon").addEventListener("click", async () => {
        try {
            if (writer) {
                await writer.close();
            }
            if (port) {
                await port.close();
            }
            log("Disconnected successfully.");
        } catch (error) {
            log("Disconnection failed: " + error.message);
        }
    });

    document.getElementById("reCon").addEventListener("click", async () => {
        try {
            port = await navigator.serial.requestPort();
            await port.open({ baudRate: 9600, dataBits: 8, stopBits: 1, parity: "none" });
            writer = port.writable.getWriter();
            log("Connection: Success");
            setAllBtnFalse();
        } catch (error) {
            log("Connection Failed: " + error.message);
        }
    });

    setupButton("btn1", 65, 97);
    setupButton("btn2", 66, 98);
    setupButton("btn3", 67, 99);
    setupButton("btn4", 68, 100);
    setupButton("btn5", 69, 101);
    setupButton("btn6", 70, 102);
    setupButton("btn7", 71, 103);
    setupButton("btn8", 72, 104);
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

function setAllBtnFalse() {
    is1on = is2on = is3on = is4on = is5on = is6on = is7on = is8on = false;
}

function log(text) {
    document.getElementById("logs").innerHTML += `${text}\r\n`;
}

async function sendByte(byte) {
    if (!writer) {
        writer = port.writable.getWriter();
    }
    const data = new Uint8Array([byte]); // Convert to Uint8Array
    await writer.write(data);
}
