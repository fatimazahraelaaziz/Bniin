const contactForm = document.querySelector('.contact-form');

let name= document.getElementById('name');
let email= document.getElementById('email');
let subject= document.getElementById('subject');
let message= document.getElementById('message');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

let formData ={
    name: name.value,
    email: email.value,
    subject: subject.value,
    message: message.value
}

let xhr = new XMLHttpRequest();
xhr.open('POST', '/contactus');
xhr.setRequestHeader('Content-Type', 'application/json');
xhr.onload = function(){
    console.log(xhr.responseText);
    if (xhr.responseText === "success"){
        alert("Message sent successfully");
        name.value = "";
        email.value = "";
        subject.value = "";
        message.value = "";
    }else{
        alert("Message not sent");
    }
}

xhr.send(JSON.stringify(formData));
   

})


    
   