import './style.css'

let yourLocation = document.getElementById('yourLocation') as HTMLDivElement
 

async function getLocation() {

    try {
       let location = await fetch('http://ip-api.com/json/')
            .then(resp => resp.json());
        console.log(location);  
        yourLocation.innerHTML = `
        страна: ${location.country} <br>
        регион: ${location.regionName} <br>
        город: ${location.city} <br>
        провайдер: ${location.as}
        `
        return location;
    } catch (error) {
        console.error('Ошибка:', error);
        return null;
    }
}

getLocation()
 

let text_marker =document.querySelector('#text_marker') as any //!поле для ввода
let pencil =document.querySelector('#pencil') as HTMLImageElement //!маркер

let quantaty_symbols =document.querySelector('#quantaty_symbols') as HTMLDivElement //!кол-во символов
let inner_battery =document.querySelector('#inner_battery') as HTMLDivElement
let battery_percents =document.querySelector('#battery_percents') as HTMLDivElement




let acc = 0 //! уменьшаем батарею с чернилами
let markerAcc = 1 //! изменение прозрачности текста
let moveMarker = 0 //! двигаем маркер-курсор
let symbols = 1 //! количество напечатанных символов
let moveMarkerHeight = 0 //! двигаем маркер-курсор


let percents = 100 as any

text_marker.addEventListener('keydown', (e:any)=> {
    e.preventDefault()
    
    console.log(text_marker.innerText);
    
    // for (let i = 0; i < text_marker.innerText.length; i++) {
    //     if (text_marker.innerText[i] == 'r') {
    //         text_marker.innerText[i] = 'R'
    //         console.log(text_marker.innerText[i]);
    //     }
        
        
    // }

    battery_percents.innerHTML =percents + '%'

    acc-=6 //! уменьшаем батарею с чернилами
    inner_battery.style.width = 300 + acc + 'px'

    quantaty_symbols.innerHTML= `Символов напечатано: ${symbols}`
    
    
    if ((parseInt(pencil.style.marginLeft)) > -1045) {
        moveMarker=0
        moveMarkerHeight+=18
        
        pencil.style.marginLeft ='-1290px'
        pencil.style.marginTop =moveMarkerHeight + 'px'
    } else {
        moveMarker+=7.2 //! двигаем маркер-курсор
        pencil.style.marginLeft = moveMarker - 1290 + 'px' 
    }



    
    markerAcc-=0.02 //! с каждым нажатием делаем текст более прозрачным
    text_marker.innerHTML+=`<span style="color: ${changeColor.value}; opacity:${markerAcc}">${e.key}</span>`

if (parseInt(inner_battery.style.width)<=0) {
    // moveMarker+=0
    symbols+=0
    percents=0
} else {
 symbols+=1
 percents-=2
}
})



let changeColor =document.querySelector('#changeColor') as HTMLInputElement //! кнопка изменения цвета маркера и батареи

changeColor.addEventListener('input', ()=> {
    pencil.style.filter = `drop-shadow(1300px 0px ${changeColor.value})` //! изменение цвета карандаша
    inner_battery.style.background = changeColor.value //!изменение цвета батарейки
    refuelInk()    
})


let refuel_marker =document.querySelector('#refuel_marker') as HTMLButtonElement //! кнопка заправки маркера и батареи

refuel_marker.addEventListener('click', ()=> {
    refuelInk()
})


function refuelInk() {
    acc = 0  
    markerAcc = 1 //! 'восстаналиваем' чернила
    inner_battery.style.width = 300 + 'px' //! 'восстаналиваем' батарею
    battery_percents.innerHTML = 100 + '%'
    percents = 100
    console.log(acc);
}

 



 

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

// ! Конец задания с телефонным номером */



//! Задание с вводом стилизованного текста

let change_color = document.querySelector('#change_color') as HTMLInputElement
change_color.addEventListener('input', ()=> {
    console.log(change_color.value);
})

let text_from_form = document.querySelector('#text_from_form') as HTMLDivElement

let formMenu = document.querySelectorAll('#formMenu input') as any
let textArea = document.querySelector('#textArea') as HTMLTextAreaElement
let print_text = document.querySelector('#print_text') as HTMLButtonElement

print_text.addEventListener('click',(e)=> {
    e.preventDefault()
    text_from_form.innerHTML=`<div style="color:${change_color.value};">${textArea.value}<div>`
    let mass = ['bold', 'underline', 'italic'] 

    for (let i = 0; i < mass.length; i+=1) {
        
        if (formMenu[i].checked == true) {
            text_from_form.classList.add(mass[i])        
        } else {
            text_from_form.classList.remove(mass[i])  
        } 
    }
    
})



