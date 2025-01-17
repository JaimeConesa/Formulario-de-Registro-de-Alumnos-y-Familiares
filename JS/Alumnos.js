// Clase Alumno que almacena los datos de un alumno
class Alumno {
    /**
     * Constructor para crear una instancia de Alumno.
     * 
     * @param {string} nombre - El nombre del alumno.
     * @param {string} apellidos - Los apellidos del alumno.
     * @param {string} nif - El NIF del alumno.
     * @param {string} lenguaMaterna - La lengua materna del alumno.
     * @param {Array} idiomasConocidos - Idiomas conocidos por el alumno.
     * @param {Object} familiar - Información de un familiar del alumno.
     * @param {Object} direccion - Dirección del alumno.
     * @param {Object} datosAcademicos - Información académica del alumno.
     * @param {Object} infoMedica - Información médica del alumno.
     */
    constructor(nombre, apellidos, nif, lenguaMaterna, idiomasConocidos, familiar, direccion, datosAcademicos, infoMedica) {
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.nif = nif;
        this.lenguaMaterna = lenguaMaterna;
        this.idiomasConocidos = idiomasConocidos;
        this.familiar = familiar;
        this.direccion = direccion;
        this.datosAcademicos = datosAcademicos;
        this.infoMedica = infoMedica;
    }
}

// Clase AlumnoBuilder que implementa el patrón Builder para crear un objeto Alumno
class AlumnoBuilder {
    constructor() {
        this.reset(); // Inicializa los atributos a valores por defecto
    }

    /**
     * Restablece todos los atributos del builder a valores nulos o predeterminados.
     */
    reset() {
        this.nombre = null;
        this.apellidos = null;
        this.nif = null;
        this.lenguaMaterna = null;
        this.idiomasConocidos = []; // Inicializado como un array vacío
        this.familiar = null;
        this.direccion = null;
        this.datosAcademicos = null;
        this.infoMedica = null;
    }

    // Métodos para establecer los atributos del alumno (permite encadenamiento de métodos)
    setNombre(nombre) {
        this.nombre = nombre;
        return this; // Permite encadenamiento
    }

    setApellidos(apellidos) {
        this.apellidos = apellidos;
        return this;
    }

    setNif(nif) {
        this.nif = nif;
        return this;
    }

    setLenguaMaterna(lenguaMaterna) {
        this.lenguaMaterna = lenguaMaterna;
        return this;
    }

    setIdiomasConocidos(idiomas) {
        this.idiomasConocidos = idiomas;
        return this;
    }

    setFamiliar(familiar) {
        this.familiar = familiar;
        return this;
    }

    setDireccion(direccion) {
        this.direccion = direccion;
        return this;
    }

    setDatosAcademicos(datos) {
        this.datosAcademicos = datos;
        return this;
    }

    setInfoMedica(infoMedica) {
        this.infoMedica = infoMedica;
        return this;
    }

    /**
     * Construye un objeto Alumno con los datos establecidos en el builder.
     * 
     * @returns {Alumno} - Una nueva instancia de Alumno.
     */
    build() {
        const alumno = new Alumno(
            this.nombre,
            this.apellidos,
            this.nif,
            this.lenguaMaterna,
            this.idiomasConocidos,
            this.familiar,
            this.direccion,
            this.datosAcademicos,
            this.infoMedica
        );
        this.reset(); // Resetea el builder después de crear el objeto
        return alumno;
    }
}

// Evento que se ejecuta cuando el documento HTML ha sido completamente cargado
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-alumno"); // Obtiene el formulario

    // Evento para manejar el envío del formulario
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evita el comportamiento por defecto de enviar el formulario

        // Crear una instancia de AlumnoBuilder
        const builder = new AlumnoBuilder();

        // Recopilar datos del formulario y asignarlos al builder
        const alumno = builder
            .setNombre(document.getElementById("nombre-alumno").value)
            .setApellidos(document.getElementById("apellidos-alumno").value)
            .setNif(document.getElementById("nif-alumno").value)
            .setLenguaMaterna(document.getElementById("lengua-materna-alumno").value)
            .setIdiomasConocidos(
                Array.from(
                    document.getElementById("idiomas-conocidos-alumno").selectedOptions
                ).map((opt) => opt.value)
            )
            .setFamiliar({
                nombre: document.getElementById("nombre-familiar").value,
                apellidos: document.getElementById("apellidos-familiar").value,
                nif: document.getElementById("nif-familiar").value,
                profesion: document.getElementById("profesion").value,
                ciudadNacimiento: document.querySelector(".ciudad-nacimiento").value,
                lenguaMaterna: document.getElementById("lengua-materna-familiar").value,
                idiomasConocidos: Array.from(
                    document.getElementById("idiomas-conocidos-familiar").selectedOptions
                ).map((opt) => opt.value),
            })
            .setDireccion({
                pais: document.getElementById("pais").value,
                ciudad: document.getElementById("ciudad").value,
                poblacion: document.getElementById("poblacion").value,
                direccionCompleta: document.getElementById("direccion-completa").value,
                codigoPostal: document.getElementById("codigo-postal").value,
            })
            .setDatosAcademicos({
                colegioProcedencia: document.getElementById("colegio-procedencia").value,
                nivelEstudios: document.getElementById("nivel-estudios").value,
                idiomasEstudiados: Array.from(
                    document.getElementById("idiomas-estudiados").selectedOptions
                ).map((opt) => opt.value),
                nivelEstudioSolicitado: document.getElementById("nivel-estudio-solicitado").value,
            })
            .setInfoMedica({
                alergias: Array.from(
                    document.getElementById("alergias").selectedOptions
                ).map((opt) => opt.value),
                medicacionActual: document.getElementById("medicacion-actual").value,
            })
            .build();

        // Mostrar el resumen del alumno
        mostrarResumen(alumno);
    });
});

