import './style.css'

//! Задание с телефонным номером
let telephone_number = document.querySelector('#telephone_number') as HTMLInputElement
let clean_number = document.querySelector('#clean_number') as HTMLInputElement


telephone_number.addEventListener('keydown',(e:any)=> {
    let numbers = telephone_number.value.length
    if (Number(e.key)<=9) {
        if (numbers>=0 && numbers<=3) {
            telephone_number.value='+7 ('
        } else if(numbers==7) {
            telephone_number.value+= ') '
        } else if(numbers==12 || numbers==15) {
            telephone_number.value+='-'
        }   
    } else if (e.key !='Backspace' && e.key !='ArrowLeft' && e.key !='ArrowRight' && e.key !='Delete') {
        e.preventDefault()
    } 
})

clean_number.addEventListener('click', (e)=> {
    e.preventDefault()
    console.log(e);
    telephone_number.value=''
})



// //!!!!!!!!!!!!!!!!!! задание с поездом!!!!!!!!!!!!!!!!!!!!

let seats = document.querySelector('#seats') as HTMLDivElement
let tickets_chart = document.querySelector('#tickets_chart') as HTMLDivElement
let book = document.querySelector('#book') as HTMLInputElement
let total = document.querySelector('#total') as HTMLDivElement


for (let i = 0; i < seats.children.length; i++) {
  seats.children[i].innerHTML +=`
      <div>
      <input type="checkbox">
      <label></label>
      </div>
      <div>
        <input type="checkbox">
        <label></label>
        </div>
      <div>
        <input type="checkbox">
        <label></label>
        </div>
      <div>
      <input type="checkbox">
        <label></label>
      </div>
      `
      }




let tickets_label = seats.getElementsByTagName('label')
let tickets_input = seats.getElementsByTagName('input')

for (let i = 0; i < tickets_label.length; i++) {  
  tickets_input[i].name  = String(i+1)
  tickets_label[i].innerText  = String(i +1)
}
 

let data = document.querySelector('#data') as HTMLInputElement

let today = new Date()
data.value = `${today.getFullYear()}-${today.getMonth()+1< 10 ? 0 : ''}${today.getMonth()+1}-${today.getDate()<=9 ? 0 : ''}${today.getDate()}`


let directions = document.querySelector('#directions') as HTMLSelectElement


let totalAcc = 0 as any


book.addEventListener('click', (e)=> {
  e.preventDefault()
  
for (let i = 0; i < tickets_input.length; i++) {
      if (tickets_input[i].checked == true) {
  tickets_chart.innerHTML+= `<div>
  <div>${directions.value}</div>
  <div>${data.value.split('-').reverse().join('.')}</div>
  <div>${tickets_input[i].name}</div>
  </div>`
  totalAcc+=1*1600
  console.log('test');
  console.log(totalAcc);
  
    total.innerHTML = `Стоимость ${totalAcc==1600 ? 'билета' : 'билетов'} : ${totalAcc} рублей`
} 



//! пишем cookie
document.cookie = `общая стоимость ${totalAcc} долларов; max-age =50`

//! обнуляем Acc
setTimeout(() => {
    totalAcc=0  

//! чистим инпуты
    let inputs = document.querySelectorAll('input')
    inputs.forEach(el => {
  el.checked = false; 
})});

}})

console.log(data.value.split('-').reverse().join('.'));



//!!!!!!!!!!!!!!!!!! задание с поездом, завершение!!!!!!!!!!!!!!!!!!!!









//! Реализовать веб-страницу «Каталог копирайтеров».

let user_info = document.querySelectorAll('#user_info tr td:last-child') as any
let all_users = document.querySelector('#all_users') as HTMLDivElement
let user_table = document.querySelector('#user_info') as HTMLTableElement
let user_number = 0
let user_posts = document.querySelector('#user_posts') as HTMLDivElement
let show_posts = document.querySelector('#show_posts') as HTMLButtonElement

