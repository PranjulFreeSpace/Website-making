// components/header.js
if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
  fetch('/components/header.html') // Root-relative path for consistency
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return response.text();
    })
    .then(data => {
      const placeholder = document.getElementById('header-placeholder');
      if (!placeholder) throw new Error('Header placeholder not found');
      placeholder.innerHTML = data;
      
      // Page-specific titles
      const pageTitles = {
        '/Pages/anime/anime.html': '📺 Anime & Manga',
        '/Pages/books/books.html': '📚 Books',
        '/Pages/projects/projects.html': '🔧 Projects',
        '/Pages/extras/extras.html': '✨ Extras'
      };
      
      // Set the page title
      const currentPath = window.location.pathname;
      const title = pageTitles[currentPath] || 'Page Not Found';
      const titleElement = document.getElementById('page-title');
      if (titleElement) {
        titleElement.textContent = title;
      } else {
        console.warn('Page title element not found');
      }
    })
    .catch(error => {
      console.error('Error loading header:', error);
      const placeholder = document.getElementById('header-placeholder');
      if (placeholder) {
        placeholder.innerHTML = '<p>Failed to load navigation. Please try refreshing.</p>';
      }
    });
}