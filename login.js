let userName = document.querySelector('#user-name');
let passWord = document.querySelector('#pass-word');
let signUp = document.querySelector('#signup-btn');
let signIn = document.querySelector('#signin-btn');
let check = document.querySelector('#cb');

signUp.addEventListener('click', ()=>{
    if(userName.value === "" || passWord.value ===""){
        alert("Plese fill the Credentials")
    } else{
        localStorage.setItem("username", userName.value)
        localStorage.setItem("password", passWord.value)
        alert("Successfully sign up")
    }
})

signIn.addEventListener('click', ()=>{
    if(userName.value === "" || passWord.value ===""){
        alert("Plese fill the Credentials")
    } else if(localStorage.getItem("username", userName.value) && localStorage.getItem("password", passWord.value)){
        alert("Successfully Login")
        window.location.href = "main.html"
    }else{
        alert("Invalid credentials")
    }
})