//! Задание с вводом стилизованного текста, завершение



//! Работа с таблицей работников

let table_with_workers = document.querySelector('#table_with_workers') as any
let add_worker = document.querySelector('#add_worker') as HTMLButtonElement // кнопка добавления работника
let delete_inputs = document.querySelector('#clean_inputs') as HTMLButtonElement // кнопка добавления работника
let delete_worker = document.querySelector('#delete_worker') as HTMLButtonElement // кнопка удаления работника
let new_worker_form = document.querySelector('#new_worker_form') as any // окошки, с вводимой информацией
let number_delete_worker = document.querySelector('#number_delete_worker') as HTMLInputElement // окошки, с вводимой информацией

let accWorker = table_with_workers.rows.length - 1 // количество работников
let accWorkerInHTML = document.querySelector('#accWorkerInHTML') as HTMLDivElement // вывод количества работников
accWorkerInHTML.innerHTML = `Количество работников: ${accWorker}`

let child = new_worker_form.children
add_worker.addEventListener('click', () => {
    if (child[0].value == '') {
        child[0].style.border = '2px solid red'
        child[0].style.background = 'pink'
    } else {
        accWorker += 1
        table_with_workers.innerHTML += `<tr>
    <td>${child[0].value}</td>
    <td>${child[1].value}</td>
    <td>${child[2].value}</td>
    <td>${child[3].value}</td>
    </tr>`
        accWorkerInHTML.innerHTML = `Количество работников: ${accWorker}`
        child[0].style.border = ''
        child[0].style.background = ''
    }
})

delete_worker.addEventListener('click', () => {
    if (number_delete_worker.value >= '1') {
        table_with_workers.deleteRow(number_delete_worker.value)
        accWorker -= 1
        accWorkerInHTML.innerHTML = `Количество работников: ${accWorker}`
    }
})

delete_inputs.addEventListener('click', () => { // очищаем инпуты
    child[0].value = ''
    child[1].value = ''
    child[2].value = ''
    child[3].value = ''
})

//! Работа с таблицей работников, завершение



//! Задание с футбольным мячом

let field = document.querySelector('.field') as HTMLDivElement
let ball = document.getElementById('ball') as HTMLDivElement
let ball_image = document.getElementById('ball_image') as HTMLImageElement

let widthOfField = getComputedStyle(field).width // ширина поля
let heightOfField = getComputedStyle(field).height // высота поля
let widthOfBall = getComputedStyle(ball).width// ширина мяча
let heightOfBall = getComputedStyle(ball).height// высота мяча


ball.style.marginLeft = ((parseInt(widthOfField) - parseInt(widthOfBall)) / 2) + 'px'
ball.style.marginTop = ((parseInt(heightOfField) - parseInt(heightOfBall)) / 2) + 'px'

let degree = 0

field.addEventListener('click', (e) => {
    degree += 90 
    ball.style.marginLeft = e.pageX - field.offsetLeft - parseInt(widthOfBall) / 2 - 7 + 'px'
    ball.style.marginTop = e.pageY - field.offsetTop - parseInt(heightOfBall) / 2 - 5 + 'px'
    ball_image.style.rotate = degree + 'deg' //! 'подкручиваем' мяч
    // console.log(e.pageY); //! отслеживаем нажатие мышкой по оси У
    // console.log(field.offsetTop); //! расстояние от начала страницы до футбольного поля

})


//! Задание с футбольным мячом, завершение




// ! Список покупок


let list = [
    {name: 'Milk', quantaty:2, bought:true}, 
    {name: 'Sugar', quantaty:3, bought:false}, 
    {name: 'Bread', quantaty:1, bought:true},
    {name: 'Potato', quantaty:2, bought:false}, 
    {name: 'Chocolate', quantaty:3, bought:true}, 
]

let listWithProducts = document.getElementById('listWithProducts') as HTMLDivElement


//? 1. Вывод всего списка на экран таким образом, чтобы сначала шли некупленные 
//? продукты, а потом – купленные.

listWithProducts.innerHTML+=('Некупленные продукты:').bold()+'<br>'

for (const el of list) {
    if(el.bought==true){
        listWithProducts.innerHTML+=(el.name + ' ' + el.quantaty)+'<br>'
    }
}
listWithProducts.innerHTML+=('Купленные продукты:').bold()+'<br>'

