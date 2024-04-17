document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('taxForm');
    const grossIncomeInput = document.getElementById('grossIncome');
    const extraIncomeInput = document.getElementById('extraIncome');
    const deductionsInput = document.getElementById('deductions');
    const ageSelect = document.getElementById('age');
    const grossIncomeError = document.getElementById('grossIncomeError');
    const extraIncomeError = document.getElementById('extraIncomeError');
    const deductionsError = document.getElementById('deductionsError');
    const resultsModal = document.getElementById('resultsModal');
    const taxResult = document.getElementById('taxResult');

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const grossIncome = parseFloat(grossIncomeInput.value);
        const extraIncome = parseFloat(extraIncomeInput.value);
        const deductions = parseFloat(deductionsInput.value);
        const age = ageSelect.value;

        // Perform validation
        if (isNaN(grossIncome) || grossIncome < 0) {
            displayError(grossIncomeError);
            return;
        }
        if (isNaN(extraIncome) || extraIncome < 0) {
            displayError(extraIncomeError);
            return;
        }
        if (isNaN(deductions) || deductions < 0) {
            displayError(deductionsError);
            return;
        }

        // Clear errors if validation passes
        hideError(grossIncomeError);
        hideError(extraIncomeError);
        hideError(deductionsError);

        // Calculate total income
        const totalIncome = grossIncome + extraIncome - deductions;

        // Calculate tax based on age and total income
        let tax = 0;
        if (totalIncome <= 800000) {
            tax = 0;
        } else if (age === 'below40') {
            tax = totalIncome * 0.3;
        } else if (age === '40to60') {
            tax = totalIncome * 0.4;
        } else {
            tax = totalIncome * 0.1;
        }

        // Display tax calculation results in modal
        taxResult.textContent = Tax to be paid: ${tax.toFixed(2)} INR;
        resultsModal.style.display = 'block';
    });

    // Close modal when close button is clicked
    const closeButton = document.querySelector('.close');
    closeButton.addEventListener('click', function () {
        resultsModal.style.display = 'none';
    });

    // Function to display error icon
    function displayError(element) {
        element.style.display = 'inline';
    }

    // Function to hide error icon
    function hideError(element) {
        element.style.display = 'none';
    }
});