/**
 * Muestra un resumen del alumno en un modal.
 * 
 * @param {Alumno} alumno - El objeto Alumno con los datos a mostrar.
 */
function mostrarResumen(alumno) {
    const resumen = `
        <h3>Resumen del Alumno</h3>
        <p><strong>Nombre:</strong> ${alumno.nombre} ${alumno.apellidos}</p>
        <p><strong>NIF:</strong> ${alumno.nif}</p>
        <p><strong>Lengua Materna:</strong> ${alumno.lenguaMaterna}</p>
        <p><strong>Idiomas Conocidos:</strong> ${alumno.idiomasConocidos.join(", ")}</p>
        
        <h4>Familiar</h4>
        <p><strong>Nombre:</strong> ${alumno.familiar.nombre}</p>
        <p><strong>Apellidos:</strong> ${alumno.familiar.apellidos}</p>
        <p><strong>NIF:</strong> ${alumno.familiar.nif}</p>
        <p><strong>Profesión:</strong> ${alumno.familiar.profesion}</p>
        <p><strong>Ciudad de Nacimiento:</strong> ${alumno.familiar.ciudadNacimiento}</p>
        <p><strong>Lengua Materna:</strong> ${alumno.familiar.lenguaMaterna}</p>
        <p><strong>Idiomas Conocidos:</strong> ${alumno.familiar.idiomasConocidos.join(", ")}</p>
        
        <h4>Dirección</h4>
        <p><strong>País:</strong> ${alumno.direccion.pais}</p>
        <p><strong>Ciudad:</strong> ${alumno.direccion.ciudad}</p>
        <p><strong>Población:</strong> ${alumno.direccion.poblacion}</p>
        <p><strong>Dirección Completa:</strong> ${alumno.direccion.direccionCompleta}</p>
        <p><strong>Código Postal:</strong> ${alumno.direccion.codigoPostal}</p>
        
        <h4>Datos Académicos</h4>
        <p><strong>Colegio de Procedencia:</strong> ${alumno.datosAcademicos.colegioProcedencia}</p>
        <p><strong>Nivel de Estudios:</strong> ${alumno.datosAcademicos.nivelEstudios}</p>
        <p><strong>Idiomas Estudiados:</strong> ${alumno.datosAcademicos.idiomasEstudiados.join(", ")}</p>
        <p><strong>Nivel de Estudio Solicitado:</strong> ${alumno.datosAcademicos.nivelEstudioSolicitado}</p>
        
        <h4>Información Médica</h4>
        <p><strong>Alergias:</strong> ${alumno.infoMedica.alergias.join(", ")}</p>
        <p><strong>Medicación Actual:</strong> ${alumno.infoMedica.medicacionActual}</p>
    `;

    // Crear y mostrar el modal con el resumen
    const modal = document.createElement("div");
    modal.innerHTML = resumen;
    modal.style.display = "block";
    modal.style.padding = "20px"; 
    modal.style.backgroundColor = "#fff";
    modal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.width = "300px";
    modal.style.maxWidth = "90%";
    modal.style.fontSize = "12px";
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.zIndex = "1000";

    // Botón para cerrar el modal
    const btnClose = document.createElement("button");
    btnClose.innerText = "Cerrar";
    btnClose.style.marginTop = "10px";
    btnClose.addEventListener("click", () => {
        modal.style.display = "none"; // Cierra el modal
    });

    modal.appendChild(btnClose);
    document.body.appendChild(modal); // Agrega el modal al DOM
}