for (const el of list) {
    if(el.bought==false){
        listWithProducts.innerHTML+=(el.name + ' ' + el.quantaty)+'<br>'
    }
}



//? 2. Добавление покупки в список. Учтите, что при добавлении покупки с уже 
//? существующим в списке продуктом, необходимо увеличивать количество в 
//? существующей покупке, а не добавлять новую. 

// ????????????????????????????????????????????????????????????

let product_title = document.getElementById('product_title') as HTMLInputElement
let product_quantaty = document.getElementById('product_quantaty') as HTMLInputElement
let add_product = document.getElementById('add_product') as HTMLButtonElement


function writeProduct() {

    add_product.addEventListener('click',()=>{
        for (let i = 0; i < list.length; i++) {
            if(list[i].name==product_title.value) {
                console.log(list[i].quantaty+=1);
                
                return list[i].quantaty+=1
            }
            
        }
        return listWithProducts.innerHTML+=product_title.value + ' ' + product_quantaty.value + '<button id="add_product">add product</button>' + '<br>'
    })
    
}

writeProduct()
 
            
        

//? 3. Покупка продукта. Функция принимает название продукта и отмечает его как 
//? купленный.




// ! Конец задания со списком покупок



//! Создать массив, описывающий чек в магазине. Каждый элемент массива состоит из 
//! названия товара, количества и цены за единицу товара. Написать следующие функции.


let check = [
    {name: 'Milk', quantaty:2, price:90},    //180
    {name: 'Sugar', quantaty:3, price:100},    //300
    {name: 'bread', quantaty:1, price:50},    //50
    {name: 'potato', quantaty:2, price:60},    //120
    {name: 'chocolate', quantaty:3, price:120},    //360
    // суммарно 1010
]


//?  1. Распечатка чека на экран.

let showCheck = document.getElementById('checkInShop') as HTMLElement
showCheck.innerHTML = '<br>' + ('Чек с покупками:').bold() + '<br>'+ '<br>'

function printCheck(check:any[]) {
    let printInfo = ''
    for (const el of check) {
        printInfo += (JSON.stringify(el))+'<br>'
    }
    return showCheck.innerHTML+=printInfo
}
printCheck(check);



//?  2. Подсчет общей суммы покупки.

function unionSumm(check:any[]) {
  let count = 0
    for (const el of check) {
        count+=el.quantaty*el.price
    }
    return showCheck.innerHTML +=`<br> Общая сумма покупки = ${count} <br><br>`
}
unionSumm(check)



//?  3. Получение самой дорогой покупки в чеке.

function mostExpensiveBought(check:any[]) {
    let massive:number[] = []
    for (const el of check) {
        massive.push(el.price*el.quantaty)
    }
    return showCheck.innerHTML+=`Самая дорогая покупка = ${Math.max(...massive)} <br><br>`    
}
mostExpensiveBought(check)



//?  4. Подсчет средней стоимости одного товара в чеке. 

function findMiddlePrice(check:any[]) {
    let middlePrice = 0
    for (let i = 0; i < check.length; i++) {
        middlePrice+=(check[i].price)/check.length    
        // console.log(middlePrice);
    }
    return showCheck.innerHTML+=`Средняя стоимость одного товара = ${middlePrice}<br><br><br><br>`
}
findMiddlePrice(check)

//! Конец задания с чеком




// !!!    Задания с датами
// ! Недельный календарь !
let todays = new Date()

let days = document.querySelector('#days') as any
if (todays.getDay() == 0) {
    days.children[todays.getDay() + 7].classList.add('newClass')
}

days.children[todays.getDay()].classList.add('newClass')


let runningLine = document.querySelector('#runningLine') as HTMLDivElement

// let day = new Date()
runningLine.innerText = todays as any


// !!!    Конец заданий с датами



// ! Задание с банковской картой */

let card_inputs = document.querySelectorAll('#card_inputs input') as any

let date = new Date()
card_inputs[0].placeholder = `${date.getDate()}/${date.getMonth() < 9 ? '0' : ''}${date.getMonth()+1}`
card_inputs[1].placeholder = date.getFullYear()

card_inputs[1].addEventListener('keydown',(e:any)=> {
    if (e.key>='0' && e.key<='9' || e.key == 'Backspace'|| e.key == 'Tab') {
    } else {
        e.preventDefault()
    }
})

