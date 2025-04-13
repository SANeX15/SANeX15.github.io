function toggleMode() {
    const body = document.body;
    body.classList.toggle('dark-mode');
    document.querySelector('.mode-toggle').textContent =
        body.classList.contains('dark-mode') ? '☀️' : '🌙';
}
