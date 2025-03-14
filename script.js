// Function to adjust body padding based on header height
function adjustBodyPadding() {
  // Get the height of the header element
  let headerHeight = document.querySelector(".header").offsetHeight;
  
  // Set the body's top padding to match the header height
  document.body.style.paddingTop = headerHeight + "px";
}

// Adjust body padding when the page loads
window.onload = adjustBodyPadding;

// Adjust body padding when the window is resized
window.onresize = adjustBodyPadding;