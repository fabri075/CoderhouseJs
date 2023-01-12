//elementos de entrada
let div_add = document.getElementById("div_add_student");
let div_list = document.getElementById("div_list_student");
let div_average = document.getElementById("div_average_student");
let btn_new = document.getElementById("new_student");
let btn_list = document.getElementById("list_student");
let btn_average = document.getElementById("average_student");
let btn_add = document.getElementById("add_student");
let btn_save = document.getElementById("save_student");
let btn_delete = document.getElementById("delete_student");
let input_quote = document.getElementById("quote_student");
let table_add = document.getElementById("table_add_students");
let table_list = document.getElementById("table_list_students");
let text_average = document.getElementById("general_average");
let best_quote = document.getElementById("best_quote");
let best_student = document.getElementById("best_student");
let data = "";
let list = "";
let students = new Array();

//acciones de inputs y botones
input_quote.addEventListener("focusout", check_quote);
btn_add.addEventListener("click", add_student);
btn_save.addEventListener("click", () => save_student(1));
btn_delete.addEventListener("click", delete_student)
btn_new.addEventListener("click", () => show_content(1));
btn_list.addEventListener("click", () => show_content(2));
btn_average.addEventListener("click", () => show_content(3));

//funciones de entrada
hide_buttons();

//funciones 

function show_content(view){
    hide_buttons();
    switch(view){
        case 1:
            div_add.classList.remove("hide");
            break;
        case 2:
            div_list.classList.remove("hide");
            charge_list();
            break;
        case 3:
            div_average.classList.remove("hide");
            general_average();
            break;
        default:
            break;
    }
}

function add_student(){
    let name = document.getElementById("name_student");
    let last_name = document.getElementById("last_name_student");
    let quote = document.getElementById("quote_student");
    if(name.value == "" || last_name.value == "" || parseInt(quote.value) == 0){
        Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Faltan completar datos',
          })
          return false;
    }
    btn_save.classList.remove("hide");
    data += `<tr><td>${name.value} ${last_name.value}</td><td>${quote.value}</td></tr>`;
    table_add.innerHTML = data;
    students.push({"name": name.value + " " + last_name.value, "quote": quote.value});
    name.value = "";
    last_name.value = "";
    quote.value = "";  
}

function save_student(view){
    list = JSON.parse(localStorage.getItem("students"));
    if(list != "" && view == 1){
        students = list.concat(students);
    }
    let datos = JSON.stringify(students);
    localStorage.setItem("students", datos);
    if(view == 1){
        result = 'Los alumnos se han cargado correctamente.';
        table_add.innerHTML = "";
    }else if(view == 2){
        result = 'Los alumnos se han eliminado correctamente.';
    }
    Swal.fire({
        icon: 'success',
        title: 'Perfecto',
        text: result,
    })
    list = JSON.parse(localStorage.getItem("students"));
}

function delete_student(){
    let check_name = "";
    let check_id = "";
    students = new Array();
    for(let i = 0; i < list.length; i++){
        check_name = "checkdelete_" + i;
        check_id = document.getElementById(check_name);
        if(!check_id.checked){
            students.push({"name": list[i].name, "quote": list[i].quote});  
        }
    }
    save_student(2);
    document.querySelectorAll('#main_list_table .select:checked').forEach(e => {
        e.parentNode.parentNode.remove();
    });
}

function check_quote(){
    let quote = document.getElementById("quote_student");
    if(parseInt(quote.value) > 10){
        quote.value = 10;
    }
    if(parseInt(quote.value) < 1){
        quote.value = 1;
    }
}

function hide_buttons(){
    div_add.classList.add("hide");
    div_list.classList.add("hide");
    div_average.classList.add("hide");
}

function charge_list(){
    list = JSON.parse(localStorage.getItem("students"));
    let tabla = "";
    let delete_id = "";
    for(let i = 0; i < list.length; i++){
        delete_id = "checkdelete_" + i;
        tabla += `<tr><td>${list[i].name}</td><td>${list[i].quote}</td><td class="text-center"><input class="form-check-input select" type="checkbox" id="${delete_id}"></td></tr>`;
    }
    table_list.innerHTML = tabla;
}

function general_average(){
    list = JSON.parse(localStorage.getItem("students"));
    let cantidad = list.length;
    let suma = 0;
    let texto_mejores = "";
    let mejor_nombre = "";
    let mejor_nota = 0; 
    for (let i = 0; i < cantidad; i++) {
        let nota = parseInt(list[i].quote);
        let x = 0;
        suma = suma + nota;
        if(nota > mejor_nota){
            mejor_nota = nota;
            mejor_nombre = list[i].name;
            texto_mejores = "Mejor alumno: ";
            x = 1;
        }
        if(nota == mejor_nota && x == 0){
            mejor_nombre += ", " + list[i].name;
            texto_mejores = "Mejores alumnos: ";
        }
    }
    let resultado = suma / cantidad;
    resultado = (Math.round(resultado * 100) / 100).toFixed(2);
    text_average.innerHTML = "Promedio General: " + resultado;
    best_quote.innerHTML = "Calificación más alta: " + mejor_nota;
    best_student.innerHTML = texto_mejores + mejor_nombre;
}