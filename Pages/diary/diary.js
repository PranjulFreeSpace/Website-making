// Fetch JSON data and initialize the diary
async function loadDiary(date = null) {
  try {
    const response = await fetch('diary.json');
    if (!response.ok) throw new Error('Failed to load diary data');
    
    const data = await response.json();
    
    // Populate dropdown only once
    if (!document.getElementById('date-select').options.length) {
      populateDropdown(data.entries);
    }
    
    // Find the index of the current date
    let currentIndex = date ?
      data.entries.findIndex(entry => entry.date === date) :
      data.entries.length - 1;
    
    if (currentIndex === -1) currentIndex = data.entries.length - 1;
    
    const entry = data.entries[currentIndex];
    
    // Load the markdown content dynamically
    await renderMarkdown(entry.file, entry.title, entry.date);
    
    // Update the dropdown value
    document.getElementById('date-select').value = entry.date;
    
    // Handle navigation
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    
    prevBtn.onclick = () => {
      if (currentIndex > 0) loadDiary(data.entries[currentIndex - 1].date);
    };
    
    nextBtn.onclick = () => {
      if (currentIndex < data.entries.length - 1) loadDiary(data.entries[currentIndex + 1].date);
    };
    
    // Dropdown navigation
    document.getElementById('date-select').onchange = (event) => {
      loadDiary(event.target.value);
    };
    
  } catch (error) {
    console.error('Error loading diary:', error);
    document.getElementById('diary-content').innerHTML = `<p>Failed to load diary.</p>`;
  }
}

// Function to render MD content
async function renderMarkdown(mdFile, title, date) {
  try {
    const response = await fetch(mdFile);
    if (!response.ok) throw new Error('Failed to load Markdown file');
    
    const mdText = await response.text();
    const htmlContent = marked.parse(mdText);
    
    // Render the content
    document.getElementById('diary-content').innerHTML = `
      <h2>${title}</h2>
      <p><strong>${date}</strong></p>
      <div>${htmlContent}</div>
    `;
    
  } catch (error) {
    console.error('Error rendering Markdown:', error);
    document.getElementById('diary-content').innerHTML = `<p>Failed to load content.</p>`;
  }
}

// Function to populate the dropdown with valid dates
function populateDropdown(entries) {
  const dropdown = document.getElementById('date-select');
  
  entries.forEach(entry => {
    const option = document.createElement('option');
    option.value = entry.date;
    option.textContent = entry.date;
    dropdown.appendChild(option);
  });
}

// Initialize the diary on page load
document.addEventListener('DOMContentLoaded', () => loadDiary());