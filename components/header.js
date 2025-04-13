// components/header.js
if (window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
  const placeholder = document.getElementById('header-placeholder') || document.body;
  try {
    // Try multiple paths
    let response = await fetch('/components/header.html');
    if (!response.ok) {
      response = await fetch('../components/header.html'); // Fallback path
    }
    if (!response.ok) {
      throw new Error('Header file not found');
    }
    const data = await response.text();
    
    if (!placeholder) {
      throw new Error('No placeholder or body found');
    }
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
      placeholder.innerHTML += '<p>Error: Title element missing</p>';
    }
  } catch (error) {
    placeholder.innerHTML = `<p>Error loading header: ${error.message}. Try refreshing.</p>`;
  }
}