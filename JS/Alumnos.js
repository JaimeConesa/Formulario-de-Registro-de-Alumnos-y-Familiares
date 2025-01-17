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
class AlumnoBuilder{
    constructor(){
        this.reset();
    }
    reset() {
        this.nombre = null;
        this.apellidos = null;
        this.nif = null;
        this.lenguaMaterna = null;
        this.idiomasConocidos = []; // Inicializado como un array vacío
        this.familiar = null; // Esto puede ser un objeto complejo o una lista, dependiendo de tu diseño
        this.direccion = null; // Similar al atributo `familiar`
        this.datosAcademicos = null; // Aquí podrías inicializar un objeto vacío si tiene subatributos
        this.infoMedica = null; // Inicializar en null o un objeto vacío, según tu diseño
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
}