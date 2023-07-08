document.getElementById("loginform").addEventListener("submit", function(event)
 {
    event.preventDefault();
    
    
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    
  
    
    
    var userDetails = {
        Email: email,
      Password: password
      
    };
    localStorage.setItem('userDetails', JSON.stringify(userDetails));
 })
    
    // Redirect to another page or perform other actions
    // ...
    
    // Prevent form submission
    // return false;