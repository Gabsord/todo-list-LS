// seleção de elementos 
const input = document.querySelector('.input-add')
const addBtn = document.querySelector('.add-button')
const form = document.querySelector('.form')
const todoList = document.querySelector('.todo-list')
const todoItem = document.querySelector('.todo-item')
const cancelEdit = document.querySelector('.cancel-edit-btn')
const modalEdit = document.querySelector('.modal')
const editInput = document.querySelector('.edit-input')
const confirmEditBtn = document.querySelector('.confirm-edit')
let oldInputValue = ''

let taskList = []


//funções

const addTask = (event) => {
    event.preventDefault()
    if(input.value){

    taskList.push({'todo':input.value,
                   'done': false })

    renderTasks(taskList)
    
    input.value =''
}}


function renderTasks(lista) {
    todoList.innerHTML=''
    if(lista) {

    lista.forEach((task,index) => {

        const itemTodo = document.createElement('div')

        itemTodo.classList.add('todo-item')
        itemTodo.setAttribute('data-index', `${index}`)
    
        const content = document.createElement('span')
        content.innerText = task.todo
    
        const checkBtn = document.createElement('button')
        checkBtn.innerHTML = '<button class="material-symbols-outlined done">done</button>'
        
    
        const editBtn = document.createElement('button')
        editBtn.innerHTML = '<button class="material-symbols-outlined edit">edit</button>'
    
        const deleteBtn = document.createElement('button')
        deleteBtn.innerHTML = '<button class="material-symbols-outlined delete">delete</button>'
    
        itemTodo.appendChild(content)
        itemTodo.appendChild(checkBtn)
        itemTodo.appendChild(editBtn)
        itemTodo.appendChild(deleteBtn)

        if(taskList[index].done){
            itemTodo.classList.add('finished')
        }
    
        todoList.appendChild(itemTodo)
})

    localStorage.setItem('mylist', JSON.stringify(taskList))
}}

    


function generateId(){
    const id = Math.random() * 999999
    return id
}


const checkClick = ({target}) => {
    
    let item = target.closest('div')
    if (item) {

        let dataIndex = item.getAttribute('data-index')

        // delete button
        if(target.classList.contains('delete')) {
            deleteItem(taskList,dataIndex)}
        
         // done button   
        else if(target.classList.contains('done')) {
            concludeTask(taskList,dataIndex,item)}

         // edit button   
        else if(target.classList.contains('edit')) {
            editTask(dataIndex)}

         // confirm edit button   
        else if (target.classList.contains('confirm-edit')){

        }}}


 function deleteItem(lista,position){

    lista.forEach((task,index) => {
        if (position == index){
            
            lista.splice(index,1)
            renderTasks(lista)
        }})}
  
        
 function concludeTask(lista,position,item){
    
    lista[position].done = !lista[position].done
    renderTasks(lista)

    if(lista[position].done) {
        item.classList.add('finished')
    }
    else{
        item.classList.remove('finished')
    }}   
    
    
function editTask(position){

    modalEdit.style.display = 'flex'
    editInput.value = taskList[position].todo
    oldInputValue = editInput.value
}



function loadPage(){
    if(localStorage.length){
        taskList = JSON.parse(localStorage.getItem('mylist'))
        renderTasks(taskList)
    }}

loadPage()

// eventos 

form.addEventListener('submit', addTask)
document.addEventListener('click', checkClick)


cancelEdit.addEventListener('click', () => {
    modalEdit.style.display = 'none'

})

confirmEditBtn.addEventListener('click', (event) =>{
    event.preventDefault()
    taskList.forEach((task) => {
        if(task.todo == oldInputValue) {
            task.todo = editInput.value
            renderTasks(taskList)
        }
        modalEdit.style.display = 'none'
    
})})






