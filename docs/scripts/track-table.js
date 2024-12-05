const form = document.getElementById('table-form');
const tableContainer = document.getElementById('table-container');

let tracks = [];

function generateTable() {
    tableContainer.innerHTML = `
        <div class="table-header">
            <div class="table-cell">№</div>
            <div class="table-cell">Название</div>
            <div class="table-cell">Жанр</div>
            <div class="table-cell">Рейтинг</div>
            <div class="table-cell"></div>
        </div>
    `;
    tracks.forEach((track, index) => {
        tableContainer.innerHTML += `
            <div class="table-row">
                <div class="table-cell">${index + 1}</div>
                <div class="table-cell">${track.name}</div>
                <div class="table-cell">${track.genre}</div>
                <div class="table-cell">${track.rating}</div>
                <div class="table-cell">
                    <button class="delete-button" data-index="${index}">&times;</button>
                </div>
            </div>
        `;
    });

    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach((button) =>
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            if (confirm(`Вы уверены, что хотите удалить "${tracks[index].name}"?`)) {
                tracks.splice(index, 1);
                generateTable();
            }
        })
    );

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
