document.addEventListener('DOMContentLoaded', function () {
    let films = [];

    fetch('films.json')
        .then(response => response.json())
        .then(data => {
            films = data;
            renderTable(films);
        })
        .catch(error => console.error('Error loading data:', error));

    document.getElementById('search').addEventListener('input', function () {
        const searchTerm = this.value.toLowerCase();
        const filteredFilms = films.filter(film => film.title.toLowerCase().includes(searchTerm));
        renderTable(filteredFilms);
    });

    document.getElementById('sort').addEventListener('change', function () {
        const sortValue = this.value;
        let sortedFilms = [...films];

        switch (sortValue) {
            case 'title-asc':
                sortedFilms.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case 'title-desc':
                sortedFilms.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case 'year-asc':
                sortedFilms.sort((a, b) => a.release_year - b.release_year);
                break;
            case 'year-desc':
                sortedFilms.sort((a, b) => b.release_year - a.release_year);
                break;
            case 'revenue-asc':
                sortedFilms.sort((a, b) => a.box_office - b.box_office);
                break;
            case 'revenue-desc':
                sortedFilms.sort((a, b) => b.box_office - a.box_office);
                break;
        }

        renderTable(sortedFilms);
    });

    function renderTable(data) {
        const tbody = document.querySelector('#films-table tbody');
        tbody.innerHTML = '';

        data.forEach(film => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${film.title}</td>
                <td>${film.release_year}</td>
                <td>${film.director.join(', ') }</td>
                <td>$${film.box_office.toLocaleString()}</td>
                <td>${film.country}</td>
            `;
            tbody.appendChild(row);
        });
    }
});