//  Guest List Application
//  This application allows users to manage a list of guests, including adding, removing, and toggling attendance status.
//  It also displays the number of guests and their categories.

let guests = []; // Initial empty guest list
const MAX_GUESTS = 10; // Maximum number of guests allowed


function showGuests() { // Display the guest list
  const list = document.getElementById('list'); 
  const countSpan = document.getElementById('count'); 
  
  list.innerHTML = ''; // Clear the current list
  
  guests.forEach(guest => { // Create a list item for each guest
    const li = document.createElement('li');
    li.innerHTML = `                      
      <span class="${guest.category}">${guest.name} (${guest.category})</span> // Guest name and category
      <button onclick="toggleAttending(${guest.id})">
        ${guest.attending ? 'Attending' : 'Not Attending'}
      </button>
      <button onclick="removeGuest(${guest.id})">Delete</button> // Button to toggle attendance and delete guest
      <small>${formatTime(guest.time)}</small>    // Display the time the guest was added
    `;
    list.appendChild(li);
  });
  
  countSpan.textContent = `(${guests.length}/${MAX_GUESTS})`;   // Update the count of guests
  countSpan.className = guests.length >= MAX_GUESTS ? 'warning' : '';  // Change class if max guests reached
}

// Format time
function formatTime(date) {  // Format the time to a readable string
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Button functions
function toggleAttending(id) {          // Toggle the attendance status of a guest
  const guest = guests.find(g => g.id === id);
  if (guest) {
    guest.attending = !guest.attending;
    showGuests();
  }
}

function removeGuest(id) {               // Remove a guest from the list
  if (confirm('Delete this guest?')) {
    guests = guests.filter(g => g.id !== id);
    showGuests();
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {  // Wait for the DOM to load
  const form = document.getElementById('form');     // Get the form element
  
  form.addEventListener('submit', (e) => {    // Handle form submission
    e.preventDefault();
    const name = document.getElementById('name').value.trim(); // Get the name input
    const category = document.getElementById('category').value;  // Get the category input
    
    if (!name) return alert('Please enter a name');  // Validate name input
    if (guests.length >= MAX_GUESTS) return alert('Guest list full!'); // Check if max guests reached
    
    guests.push({     // Add a new guest to the list
      id: Date.now(),
      name,
      category,
      attending: true,
      time: new Date()
    });
    
    document.getElementById('name').value = '';  // Clear the name input
    showGuests();
  });
  
  showGuests(); // Initial display of guests
}); 