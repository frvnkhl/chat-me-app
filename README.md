# Chat Me App
## Project Description
This is my third full-stack project and it's a real time chat application where users can communicate with each other through chat rooms. On top of that, users can also create new chat rooms and then grant a priviledge of being admin which then allows them to delete the room if they want. It all happens in real time and all the messages are being saved into db.

Although this is my third full-stack project, it's my first project written entirely in TypeScript instead of javascript. It was a challenge in the beginning, but now I prefer it over good ol' js. I built my backend in node.js & express with implementing websockets with the help of socket.IO library. For my frontend side, I used React with Tailwind CSS for styling and Material Tailwind components and Redux for state management. As a database I used HarperDB which is very convenient since it uses the communication with the app via api calls.

Since it's my third project of this nature I decided not to implement again third party login, but I also decided to manually create ids in the database, manually authenticate the user via jwt without passportjs. On my backend part I also decided to change structure of the folders and divide them by the object themselves instead of by controller, service etc. My biggest challenges while creating this app were implementing sockets and redux since I have never worked with those things in my life.

### Main Features
- Logging and singing up to the app with username and password
- Storing the user in the db and hashing the passwords
- Authentication via JWT
- Creating chat rooms
- Welcome messages and notifications about other users joining/leaving from a bot
- Sending messages in the chat rooms
- Receiving new messages in the room in the real time
- Deleting the chat rooms that user has created

### App Demo
[Here's the link to the demo app](https://chat-me-app.vercel.app/)

To discover all functionalities you have to register and then login. You can create it with a random username and a password.

## Dependencies
### Backend
- axios
- bcrypt
- body-parser
- cors
- dotenv
- express
- jsonwebtoken
- socket.io

### Frontend
- axios
- jwt-decode
- react-hook-form
- react-redux
- react-router-dom
- redux
- redux-devtools-extension
- redux-thunk
- socket.io-client
- yup

## Credits
Although I did this app by myself, there are couple of sources that helped me to make this app happen. 

First and most important source for this app is [an article by Danny Adams](https://www.freecodecamp.org/news/build-a-realtime-chat-app-with-react-express-socketio-and-harperdb/) on how to build a real time chat app. With that tutorial I learned how to build a simple real time chat. I used it then as a base for my project and redid it to fit my needs as I needed to add more features and therefore also change how some things would function within the app.

Another important source for me was [an article by Julie Cherner](https://dev.to/juliecherner/authentication-with-jwt-tokens-in-typescript-with-express-3gb1) about how to implement JWT authentication in TypeScript. It was really helpful since before that I used passportjs and this way, thanks to her article I could learn a bit more in-depth about what's happening behind the curtains with the authentication of the app.

For form validation and messages I got a huge help from [bezkoder and his tutorial how to implement form validation in react and typescript](https://www.bezkoder.com/react-hook-form-typescript/). It was very informative and showed me how to use yup and react hook modules. His explanation were also very straightforward which was very helpful when I needed to tailor his tutorial to my needs.

And last but not least is [an article by Sohan De Roy](https://www.freecodecamp.org/news/what-is-redux-store-actions-reducers-explained/). His article explains redux store, actions and reducers in a great detail. As someone who had never worked with this library it was very helpful and very well explained. Thanks to him, I was also able to implement redux store in my app.
