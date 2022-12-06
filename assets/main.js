
let total_alumnos = new Array();
function carga_notas(){
    let carga = 0;
    while(carga == 0){
        let nombre_alumno = prompt("Ingrese el nombre del alumno:");
    while((nombre_alumno == "" || nombre_alumno == null)){
        alert("El nombre no puede estar vacio");
        nombre_alumno = prompt("Ingrese el nombre del alumno:");    
    }
    if(nombre_alumno != ""){
        let nota_alumno = prompt("Ingrese la califación")
        let nota = parseInt(nota_alumno);
        while(nota < 0 || nota > 10 || isNaN(nota)){
            alert("Ingrese un número entre el 1 y el 10");
            nota_alumno = prompt("Ingrese la califación");
            nota = parseInt(nota_alumno);
            }
            total_alumnos.push({"Nombre": nombre_alumno, "Nota": nota});
            let pregunta = prompt("¿Desea cargar otro alumno? \n 1- Si \n 2- No");
            while(pregunta != "1" && pregunta != "2"){
                alert("Debe ingresar 1 o 2");
                pregunta = prompt("¿Desea cargar otro alumno? \n 1- Si \n 2- No");
            }
            if(pregunta == "2"){
                carga++;
                promedio_notas();
            }
        }
    }
    
}
function promedio_notas(){
    let cantidad = total_alumnos.length;
    let suma = 0;
    let texto_mejores = "";
    let mejor_nombre = "";
    let mejor_nota = 0; 
    for (let i = 0; i < cantidad; i++) {
        let x = 0;
        suma = suma + total_alumnos[i].Nota;
        if(total_alumnos[i].Nota > mejor_nota){
            mejor_nota = total_alumnos[i].Nota;
            mejor_nombre = total_alumnos[i].Nombre;
            texto_mejores = "El mejor alumno es: ";
            x = 1;
        }
        if(total_alumnos[i].Nota == mejor_nota && x == 0){
            mejor_nombre += ", " + total_alumnos[i].Nombre;
            texto_mejores = "Los mejores alumnos son: ";
        }
    }
    let resultado = suma / cantidad;
    alert("El promedio general entre los alumnos es de: " + resultado + "\n" + texto_mejores + mejor_nombre + " con una calificación de " + mejor_nota);
    
}
carga_notas();