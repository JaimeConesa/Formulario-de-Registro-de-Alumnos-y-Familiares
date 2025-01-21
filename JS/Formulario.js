document.addEventListener("DOMContentLoaded", () => {
    // Rutas a los archivos JSON
    const rutasJSON = {
        alergias: "../JSON/alergias.json",
        ciudades: "../JSON/ciudad-nacimiento.json",
        direccion: "../JSON/direccion.json",
        estudios: "../JSON/estudios.json",
        profesiones: "../JSON/profesion.json",
        idiomas: "../JSON/idiomas.json"
    };

    // Referencias a los selectores del HTML
    const profesion = document.getElementById("profesion");
    const profesion2 = document.getElementById("profesion-2");
    const pais = document.getElementById("pais");
    const ciudad = document.getElementById("ciudad");
    const poblacion = document.getElementById("poblacion");
    const nivelEstudios = document.getElementById("nivel-estudios");
    const nivelEstudiosSolicitado = document.getElementById("nivel-estudio-solicitado");
    const alergias = document.getElementById("alergias");

    // selectores para idiomas
    const idiomasEstudiados = document.getElementById("idiomas-estudiados");
    const lenguaMaternaAlumno = document.getElementById("lengua-materna-alumno");
    const idiomasConocidosAlumno = document.getElementById("idiomas-conocidos-alumno");
    const lenguaMaternaFamiliar = document.getElementById("lengua-materna-familiar");
    const idiomasConocidosFamiliar = document.getElementById("idiomas-conocidos-familiar");
    const lenguaMaternaFamiliar2 = document.getElementById("lengua-materna-familiar-2");
    const idiomasConocidosFamiliar2 = document.getElementById("idiomas-conocidos-familiar-2");

    // Llenar los selects específicos
    cargarYllenarSelect(rutasJSON.profesiones, profesion, "profesiones");
    cargarYllenarSelect(rutasJSON.profesiones, profesion2, "profesiones");
    cargarYllenarSelect(rutasJSON.estudios, nivelEstudios, "estudios");
    cargarYllenarSelect(rutasJSON.estudios, nivelEstudiosSolicitado, "estudios");
    cargarYllenarSelect(rutasJSON.alergias, alergias, "alergias", true);

    // llenados para idiomas
    cargarYllenarSelect(rutasJSON.idiomas, idiomasEstudiados, "idiomas", true);
    cargarYllenarSelect(rutasJSON.idiomas, lenguaMaternaAlumno, "idiomas");
    cargarYllenarSelect(rutasJSON.idiomas, idiomasConocidosAlumno, "idiomas", true);
    cargarYllenarSelect(rutasJSON.idiomas, lenguaMaternaFamiliar, "idiomas");
    cargarYllenarSelect(rutasJSON.idiomas, idiomasConocidosFamiliar, "idiomas", true);
    cargarYllenarSelect(rutasJSON.idiomas, lenguaMaternaFamiliar2, "idiomas");
    cargarYllenarSelect(rutasJSON.idiomas, idiomasConocidosFamiliar2, "idiomas", true);

    // Llenar automáticamente todos los selects de ciudades con la clase "ciudad-nacimiento"
    document.querySelectorAll(".ciudad-nacimiento").forEach((select) => {
        cargarYllenarSelect(rutasJSON.ciudades, select, "ciudades");
    });

    // Configurar selects anidados (País -> Ciudad -> Población)
    fetch(rutasJSON.direccion)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Error al cargar el archivo direccion.json");
            }
            return response.json();
        })
        .then((data) => {
            const paises = Array.from(new Set(data.direccion.map((item) => item.pais)));
            llenarSelect(pais, paises);

            pais.addEventListener("change", () => {
                const ciudades = data.direccion
                    .filter((item) => item.pais === pais.value)
                    .map((item) => item.ciudad);
                llenarSelect(ciudad, ciudades);

                ciudad.addEventListener("change", () => {
                    const poblaciones = data.direccion
                        .filter((item) => item.ciudad === ciudad.value)
                        .map((item) => item.poblacion);
                    llenarSelect(poblacion, poblaciones);
                });
            });
        })
        .catch((error) => {
            console.error("Error cargando los datos de direccion.json:", error);
        });

    // Validar el formulario al enviarlo
    document.getElementById("form-alumno").addEventListener("submit", (e) => {
        if (!validarFormulario()) {
            e.preventDefault(); // Evitar que se envíe el formulario si hay errores
        }
    });
});

/**
 * Valida el formulario antes de enviarlo.
 */
function validarFormulario() {
    let valido = true;

    // Validar campos obligatorios
    const camposObligatorios = document.querySelectorAll("[required]");
    camposObligatorios.forEach((campo) => {
        if (!campo.value.trim()) {
            alert(`El campo "${campo.name}" es obligatorio.`);
            valido = false;
        }
    });

    // Validación de NIF
    const nifAlumno = document.getElementById("nif-alumno").value;
    if (!validarNIF(nifAlumno)) {
        alert("El NIF no es válido.");
        valido = false;
    }
    const nifFamiliar = document.getElementById("nif-familiar").value;
    if (!validarNIF(nifFamiliar)) {
        alert("El NIF no es válido.");
        valido = false;
    }

    // Validación para el segundo familiar
    const nifFamiliar2 = document.getElementById("nif-familiar-2").value;
    if (nifFamiliar2 && !validarNIF(nifFamiliar2)) {
        alert("El NIF del segundo familiar no es válido.");
        valido = false;
    }

    // Validación de código postal
    const codigoPostal = document.getElementById("codigo-postal").value;
    if (!/^\d{5}$/.test(codigoPostal)) {
        alert("El código postal debe tener 5 dígitos numéricos.");
        valido = false;
    }

    return valido;
}

/**
 * Valida el formato de un NIF español (8 dígitos seguidos de una letra).
 */
function validarNIF(nif) {
    const nifPattern = /^\d{8}[A-Za-z]$/;
    return nifPattern.test(nif);
}

/**
 * Carga un archivo JSON y llena un <select> con sus datos.
 */
function cargarYllenarSelect(ruta, select, clave, multiple = false) {
    fetch(ruta)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Error al cargar el archivo ${ruta}`);
            }
            return response.json();
        })
        .then((data) => {
            const opciones = data[clave].map((item) => item.nombre);
            llenarSelect(select, opciones, multiple);
        })
        .catch((error) => {
            console.error(`Error cargando los datos del JSON (${ruta}):`, error);
        });
}

/**
 * Llena un <select> con las opciones proporcionadas.
 */
function llenarSelect(select, opciones, multiple = false) {
    select.innerHTML = ""; // Limpiar opciones existentes

    if (!multiple) {
        // Agregar opción por defecto
        const opcionDefault = document.createElement("option");
        opcionDefault.value = "";
        opcionDefault.disabled = true;
        opcionDefault.selected = true;
        opcionDefault.textContent = "Seleccione una opción";
        select.appendChild(opcionDefault);
    }

    opciones.forEach((opcion) => {
        const opt = document.createElement("option");
        opt.value = opcion;
        opt.textContent = opcion;
        select.appendChild(opt);
    });
}
