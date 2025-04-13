// components/header.js
if (window.location.pathname !== '/Website-making/index.html' && window.location.pathname !== '/Website-making/') {
  const placeholder = document.getElementById('header-placeholder') || document.body;
  if (!placeholder) {
    document.body.innerHTML = '<p>Error: No header placeholder found</p>';
    return;
  }
  
  try {
    // Use correct GitHub Pages path
    const response = await fetch('/Website-making/components/header.html');
    if (!response.ok) {
      throw new Error('Header file not found');
    }
    const data = await response.text();
    placeholder.innerHTML = data;
    
    // Page-specific titles
    const pageTitles = {
      '/Website-making/Pages/anime/anime.html': '📺 Anime & Manga',
      '/Website-making/Pages/books/books.html': '📚 Books',
      '/Website-making/Pages/projects/projects.html': '🔧 Projects',
      '/Website-making/Pages/extras/extras.html': '✨ Extras'
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
    placeholder.innerHTML = `<p>Error loading header: ${error.message}. Please try refreshing.</p>`;
  }
}