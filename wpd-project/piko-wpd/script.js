function toggleMode() {
    const body = document.body;
    const toggleBtn = document.querySelector('.toggle-mode');

    body.classList.toggle('light-mode');

    // Change icon based on mode
    if (body.classList.contains('light-mode')) {
        toggleBtn.textContent = '☀️';
    } else {
        toggleBtn.textContent = '🌙';
    }
}