async function showUsers() {
 
try {
    let users = await fetch('https://jsonplaceholder.typicode.com/users')
    let user = await users.json()
    
    
for (let i = 0; i < user.length; i++) {
    all_users.innerHTML+= `<div>${user[i].name}<div>`
    
}

let users_name = all_users.children
// console.log(users_name);

for (let i = 0; i < users_name.length; i++) {
    users_name[i].addEventListener('click', ()=> {
        user_info[0].innerHTML = `${user[i].name}</div>`
        user_info[1].innerHTML = `${user[i].username}</div>`
        user_info[2].innerHTML = `${user[i].address.city + ', ' + user[i].address.street}</div>`
        user_info[3].innerHTML = `${user[i].email}</div>`
        user_info[4].innerHTML = `${user[i].phone}</div>`
        user_info[5].innerHTML = `${user[i].website}</div>`
        
        user_number= user[i].id
        console.log(user_number);
        user_posts.innerHTML=''
        show_posts.innerHTML = `Show ${String(user[i].name).split(' ')[0]}'s posts`
        user_table.style.display = 'block'
        show_posts.style.display = 'block'
    })
}

} catch (e) {
       all_users.innerHTML+= 'Сервер не передал данные (перезагрузите страницу)'
}
}


showUsers()




async function showUsersPost() {
        try {
let posts = await fetch('https://jsonplaceholder.typicode.com/posts')
let user_post = await posts.json()
show_posts.addEventListener('click', ()=> {
    for (let i = 0; i < user_post.length; i++) {
        if (JSON.stringify(user_post[i].userId) ==`${user_number}`) {
            user_posts.innerHTML+= `
            <div class="users_post">
                <div><b>${user_post[i].title}</b></div><br>
                <div>${user_post[i].body}</div>
            </div>`
          
        }
    }
})  

} catch (e) {
            console.log('Ошибка');
            user_posts.innerHTML = 'Ошибка данных'
        }
}

showUsersPost ()


//! Реализовать веб-страницу «Каталог копирайтеров», завершение






// JSON_container.scrollIntoView ({
//     block:'end',
//     behavior: 'smooth'
// })






let user_text = document.querySelector('#user_text') as HTMLTextAreaElement
let button_format_text = document.querySelector('#button_format_text') as HTMLButtonElement
let formated_text = document.querySelector('#formated_text') as HTMLDivElement 


let our_teams = [
    {"id": 1, "name": "Katya", "age": 30},
    {"id": 2, "name": "Tima", "age": 28},
    {"id": 3, "name": "Shlepa", "age": 23},
    {"id": 4, "name": "Cucaracha", "age": 26},
]

user_text.value = JSON.stringify(our_teams)


button_format_text.addEventListener('click',()=> {
    // let symb = user_text.value
    // for (let i = 0; i < symb.length; i++) {
    //     if (symb[i]=='a') {
    //         symb[i]=='9'
    //         console.log(symb[i]);
    //     }
        
    // }


    formated_text.innerHTML= user_text.value
    .replace('[', '<span class="margin2">[</span><br>')
    .replaceAll('{', '<span class="margin">{</span><br>')
    .replaceAll('}', '<br><span class="margin">}</span>')
    .replaceAll(',', ',<br>')
    .replace(']', '<br><span class="margin2">]</span>')

    
})






// let dataTest = await fetch ('https://jsonplaceholder.typicode.com/posts')
// console.log(await dataTest.json());














//! GITHUB!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
// let githube = await fetch(`https://api.github.com/users/Viktor-Gold`)
// console.log(githube);

// let profile = await githube.json()
// console.log(profile);





















 
fetch('http://localhost:5173/JavaScriptForStudents/')

//! в первой строке всегда получает статус
// .then((resp)=> resp.text())
// .then((data)=> console.log(data))




.then((resp)=> resp.blob())
.then((data)=>console.log(data))
.catch((error)=>console.log(error + 'Где-то ошибка'))
.finally(()=>console.log('finish'))



// if (resp.ok) {
//     console.log('успешно');
// } else {
//     console.log('Ошибка');
// }










