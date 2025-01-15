async function loadJSONData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error cargando el archivo ${url}: `, error);
        return {};
    }
}

function populateSelect(selectId, options) {
    const selectElement = document.getElementById(selectId);
    selectElement.innerHTML = ""; // Limpiar el <select>

    // Añadir la opción por defecto
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Seleccione una opción";
    selectElement.appendChild(defaultOption);

    // Añadir las opciones desde el JSON
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.id;
        optionElement.textContent = option.nombre;
        selectElement.appendChild(optionElement);
    });
}
// Función principal para cargar los datos de los JSON
async function loadFormData() {
    // Cargar los datos de los JSON desde la ruta actual
    const alergiasData = await loadJSONData('./JSON/alergias.json');
    const idiomasData = await loadJSONData('./JSON/idiomas.json');
    const profesionesData = await loadJSONData('./JSON/profesion.json');
    const ciudadesData = await loadJSONData('./JSON/ciudad-nacimiento.json');
    const estudiosData = await loadJSONData('./JSON/estudios.json');
    const direccionData = await loadJSONData('./JSON/direccion.json'); // Ruta actualizada


    // Llenar los selects
    populateSelect('alergias', alergiasData.alergias || []);
    populateSelect('idiomas-conocidos', idiomasData.idiomas || []);
    populateSelect('profesion', profesionesData.profesiones || []);
    populateSelect('ciudad-nacimiento', ciudadesData.ciudades || []);
    populateSelect('nivel-estudios-alcanzado', estudiosData.estudios || []);
    populateSelect('idiomas-estudiaos', idiomasData.idiomas || []);
    populateSelect('nivel-estudio-solicitado', estudiosData.estudios || []);
    populateSelect('pais', direccionData.direccion ? direccionData.direccion.map(d => ({ id: d.pais, nombre: d.pais })) : []);
    populateSelect('ciudad', direccionData.direccion ? direccionData.direccion.map(d => ({ id: d.ciudad, nombre: d.ciudad })) : []);
    populateSelect('poblacion', direccionData.direccion ? direccionData.direccion.map(d => ({ id: d.poblacion, nombre: d.poblacion })) : []);


    // Para los tutores, asignar los datos correspondientes
    populateSelect('profesion-tutor1', profesionesData.profesiones || []);
    populateSelect('profesion-tutor2', profesionesData.profesiones || []);
    populateSelect('ciudad-nacimiento-tutor1', ciudadesData.ciudades || []);
    populateSelect('ciudad-nacimiento-tutor2', ciudadesData.ciudades || []);
    populateSelect('lengua-materna-tutor1', idiomasData.idiomas || []);
    populateSelect('lengua-materna-tutor2', idiomasData.idiomas || []);
}

// Llamar a la función para cargar los datos
loadFormData();
