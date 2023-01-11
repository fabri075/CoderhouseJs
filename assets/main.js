//elementos de entrada
let div_add = document.getElementById("div_add_student");
let div_list = document.getElementById("div_list_student");
let btn_new = document.getElementById("new_student");
let btn_list = document.getElementById("list_student");
let btn_average = document.getElementById("average_student");
let btn_save = document.getElementById("save_student");
let input_quote = document.getElementById("quote_student");

//acciones de inputs y botones
input_quote.addEventListener("focusout", check_quote);
btn_save.addEventListener("click", save_student);
btn_new.addEventListener("click", () => show_content(1));
btn_list.addEventListener("click", () => show_content(2));
btn_average.addEventListener("click", () => show_content(3));

//funciones de entrada
hide_buttons();

//funciones 
function save_student(){
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
}

function show_new_student(){
    hide_buttons();
    div_add.classList.remove("hide");
}

function show_content(view){
    hide_buttons();
    switch(view){
        case 1:
            div_add.classList.remove("hide");
            break;
        case 2:
            div_list.classList.remove("hide");
            break;
        case 3:
            div_average.classList.remove("hide");
            break;
        default:
            break;
    }
}