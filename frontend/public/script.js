document.addEventListener('DOMContentLoaded', () => {
  const budgetSlider = document.getElementById('budget-range');
  const budgetLabel = document.getElementById('budget-label');

  if (budgetSlider && budgetLabel) {
      budgetSlider.addEventListener('input', () => {
          const budgetValue = `$${budgetSlider.value}`;
          budgetLabel.textContent = `Enter Budget: ${budgetValue}`;
          budgetSlider.setAttribute('aria-valuetext', budgetValue);
      });
  }

  const inviteButton = document.getElementById('invite-friends');
  const privacySettings = document.getElementById('privacy-settings');

  if (inviteButton && privacySettings) {
      inviteButton.addEventListener('click', () => {
          const isHidden = privacySettings.style.display === 'none';
          privacySettings.style.display = isHidden ? 'block' : 'none';
          inviteButton.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });
  }
});
