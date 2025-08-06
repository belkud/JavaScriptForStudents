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








//! Реализовать веб-страницу «Каталог копирайтеров».

let user_info = document.querySelectorAll('table tr td:last-child') as any

async function tests() {
    
}

try {
    

let users = await fetch('https://jsonplaceholder.typicode.com/users')
let user = await users.json()

let all_users = document.querySelector('#all_users') as HTMLDivElement

for (let i = 0; i < user.length; i++) {
    all_users.innerHTML+= `<div>${user[i].name}<div>`
}

let users_name = all_users.children
console.log(users_name);

for (let i = 0; i < users_name.length; i++) {
    users_name[i].addEventListener('click', ()=> {

        user_info[0].innerHTML = `${user[i].name}</div>`
        user_info[1].innerHTML = `${user[i].username}</div>`
        user_info[2].innerHTML = `${user[i].address.city + ', ' + user[i].address.street}</div>`
        user_info[3].innerHTML = `${user[i].email}</div>`
        user_info[4].innerHTML = `${user[i].phone}</div>`
        user_info[5].innerHTML = `${user[i].website}</div>`
        // console.log(e.target);
    })
    
}

} catch (e) {
    console.log('Сервер не передал данные');
       
}

tests()
