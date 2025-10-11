 // Dropdown toggle
document.getElementById("dd_button").addEventListener('click', function() {
  this.parentElement.classList.toggle('open');
});

// Close dropdown on outside click
document.addEventListener('click', function(e) {
  const dropdown = document.getElementById('dropdown');
  if (!dropdown.contains(e.target)) dropdown.classList.remove('open');
});

