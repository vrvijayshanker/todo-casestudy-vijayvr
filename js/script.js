
// ------------------------------ Login validation -------------------------------------------
const submitButton = document.getElementById("login");
if(submitButton){
  submitButton.addEventListener('click', validateLogin);  
}
function validateLogin(event){
    let username = document.getElementById("uname");
    let password = document.getElementById("pswd");
    let errmsg = "";
  
    if(username.value == "" || password.value == ""){
      errmsg = "Fields Cannot be Empty";
      event.preventDefault();
      return errorDisplay(errmsg);
      
    }
    else if(username.value == "admin" && password.value == "12345"){
      console.log("login successful");
    }
    else{
      errmsg = "Credentials Don't Match";
      event.preventDefault();
      return errorDisplay(errmsg);
      
    }  
}

function errorDisplay(err){
  alert(err);
  return false;
}

// ------------------------------ Reading from server ----------------------------------------
function ReadfromServer(){
    //Creating an XHR object
    var xhttp = new XMLHttpRequest();
  
    //Event Listener
    xhttp.onreadystatechange = function(){
      //condition
      if (this.readyState==4 && this.status==200) {
        var response = JSON.parse(this.responseText);
        
        var output = "";
  
        for (var i = 0; i < response.length; i++) {

          if(response[i].completed){
            output += "<label style = 'color: grey; font-style: italic;'><input type='checkbox'  checked disabled='true' value="+response[i].completed+">&nbsp&nbsp"+response[i].title+"</label></br>"; //+= for appending ALSO name changed to title because thats the attribute in server
            // console.log(response[i].id);
          }
          else{
            output += "<label><input type='checkbox' value="+response[i].completed+">&nbsp&nbsp"+response[i].title+"</label></br>";
          }
          
          // console.log(i+" "+response[i].completed);
          
        }
        
        document.getElementById("todo-content").innerHTML = output;           

      }
      
    }
    //initiating
    xhttp.open("GET","https://jsonplaceholder.typicode.com/todos",true);
  
    //sending
    xhttp.send();
  }
