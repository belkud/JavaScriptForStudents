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
    
  console.log(...user[0] )
    
for (let i = 0; i < user.length; i++) {
    all_users.innerHTML+= `<div>${user[i].name}<div>`
    
}

let users_name = all_users.children

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
    console.log('Сервер не передал данные');
       all_users.innerHTML+= 'Сервер не передал данные (перезагрузите страницу)'
}
}


showUsers()




async function showUsersPost() {
        try {
let show_posts = document.querySelector('#show_posts') as HTMLButtonElement
let posts = await fetch('https://jsonplaceholder.typicode.com/posts')
let user_post = await posts.json()
show_posts.addEventListener('click', ()=> {
    for (let i = 0; i < user_post.length; i++) {
        if (JSON.stringify(user_post[i].userId) ==`${user_number}`) {
            
            console.log(user_post[i]);
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




show_posts.scrollIntoView ({
    block:'center',
    // behavior: 'smooth'
})




 


// let test = [
//   {
//     "userId": 1,
//     "id": 1,
//     "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
//     "body": "quia et suscipitsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
//   },
//   {
//     "userId": 1,
//     "id": 2,
//     "title": "qui est esse",
//     "body": "est rerum tempore vitaesequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
//   },
//   {
//     "userId": 1,
//     "id": 3,
//     "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
//     "body": "et iusto sed quo iurevoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
//   },
//   {
//     "userId": 1,
//     "id": 4,
//     "title": "eum et est occaecati",
//     "body": "ullam et saepe reiciendis voluptatem adipiscisit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit"
//   },]


// ;
  