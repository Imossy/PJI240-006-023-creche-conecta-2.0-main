// Inside script.js

// Select the container where you'll display the student list
const studentListContainer = document.getElementById('app');

// Function to fetch data from the API
async function getStudents() {
  try {
    const response = await fetch('http://localhost:8000/api/alunos'); 
    const data = await response.json();
    return data; // Assuming the API returns JSON data
  } catch (error) {
    console.error('Error fetching data:', error);
    return []; // Return an empty array in case of an error
  }
}

// Function to display the student list in the HTML
function displayStudents(students) {
  // Clear any existing content in the container
  studentListContainer.innerHTML = ''; 

  // Loop through the students and create list items
  students.forEach(student => {
    const listItem = document.createElement('li');
    listItem.textContent = `${student.nome_aluno} (ID: ${student.id})`; // Customize how you want to display student data
    studentListContainer.appendChild(listItem);
  });
}

// Call the functions to fetch and display data
getStudents()
  .then(students => {
    displayStudents(students);
  });