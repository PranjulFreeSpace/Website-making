// Function to adjust body padding based on header height
function adjustBodyPadding() {
  // Get the height of the header element
  let headerHeight = document.querySelector(".header").offsetHeight;
  
  // Set the body's top padding to match the header height
  document.body.style.paddingTop = headerHeight + "px";
}

// Use DOMContentLoaded instead of window.onload
document.addEventListener('DOMContentLoaded', adjustBodyPadding);

// Adjust body padding when the window is resized
window.onresize = adjustBodyPadding;

document.addEventListener("DOMContentLoaded", function () {
  const latestBlogContainer = document.getElementById("latest-blog");
  if (!latestBlogContainer) return;

  fetch("blogs/blogs.json")
    .then((res) => res.json())
    .then((blogs) => {
      if (!blogs.length) return;

      const latest = blogs[blogs.length - 1];
      latestBlogContainer.innerHTML = `
        <div class="blog-card" onclick="location.href='blogs/blog-template.html?slug=${latest.slug}'">
          <div class="blog-title">${latest.title}</div>
          <div class="blog-description">${latest.description}</div>
        </div>
      `;
    })
    .catch((err) => {
      console.error("Error loading latest blog:", err);
    });
});