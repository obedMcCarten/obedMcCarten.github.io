// Función para limpiar los resultados
function clearResults() {
    document.getElementById('searchInput').value = ''; // Limpiar el input de búsqueda
    document.getElementById('results').innerHTML = ''; // Limpiar el contenedor de resultados
}


// Función para cargar el JSON y manejar la búsqueda
function search() {
    const searchQuery = document.getElementById('searchInput').value.toLowerCase();
    fetch('travel_recommendation_api.json')  // Asegúrate de que esta ruta sea correcta
        .then(response => {
            if (!response.ok) {
                throw new Error('Error fetching the JSON file');
            }
            return response.json();
        })
        .then(data => {
            const results = filterResults(data, searchQuery);
            displayResults(results);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Función para filtrar los resultados del JSON
function filterResults(data, query) {
    const results = [];

    // Filtrar países y ciudades
    data.countries.forEach(country => {
        country.cities.forEach(city => {
            if (city.name.toLowerCase().includes(query)) {
                results.push({
                    name: city.name,
                    imageUrl: city.imageUrl,
                    description: city.description
                });
            }
        });
    });

    // Filtrar templos
    data.temples.forEach(temple => {
        if (temple.name.toLowerCase().includes(query)) {
            results.push({
                name: temple.name,
                imageUrl: temple.imageUrl,
                description: temple.description
            });
        }
    });

    // Filtrar playas
    data.beaches.forEach(beach => {
        if (beach.name.toLowerCase().includes(query)) {
            results.push({
                name: beach.name,
                imageUrl: beach.imageUrl,
                description: beach.description
            });
        }
    });

    return results;
}

// Función para mostrar los resultados en la página
function displayResults(results) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // Limpiar resultados anteriores

    if (results.length > 0) {
        results.forEach(result => {
            const resultDiv = document.createElement('div');
            const name = document.createElement('h2');
            const image = document.createElement('img');
            const description = document.createElement('p');

            name.textContent = result.name;
            image.src = result.imageUrl;
            description.textContent = result.description;

            resultDiv.appendChild(name);
            resultDiv.appendChild(image);
            resultDiv.appendChild(description);

            resultsContainer.appendChild(resultDiv);


            resultsContainer.style.display = 'block'; 

        });
    } else {
        resultsContainer.innerHTML = '<p>No results found.</p>';
    }
}







// Esperar a que el DOM esté completamente cargado antes de asociar los eventos a los botones
document.addEventListener('DOMContentLoaded', () => {
    // Botón "Search"
    const searchButton = document.querySelector('.search-btn');
    searchButton.addEventListener('click', search);

    // Botón "Clear"
    const clearButton = document.querySelector('.clear-btn');
    clearButton.addEventListener('click', () => {
        // Limpiar el campo de entrada de búsqueda
        document.getElementById('searchInput').value = '';
        
        // Limpiar los resultados de la búsqueda
        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = '';


        resultsContainer.style.display = 'none';



    });
});
