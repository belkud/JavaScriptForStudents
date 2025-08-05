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

    




let users = await fetch('https://jsonplaceholder.typicode.com/users')
let all_users = document.querySelector('#all_users') as HTMLDivElement
let user_info = document.querySelector('#user_info') as HTMLDivElement

let user = await users.json()
console.log(user[0]);
for (let i = 0; i < user.length; i++) {
    all_users.innerHTML+= `<div class="user_names">${user[i].name}<div>`
}

let el = all_users.children
console.log(el);

for (let i = 0; i < el.length; i++) {
    el[i].addEventListener('click', (e)=> {
        user_info.innerHTML = JSON.stringify(user[i])
        console.log(e.target);
        
    })
}


// https://jsonplaceholder.typicode.com/users?id=2

//! https://jsonplaceholder.typicode.com/users

