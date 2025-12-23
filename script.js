// Tableau pour stocker les devoirs
let homeworkList = [];

// Fonction pour ajouter un devoir
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskDate = document.getElementById('taskDate');
    
    if (taskInput.value.trim() === '' || taskDate.value === '') {
        alert('Veuillez remplir tous les champs !');
        return;
    }
    
    const task = {
        id: Date.now(), // ID unique
        text: taskInput.value,
        date: taskDate.value,
        completed: false
    };
    
    homeworkList.push(task);
    taskInput.value = '';
    taskDate.value = '';
    
    displayTasks();
    saveToLocalStorage();
}

// Fonction pour afficher les devoirs
function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    // Trier par date
    homeworkList.sort((a, b) => new Date(a.date) - new Date(b.date));
    
    homeworkList.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        
        const date = new Date(task.date);
        const formattedDate = date.toLocaleDateString('fr-FR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        li.innerHTML = `
            <div class="task-info">
                <strong>${task.text}</strong>
                <div class="task-date">📅 Pour le ${formattedDate}</div>
            </div>
            <button class="delete-btn" onclick="deleteTask(${task.id})">Supprimer</button>
        `;
        
        taskList.appendChild(li);
    });
}

// Fonction pour supprimer un devoir
function deleteTask(id) {
    if (confirm('Voulez-vous vraiment supprimer ce devoir ?')) {
        homeworkList = homeworkList.filter(task => task.id !== id);
        displayTasks();
        saveToLocalStorage();
    }
}

// Sauvegarder dans le navigateur
function saveToLocalStorage() {
    localStorage.setItem('homeworkList', JSON.stringify(homeworkList));
}

// Charger depuis le navigateur
function loadFromLocalStorage() {
    const saved = localStorage.getItem('homeworkList');
    if (saved) {
        homeworkList = JSON.parse(saved);
        displayTasks();
    }
}

// Exemples de devoirs pour débuter
homeworkList = [
    { id: 1, text: 'Maths - Exercices 1 à 5', date: '2024-01-15', completed: false },
    { id: 2, text: 'Français - Rédaction', date: '2024-01-18', completed: false },
    { id: 3, text: 'Histoire - Chapitre 3', date: '2024-01-20', completed: false }
];

// Au chargement de la page
window.onload = function() {
    loadFromLocalStorage();
    displayTasks();
};

