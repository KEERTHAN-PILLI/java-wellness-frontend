const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const demoOtp = "123456";

document.getElementById("registerForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let valid = true;

    const firstName = document.getElementById("firstName").value.trim();
    const lastName = document.getElementById("lastName").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    document.getElementById("firstNameError").innerText = "";
    document.getElementById("lastNameError").innerText = "";
    document.getElementById("emailError").innerText = "";
    document.getElementById("passwordError").innerText = "";
    document.getElementById("confirmPasswordError").innerText = "";

    if (!nameRegex.test(firstName)) {
        document.getElementById("firstNameError").innerText = "Only letters allowed";
        valid = false;
    }

    if (!nameRegex.test(lastName)) {
        document.getElementById("lastNameError").innerText = "Only letters allowed";
        valid = false;
    }

    if (!emailRegex.test(email)) {
        document.getElementById("emailError").innerText = "Invalid email format";
        valid = false;
    }

    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Minimum 6 characters required";
        valid = false;
    }

    if (password !== confirmPassword) {
        document.getElementById("confirmPasswordError").innerText = "Passwords do not match";
        valid = false;
    }

    if (valid) {
        const hashedPassword = await hashPassword(password);
        console.log("Hashed Password:", hashedPassword);
        alert("Registration Successful!");
    }
});

async function hashPassword(password) {
    const encoder = new TextEncoder();
    const data = encoder.encode(password);
    const hashBuffer = await crypto.subtle.digest("SHA-256", data);
    return Array.from(new Uint8Array(hashBuffer))
        .map(b => b.toString(16).padStart(2, '0'))
        .join('');
}

function showOtp() {
    document.getElementById("otpBox").style.display = "block";
    alert("OTP sent to Email/Mobile (Demo OTP: 123456)");
}

function verifyOtp() {
    const otp = document.getElementById("otp").value;
    const msg = document.getElementById("otpSuccess");

    if (otp === demoOtp) {
        msg.innerText = "OTP Verified! You can reset password.";
        msg.style.color = "green";
    } else {
        msg.innerText = "Invalid OTP";
        msg.style.color = "red";
    }
}
