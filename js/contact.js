document.addEventListener('DOMContentLoaded', () => {
  if (document.body.dataset.page !== 'contact') return;

  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();
    const successMessage = document.getElementById('contactSuccess');
    let valid = true;

    if (!name) {
      showError('name', 'Name is required.');
      valid = false;
    }

    if (!email) {
      showError('email', 'Email is required.');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showError('email', 'Please enter a valid email address.');
      valid = false;
    }

    if (!subject) {
      showError('subject', 'Subject is required.');
      valid = false;
    }

    if (!message) {
      showError('message', 'Message is required.');
      valid = false;
    }

    if (!valid) {
      if (successMessage) successMessage.textContent = '';
      return;
    }

    if (successMessage) {
      successMessage.textContent = 'Thank you! Your message has been sent successfully.';
    }
    form.reset();
  });

  function showError(fieldName, message) {
    const errorElement = document.querySelector(`[data-error-for="${fieldName}"]`);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  function clearErrors() {
    document.querySelectorAll('.error-message').forEach((element) => {
      element.textContent = '';
    });
  }
});
