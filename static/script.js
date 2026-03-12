document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById('nameInput');
    const deleteBtn = document.getElementById('deleteBtn');

    if (nameInput && deleteBtn) {
        nameInput.addEventListener('input', function() {
            deleteBtn.disabled = true;
            deleteBtn.style.opacity = "0.5";
        });
    }
});