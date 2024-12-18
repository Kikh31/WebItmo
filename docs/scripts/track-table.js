const form = document.getElementById('table-form');
const tableContainer = document.getElementById('table-container');

let tracks = [];

function createElement(tag, className, text = '') {
    const element = document.createElement(tag);
    if (className) element.classList.add(className);
    if (text) element.textContent = text;
    return element;
}

function generateTable() {
    tableContainer.replaceChildren()

    const headerRow = createElement('div', 'table-header');
    ['№', 'Название', 'Жанр', 'Рейтинг', 'Удаление'].forEach((text) => {
        headerRow.appendChild(createElement('div', 'table-cell', text));
    });
    tableContainer.appendChild(headerRow);

    // Создаем строки таблицы
    tracks.forEach((track, index) => {
        const row = createElement('div', 'table-row');

        // Создаем ячейки
        row.appendChild(createElement('div', 'table-cell', index + 1)); // Номер
        row.appendChild(createElement('div', 'table-cell', track.name)); // Название
        row.appendChild(createElement('div', 'table-cell', track.genre)); // Жанр
        row.appendChild(createElement('div', 'table-cell', track.rating)); // Рейтинг

        // Кнопка удаления
        const deleteCell = createElement('div', 'table-cell');
        const deleteButton = createElement('button', 'delete-button', '×');
        deleteButton.dataset.index = index;

        deleteButton.addEventListener('click', () => {
            if (confirm(`Вы уверены, что хотите удалить "${track.name}"?`)) {
                tracks.splice(index, 1);
                generateTable();
            }
        });

        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tableContainer.appendChild(row);
    });

    saveData();
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('track-name').value;
    const genre = document.getElementById('track-genre').value;
    const rating = document.getElementById('track-rating').value;

    tracks.push({ name, genre, rating });
    generateTable();
    form.reset();
});

function saveData() {
    localStorage.setItem('tracks', JSON.stringify(tracks));
}

function loadData() {
    const savedTracks = localStorage.getItem('tracks');
    if (savedTracks) {
        tracks = JSON.parse(savedTracks);
        generateTable();
    }
}

window.addEventListener('DOMContentLoaded', loadData);
