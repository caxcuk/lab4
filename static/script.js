document.addEventListener("DOMContentLoaded", function() {
    const nameInput = document.getElementById('nameInput');
    const numberInput = document.getElementById('numberInput');
    const deleteBtn = document.getElementById('deleteBtn');

    if (nameInput && deleteBtn && numberInput) {
        nameInput.addEventListener('input', function() {
            deleteBtn.disabled = true;
            deleteBtn.style.opacity = "0.5";

        });
        numberInput.addEventListener('input', function() {
            deleteBtn.disabled = true;
            deleteBtn.style.opacity = "0.5";
        });
    }
});