card_inputs[0].addEventListener('keydown',(e:any)=> {
    console.log(e);
    
    if (e.key>='0' && e.key<='9' || e.key<='/' || e.key == 'Backspace'|| e.key == 'Tab') {
    } else {
        e.preventDefault()
    }
    if (card_inputs[0].value.length==2) {
        card_inputs[0].value+= '/'
    }
})
    

// ! Конец задания с банковской картой */
    
    




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
    formated_text.style.overflowY = 'scroll'

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




























//   //! Рассчитайте, сколько дней осталось до Нового года. 
//   let d0 = new Date();
//   let d1 = new Date('Jan 1 2026');
//   let dt = (d1.getTime() - d0.getTime()) / 
//   (1000*60*60*24);

//   listWithProducts.innerHTML+=('До нового года осталось: ' + 
//   Math.round(dt) + ' дней'); 
  
  

  

  




// //! Задача с днём рождения :))))
// let birthday = new Date('7-26-2017')
// let birthMass = ['воскр','понед','вторн','среда','четв','пятн','субб',]
// console.log(birthMass[birthday.getDay()]);





// //! Плавное_изменение_цвета_букв
// let changeColorOfLetters = document.getElementById('changeColorOfLetters') as HTMLDivElement
// let text = 'плавное_изменение_цвета_букв'
// let textMass = text.split('') as any

// let count = 0
// for (let i = 0; i < textMass.length; i++) {
//     count+=0.05   
//     let array = []
//     array.push(`<div style="color:  rgb(237, 12, 12, ${count});"> ${textMass[i]} <\div>`) 
//     changeColorOfLetters.innerHTML +=array

// }





 
 
// fetch('http://localhost:5173/JavaScriptForStudents/')

//! в первой строке всегда получаем статус
// .then((resp)=> resp.text())
// .then((data)=> console.log(data))




// .then((resp)=> resp.blob())
// .then((data)=>console.log(data))
// .catch((error)=>console.log(error + 'Где-то ошибка'))
// .finally(()=>console.log('finish'))



// if (resp.ok) {
//     console.log('успешно');
// } else {
//     console.log('Ошибка');
// }



















// .then((resp)=>resp.blob())
// .then((data)=>console.log(data))

// //! узнать кол-во репозиториев

// let profiles = await fetch('https://api.github.com/users/belkud')
// let myProfile = await profiles.json()
// console.log(myProfile.public_repos + '- количество публичных репозиториев');


// //! получить изображение с гитхаб
// console.log(myProfile.avatar_url);

// let myImage = document.createElement('img')
// myImage.src = myProfile.avatar_url
// document.body.prepend(myImage)
// console.log(getComputedStyle(myImage).width);
// console.log(getComputedStyle(myImage).height);


// setTimeout(() => {
//     myImage.style.display ='none'
// }, 2000);



// console.log(profiles.headers.get('Content-type'));







// let mySite = await fetch('http://localhost:5173/JavaScriptForStudents/')

// let siteInfo = await mySite.blob() //! показывает размер сайта и тип данных
// console.log(`размер сайта: ${siteInfo.size} килобайт,
//     тип данных: ${siteInfo.type}`)
    
// let siteInfo2 = await mySite.text() //! переводит в обычный текст
// console.log(siteInfo2);

// let siteInfo3 = await mySite.json() //! переводит в json формат
// console.log(siteInfo3);

// let siteInfo4 = await mySite.arrayBuffer() //! низкоуровненое представление данных
// console.log(siteInfo4);
















// вывести Kudarenko Vladimir с гит двумя способами (через два then или два await)


// //! первый способ обработки запроса
// let myGithub1 = await fetch('https://api.github.com/users/belkud')
// let myName1 = await myGithub1.json()
// console.log(myName1.name);

// //! второй способ обработки запроса
// fetch('https://api.github.com/users/belkud')
// .then((data)=> data.json())
// .then((user)=> console.log(user.name))

// console.log(user.name);



//! Работа с файлами

//! vite-env.d.ts - essential файл для TypeScript проектов на Vite, который обеспечивает 
//! правильную типизацию всех особенностей Vite ecosystem.

//! .gitignore - это специальный файл в Git, который указывает, 
//! какие ненужные файлы исключать из коммитов

//! package-lock.json - это автоматически генерируемый файл в Node.js проектах, который 
//! точно фиксирует версии всех установленных зависимостей и их дерево.

//!  package.json - это основной файл конфигурации в Node.js проектах, который содержит 
//! основные зависимости проекта.


//! tsconfig.json - это файл конфигурации TypeScript, который определяет, как 
//! компилятор TypeScript должен обрабатывать и компилировать ваш код.






