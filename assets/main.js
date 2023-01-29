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
let select_subject = document.getElementById("subject");
let table_add = document.getElementById("table_add_students");
let table_list = document.getElementById("table_list_students");
let text_average = document.getElementById("general_average");
let best_quote = document.getElementById("best_quote");
let best_student = document.getElementById("best_student");
let option = "";
let data = "";
let list = "";
let students = new Array();
let subjectslist = "";

//Elementos para generar la estadistica
let n1 = 0;
let n2 = 0;
let n3 = 0;
let n4 = 0;
let n5 = 0;
let n6 = 0;
let n7 = 0;
let n8 = 0;
let n9 = 0;
let n10 = 0;

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
chargesubject();

//funciones 

function show_content(view){
    hide_buttons();
    switch(view){
        case 1:
            div_add.classList.remove("hide");
            students = new Array();
            data = "";
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
    let subject = document.getElementById("subject");
    if(name.value == "" || last_name.value == "" || parseInt(quote.value) == 0 || subject.value == ""){
        Swal.fire({
            icon: 'warning',
            title: 'Error',
            text: 'Faltan completar datos',
          })
          return false;
    }
    btn_save.classList.remove("hide");
    data += `<tr><td>${name.value} ${last_name.value}</td><td>${subject.value}</td><td>${quote.value}</td></tr>`;
    table_add.innerHTML = data;
    students.push({"name": name.value + " " + last_name.value, "subject": subject.value, "quote": quote.value});
    name.value = "";
    last_name.value = "";
    quote.value = "";
    subject.value = "";  
}

function save_student(view){
    list = JSON.parse(localStorage.getItem("students"));
    if(list && view == 1){
        students = list.concat(students);
    }
    let datos = JSON.stringify(students);
    localStorage.setItem("students", datos);
    if(view == 1){
        result = 'Los alumnos se han cargado correctamente.';
        table_add.innerHTML = "";
    }else if(view == 2){
        result = 'Los alumnos se han eliminado correctamente.';
        charge_list();
    }
    Swal.fire({
        icon: 'success',
        title: 'Perfecto',
        text: result,
    })
    list = JSON.parse(localStorage.getItem("students"));
    if(list == ""){
        btn_delete.classList.add("hide");
    }
}

function delete_student(){
    let check_name = "";
    let check_id = "";
    students = new Array();
    for(let i = 0; i < list.length; i++){
        check_name = "checkdelete_" + i;
        check_id = document.getElementById(check_name);
        if(!check_id.checked){
            students.push({"name": list[i].name, "subject": list[i].subject, "quote": list[i].quote});  
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
    let cantidad = "";
    if(list && list != ""){
        btn_delete.classList.remove("hide");
        cantidad = list.length;
    }else{
        btn_delete.classList.add("hide");
        cantidad = 0;
    }
    let tabla = "";
    let delete_id = "";
    for(let i = 0; i < cantidad; i++){
        delete_id = "checkdelete_" + i;
        tabla += `<tr><td>${list[i].name}</td><td>${list[i].subject}</td><td>${list[i].quote}</td><td class="text-center"><input class="form-check-input select" type="checkbox" id="${delete_id}"></td></tr>`;
    }
    table_list.innerHTML = tabla;
}

function general_average(){
    list = JSON.parse(localStorage.getItem("students"));
    if(list && list != ""){
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
    
    Swal.fire({
        html: '<div style="width: 5rem; height: 5rem;" class="spinner-border text-info" role="status"><span class="sr-only">Loading...</span></div><br><br><span>Generando gráfico, espere un segundo...</span>',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        allowOutsideClick: false
    });
    setTimeout(graphicGenerate, 1500)
}else{
    div_average.classList.add("hide");
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se ha cargado ningun alumno',
      })
      return false;
}
}

//Cargo las materias del archivo JSON
function chargesubject(){
    fetch('./data/subject.json')
    .then(data => data.json())
    .then(sub => {
        let db = sub.Subjects;
        subjectslist = new Array();
        for(let i = 0; i < db.length; i++){
            subjectslist.push({"subject": db[i].name}); 
        }
        //Doy medio segundo para que el array se genere correctamente
        setTimeout(push_select, 500)
    })
}

function push_select(){
    select_subject.disabled = false;
    for(let i = 0; i < subjectslist.length; i++){
    option = document.createElement('option');
    option.value = subjectslist[i].subject;
    option.innerHTML = subjectslist[i].subject;
    select_subject.appendChild(option);
}
}
function graphicGenerate(){
    Swal.close();
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);
    function drawChart(){
        list = JSON.parse(localStorage.getItem("students"));
    let cantidad = list.length;
    n1 = 0;
    n2 = 0;
    n3 = 0;
    n4 = 0;
    n5 = 0;
    n6 = 0;
    n7 = 0;
    n8 = 0;
    n9 = 0;
    n10 = 0;
    for (let i = 0; i < cantidad; i++) {
        let nota = parseInt(list[i].quote);
    switch(nota){
        case 1:
            n1++;
            break;
        case 2:
            n2++;
            break;
        case 3:
            n3++;
            break;
        case 4:
            n4++;
            break;
        case 5:
            n5++;
            break;
        case 6:
            n6++;
            break;
        case 7:
            n7++;
            break;
        case 8:
            n8++;
            break;
        case 9:
            n9++;
            break;
        case 10:
            n10++;
            break;
        default:
            break;
    }
    }
    let data = new google.visualization.DataTable();
    data.addColumn('string', 'Alumno');
    data.addColumn('number', 'Nota');data.addRows([
        
        ['1', n1],
        ['2', n2],
        ['3', n3],
        ['4', n4],
        ['5', n5],
        ['6', n6],
        ['7', n7],
        ['8', n8],
        ['9', n9],
        ['10', n10]
      ]);
      
      let options = {
      'title':'Estadistica general de notas',
      'width':'80%',
      'height':300,
      backgroundColor: '#E4E4E4',
      is3D: true };
      
      let chart = new google.visualization.PieChart(document.getElementById('chart'));
      chart.draw(data, options);
    }
}
