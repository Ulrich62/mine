#Models

    1-Users
    2-Tasks
    
#Models attributes

    1-Users
      -firstName
      -lastName
      -email
      -birthdate
      -seciality
      -nationality
      -password
      
     2-Tasks
      -title
      -content
      -userId
      
     *Tasks belongs to user
     *User has many tasks
 
 #EndPoints
 
      *Tasks
          // create task
          post('/');

          // get one task by id
          get('/:id');

          // get task by user
          get("/user/:id");

          // delete comment
          delete('/:id');

          // update task
          put('/:id');

          // get all task
          get('/');
          
      *User
      
        // create user route

        post('/signup')
        post('/login')

        // get one user by id
        get('/:id');

        // delete user
        delete('/:id');

        // update user
        put('/:id');

        // get all user
        get('/');
        
  #Api_Link
  
        https://node-api-digit.herokuapp.com

 
    
