class Alumno{
    constructor(nombre,apellidos,nif,lenguaMaterna,idiomasConocidos,familiar,direccion,datosAcademicos,infoMedica){
        this.nombre=nombre;
        this.apellidos=apellidos;
        this.nif=nif;
        this.lenguaMaterna=lenguaMaterna;
        this.idiomasConocidos=idiomasConocidos;
        this.familiar=familiar;
        this.direccion=direccion;
        this.datosAcademicos=datosAcademicos;
        this.infoMedica=infoMedica;

    }
}
class AlumnoBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.nombre = null;
        this.apellidos = null;
        this.nif = null;
        this.lenguaMaterna = null;
        this.idiomasConocidos = []; // Inicializado como un array vacío
        this.familiar = null; // Puede ser un objeto complejo o una lista
        this.direccion = null; // Similar al atributo `familiar`
        this.datosAcademicos = null; // Objeto vacío si tiene subatributos
        this.infoMedica = null; // Inicializar en null o un objeto vacío
    }

    setNombre(nombre) {
        this.nombre = nombre;
        return this; // Permitir el encadenamiento de métodos
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
        this.reset(); // Resetea el builder después de construir el objeto
        return alumno;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-alumno");

    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Evitar el envío del formulario por defecto

        // Crear instancia de AlumnoBuilder
        const builder = new AlumnoBuilder();

        // Recopilar datos del formulario
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
                ciudadNacimiento: document.querySelector(
                    ".ciudad-nacimiento"
                ).value,
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
                nivelEstudioSolicitado: document.getElementById(
                    "nivel-estudio-solicitado"
                ).value,
            })
            .setInfoMedica({
                alergias: Array.from(
                    document.getElementById("alergias").selectedOptions
                ).map((opt) => opt.value),
                medicacionActual: document.getElementById("medicacion-actual").value,
            })
            .build();

        // Mostrar resumen del alumno (opcional)
        mostrarResumen(alumno);
    });
});

/**
 * Función para mostrar el resumen del alumno.
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

    const modal = document.createElement("div");
    modal.innerHTML = resumen;
    modal.style.display = "block"; // Opcional: Estilizar el modal como prefieras
    modal.style.padding = "20px";
    modal.style.backgroundColor = "#fff";
    modal.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
    modal.style.position = "fixed";
    modal.style.top = "50%";
    modal.style.left = "50%";
    modal.style.width = "300px"; // Establecer un ancho más pequeño
    modal.style.maxWidth = "90%"; // Asegura que no se salga de la pantalla
    modal.style.transform = "translate(-50%, -50%)";
    modal.style.fontSize = "12px"; // Establecer un tamaño de texto más pequeño
    modal.style.lineHeight = "1.4"; // Espaciado de línea más compacto
    modal.style.zIndex = "1000";
    const closeButton = document.createElement("button");
    closeButton.textContent = "Cerrar";
    closeButton.style.marginTop = "10px";
    closeButton.addEventListener("click", () => {
        modal.remove(); // Elimina el modal al hacer clic en cerrar
    });

    modal.appendChild(closeButton);
    document.body.appendChild(modal);
}