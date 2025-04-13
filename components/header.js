// components/header.js
// Only run this script on non-index pages
if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
  fetch('../../components/header.html') // Path from Pages/*/ to components/
    .then(response => response.text())
    .then(data => {
      document.getElementById('header-placeholder').innerHTML = data;

      // Define page-specific settings
      const pageSettings = {
        '/Pages/anime/anime.html': { title: '📺 Anime & Manga', exclude: 'anime' },
        '/Pages/books/books.html': { title: '📚 Books', exclude: 'books' },
        '/Pages/projects/projects.html': { title: '🔧 Projects', exclude: 'projects' },
        '/Pages/extras/extras.html': { title: '✨ Extras', exclude: 'extras' }
      };

      // Get current page path
      const currentPath = window.location.pathname;
      const settings = pageSettings[currentPath] || { title: 'Unknown Page', exclude: '' };

      // Set the page title
      document.getElementById('page-title').textContent = settings.title;

      // Remove the current page's link from the nav (skip Home link)
      const navList = document.getElementById('nav-list');
      const currentLink = navList.querySelector(`[data-page="${settings.exclude}"]`);
      if (currentLink) {
        currentLink.parentElement.remove(); // Remove the <li> containing the link
      }
    })
    .catch(error => console.error('Error loading header:', error));
}Changes