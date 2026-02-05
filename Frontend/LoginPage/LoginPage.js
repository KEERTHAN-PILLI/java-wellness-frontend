const nameRegex = /^[A-Za-z]+$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const demoOtp = "123456";

const form = document.getElementById("registerForm");

if (form) {
    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        let valid = true;

        const fn = firstName.value.trim();
        const ln = lastName.value.trim();
        const em = email.value.trim();
        const pw = password.value;
        const cpw = confirmPassword.value;

        firstNameError.innerText = lastNameError.innerText =
        emailError.innerText = passwordError.innerText =
        confirmPasswordError.innerText = "";

        if (!nameRegex.test(fn)) {
            firstNameError.innerText = "Only letters allowed";
            valid = false;
        }
        if (!nameRegex.test(ln)) {
            lastNameError.innerText = "Only letters allowed";
            valid = false;
        }
        if (!emailRegex.test(em)) {
            emailError.innerText = "Invalid email";
            valid = false;
        }
        if (pw.length < 6) {
            passwordError.innerText = "Minimum 6 characters";
            valid = false;
        }
        if (pw !== cpw) {
            confirmPasswordError.innerText = "Passwords do not match";
            valid = false;
        }

        if (valid) {
            const hashed = await hashPassword(pw);
            console.log("Hashed Password:", hashed);
            alert("Registration Successful!");
        }
    });
}

async function hashPassword(password) {
    const enc = new TextEncoder().encode(password);
    const hash = await crypto.subtle.digest("SHA-256", enc);
    return Array.from(new Uint8Array(hash)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function togglePassword(id) {
    const input = document.getElementById(id);
    input.type = input.type === "password" ? "text" : "password";
}

function showOtp() {
    document.getElementById("otpBox").style.display = "block";
    alert("OTP sent (Demo: 123456)");
}

function verifyOtp() {
    otpSuccess.innerText = otp.value === demoOtp ? "OTP Verified!" : "Invalid OTP";
}

function toggleDarkMode() {
    document.body.classList.toggle("dark");
}
