
let total_alumnos = new Array();
//let button = document.getElementById("action_button");

//Paso un parametro para saber si entra a la funcion por primera vez, o entra nuevamente luego de cargar por primera vez alumnos
function carga_notas(entrada){
    let carga = 0;
    while(carga == 0){
        let nombre_alumno = prompt("Ingrese el nombre del alumno:");
    while((nombre_alumno == "" || nombre_alumno == null)){
        //En caso de que se arrepienta de cargar nuevos alumnos ya habiendo cargado antes lo dejo volver al prompt de acciones
        if(entrada == 0){
        alert("El nombre no puede estar vacio");
        nombre_alumno = prompt("Ingrese el nombre del alumno:");
        }else{
            carga++;
            nombre_alumno == "Volver";
            acciones_notas();
            return false;
        }    
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
                acciones_notas();
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
    resultado = (Math.round(resultado * 100) / 100).toFixed(2);
    alert("El promedio general entre los alumnos es de: " + resultado + "\n" + texto_mejores + mejor_nombre + " con una calificación de " + mejor_nota);
    acciones_notas();
}

function acciones_notas(){
    let action_list = prompt("¿Qué desea hacer a continuación? \n 1- Cargar nuevos alumnos \n 2- Buscar alumnos \n 3- Promedio general \n 4- Finalizar");
    while(action_list != "1" && action_list != "2" && action_list != "3" && action_list != "4"){
        alert("Respuesta invalida");
        action_list = prompt("¿Qué desea hacer a continuación? \n 1- Cargar nuevos alumnos \n 2- Buscar alumnos \n 3- Promedio general \n 4- Finalizar");
    }
    if(action_list == "1"){
        carga_notas(1);
    }else if(action_list == "2"){
        buscador();
    }else if(action_list == "3"){
        promedio_notas();
    }else {
        return false;
    }
}

function buscador(){
    let busqueda = prompt("¿Cómo desea hacer la busqueda? \n 1- Alumnos \n 2- Notas \n 3- Cancelar");
    while(busqueda != "1" && busqueda != "2" && busqueda != "3"){
        alert("Respuesta invalida");
        busqueda = prompt("¿Cómo desea hacer la busqueda? \n 1- Alumnos \n 2- Notas \n 3- Cancelar");
    }
    if(busqueda == "3"){
        acciones_notas();
    }else{
        busca_alumnos(busqueda);
    }
}
//Tipo 1 = busqueda por alumnos - Tipo 2 = Busqueda por notas
function busca_alumnos(tipo){
    let encontrados = "";
    if(tipo == "1"){
        let nombre = prompt("Escriba el nombre que desea buscar");
        while (nombre == ""){
            alert("Ingrese un nombre");
            nombre = prompt("Escriba el nombre que desea buscar");
        }
        encontrados = total_alumnos.filter((user) => user.Nombre.includes(nombre));
        let cantidad = encontrados.length;
        let alumnos = "";
        encontrados.forEach(element => {
            alumnos = alumnos + element.Nombre + " - Nota: " + element.Nota + "\n";
        });
        alert("Se encontraron "+ cantidad + " alumno/s \n" + alumnos);
    }else if(tipo == "2"){
        let operacion = prompt("¿Que notas desea buscar? \n 1- Iguales a \n 2- Mayores a \n 3- Iguales a");
        while(operacion != "1" && operacion != "2" && operacion != "3"){
            alert("Respuesta invalida");
            operacion = prompt("¿Que notas desea buscar? \n 1- Iguales a \n 2- Mayores a \n 3- Iguales a");
        }
    }
}

carga_notas(0);