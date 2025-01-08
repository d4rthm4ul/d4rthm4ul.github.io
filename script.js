document.addEventListener('DOMContentLoaded', () => {
  tableau.extensions.initializeAsync().then(() => {
    // Attach click handler to the button
    const exportBtn = document.getElementById('exportButton');
    exportBtn.addEventListener('click', () => {
      alert('You clicked a button');
    });
  }).catch(err => {
    console.error('Error initializing the extension:', err);
  });
});
