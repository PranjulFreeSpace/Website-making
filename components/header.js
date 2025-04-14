// components/header.js
document.addEventListener("DOMContentLoaded", function() {
  if (
    window.location.pathname !== "/Website-making/index.html" &&
    window.location.pathname !== "/Website-making/"
  ) {
    if (!document.body) {
      document.documentElement.innerHTML = "<p>Error: No document body found</p>";
      return;
    }
    
    const placeholder = document.getElementById("header-placeholder") || document.body;
    if (!placeholder) {
      document.body.innerHTML = "<p>Error: No header placeholder found</p>";
      return;
    }
    
    // Dynamically resolve relative path to header.html
    const headerURL = new URL("../../components/header.html", window.location.href);
    
    fetch(headerURL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Header file not found");
        }
        return response.text();
      })
      .then((data) => {
        placeholder.innerHTML = data;
        
        // Page-specific titles
        const pageTitles = {
          "anime.html": "📺 Anime & Manga",
          "books.html": "📚 Books",
          "projects.html": "🔧 Projects",
          "extras.html": "✨ Extras",
          "diary.html": "Diary",
        };
        
        const pathParts = window.location.pathname.split("/");
        const pageName = pathParts[pathParts.length - 1];
        
        const title = pageTitles[pageName] || "Page Not Found";
        const titleElement = document.getElementById("page-title");
        
        if (titleElement) {
          titleElement.textContent = title;
        } else {
          placeholder.innerHTML += "<p>Error: Title element missing</p>";
        }
      })
      .catch((error) => {
        placeholder.innerHTML = `<p>Error loading header: ${error.message}. Please try refreshing.</p>`;
      });
  }
});