document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const customThemeOptions = document.getElementById('custom-theme-options');
    const primaryColorInput = document.getElementById('primary-color');
    const secondaryColorInput = document.getElementById('secondary-color');
    const textColorInput = document.getElementById('text-color');
    const errorColorInput = document.getElementById('error-color');
    const tertiaryColorInput = document.getElementById('tertiary-color');

    // Load saved theme
    const selectedTheme = localStorage.getItem('theme') || 'light';
    const customTheme = localStorage.getItem('custom-theme');
    if (customTheme && selectedTheme === 'custom') {
        applyTheme(JSON.parse(customTheme));
    }

    if(!customTheme) {
        primaryColorInput.value = '#B3261E';
        secondaryColorInput.value = '#333';
        textColorInput.value = '#000';
        errorColorInput.value = '#b50000';
        tertiaryColorInput.value = '#f0f0f0';
    }

    themeSelect.addEventListener('change', () => {
        localStorage.setItem('theme', themeSelect.value);
        if (themeSelect.value === 'custom') {
            customThemeOptions.style.display = 'block';
            applyTheme(JSON.parse(localStorage.getItem('custom-theme')));
        } else {
            customThemeOptions.style.display = 'none';
            applyTheme({ name: themeSelect.value });
        }
    });

    const colorInputs = [primaryColorInput, secondaryColorInput, textColorInput, errorColorInput, tertiaryColorInput];
    colorInputs.forEach(input => {
        input.addEventListener('input', () => {
            const customTheme = {
                name: 'custom',
                primaryColor: primaryColorInput.value,
                secondaryColor: secondaryColorInput.value,
                textColor: textColorInput.value,
                errorColor: errorColorInput.value,
                tertiaryColor: tertiaryColorInput.value
            };
            applyTheme(customTheme);
            localStorage.setItem('custom-theme', JSON.stringify(customTheme));
        });
    });

    function applyTheme(theme) {
        if (theme.name === 'custom') {
            document.documentElement.style.setProperty('--main-color', theme.primaryColor);
            document.documentElement.style.setProperty('--secondary-color', theme.secondaryColor);
            document.documentElement.style.setProperty('--text-color', theme.textColor);
            document.documentElement.style.setProperty('--error-color', theme.errorColor);
            document.documentElement.style.setProperty('--tertiary-color', theme.tertiaryColor);
            document.documentElement.setAttribute('data-theme', 'custom');
        } else {
            document.documentElement.removeAttribute('data-theme');
            document.documentElement.style.removeProperty('--main-color');
            document.documentElement.style.removeProperty('--secondary-color');
            document.documentElement.style.removeProperty('--text-color');
            document.documentElement.style.removeProperty('--error-color');
            document.documentElement.style.removeProperty('--tertiary-color');
            document.documentElement.setAttribute('data-theme', theme.name);
        }
    }
});