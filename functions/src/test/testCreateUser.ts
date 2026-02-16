/**
TESTING INSTRUCTIONS:

1. Make sure your Firestore and Functions emulators are running:
   firebase emulators:start --only functions,firestore

2. Open the Functions shell:
   npm run shell

3. In the shell, call the cloud function like this:

  createUser({
  data: {
    firstName: "Adrian",
    lastName: "Diaz",
    username: "adidaz",
    password: "mypassword"
  }
})


4. You should see the created user object in the console, and the Firestore emulator
   will show a new document in the "users" collection.
*/
