document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#contact-form form");
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const commentsField = document.getElementById("comments");
    const charCounter = document.getElementById("charCounter");
    const formErrorsField = document.getElementById("form-errors");

    const nameInvalidCharMsg = "Only letters and spaces are allowed.";
    const emailInvalidCharMsg = "Only letters, numbers, and @._%+- are allowed.";

    let form_errors = [];

    function logError(fieldId, errorMessage) {
        const errorObj = {
            field: fieldId,
            error: errorMessage,
            timestamp: new Date().toISOString()
        };
        form_errors.push(errorObj);
        formErrorsField.value = JSON.stringify(form_errors);
    }

    form.setAttribute("novalidate", true);

    function validateName() {
        nameField.setCustomValidity("");
        if (nameField.value.trim() === "") {
            nameField.setCustomValidity("Please enter your name.");
            logError("name", "Name field left empty.");
        } else if (!/^[a-zA-Z ]+$/.test(nameField.value)) {
            nameField.setCustomValidity("Only letters and spaces allowed in your name.");
            logError("name", "Name field contains illegal characters.");
        }
    }

    function validateEmail() {
        emailField.setCustomValidity("");
        if (emailField.value.trim() === "") {
            emailField.setCustomValidity("Please enter your email.");
            logError("email", "Email field left empty.");
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(emailField.value)) {
            emailField.setCustomValidity("Please enter a valid email address.");
            logError("email", "Email field contains an invalid email address.");
        }
    }

    nameField.addEventListener("input", validateName);
    emailField.addEventListener("input", validateEmail);

    form.addEventListener("submit", function (event) {
        validateName();
        validateEmail();
        if (!form.checkValidity()) {
            event.preventDefault();
            nameField.reportValidity();
            emailField.reportValidity();
        }
    });

    const allowedNameChar = /^[a-zA-Z ]$/;
    const allowedEmailChar = /^[a-zA-Z0-9@._%+\-]$/;

    function flashValidationLabel(field, message) {
        field.classList.add("flash");
        setTimeout(() => {
            field.classList.remove("flash");
            field.style.transition = "opacity 0.5s";
        }, 300);

        const label = document.querySelector(
            `label[for="${field.id}"].validation-label`
        );
        if (label) {
            label.textContent = message;
            label.style.display = "inline-block";
            label.style.opacity = 1;
        }
    }

    nameField.addEventListener("keydown", function (event) {
        if (event.key.length === 1 && !allowedNameChar.test(event.key)) {
            event.preventDefault();
            flashValidationLabel(nameField, nameInvalidCharMsg);
        }
    });

    emailField.addEventListener("keydown", function (event) {
        if (event.key.length === 1 && !allowedEmailChar.test(event.key)) {
            event.preventDefault();
            flashValidationLabel(
                emailField,
                emailInvalidCharMsg
            );
        }
    });

    nameField.addEventListener("paste", function (event) {
        const pasteData = event.clipboardData.getData("text");
        let filteredData = "";
        let illegalFound = false;
        for (let char of pasteData) {
            if (allowedNameChar.test(char)) {
                filteredData += char;
            } else {
                illegalFound = true;
            }
        }
        if (illegalFound) {
            event.preventDefault();
            flashValidationLabel(
                nameField,
                nameInvalidCharMsg
            );
            const start = nameField.selectionStart;
            const end = nameField.selectionEnd;
            const text = nameField.value;
            nameField.value = text.slice(0, start) + filteredData + text.slice(end);
        }
    });

    emailField.addEventListener("paste", function (event) {
        const pasteData = event.clipboardData.getData("text");
        let filteredData = "";
        let illegalFound = false;
        for (let char of pasteData) {
            if (allowedEmailChar.test(char)) {
                filteredData += char;
            } else {
                illegalFound = true;
            }
        }
        if (illegalFound) {
            event.preventDefault();
            flashValidationLabel(
                emailField,
                emailInvalidCharMsg
            );
            const start = emailField.selectionStart;
            const end = emailField.selectionEnd;
            const text = emailField.value;
            emailField.value = text.slice(0, start) + filteredData + text.slice(end);
        }
    });

    const maxChars = parseInt(commentsField.getAttribute("maxlength"), 10);
    charCounter.textContent = `0/${maxChars}`;

    commentsField.addEventListener("input", function () {
        charCounter.textContent = `${commentsField.value.length}/${maxChars}`;
        const remaining = maxChars - commentsField.value.length;
        if (remaining <= 50) {
            charCounter.style.color = "var(--error-color, #b50000)";
        } else {
            charCounter.style.color = "";
        }
    });
});
