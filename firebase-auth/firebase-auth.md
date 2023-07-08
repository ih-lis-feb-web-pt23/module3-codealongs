# Firebase Social Authentication

## What is Firebase?

Firebase is a comprehensive platform provided by Google that offers a wide range of services for building and managing web and mobile applications. It is particularly well-known for its robust and user-friendly authentication system. Firebase Authentication simplifies the process of adding secure user authentication to your applications, allowing you to authenticate users through various methods such as email/password, social media accounts, or even custom authentication systems. With Firebase Authentication, you can ensure that only authorized users can access your app's features and data, providing a seamless and secure user experience.

In this code along, we will enhance our existing authentication system by integrating Firebase. We'll add Google authentication as an additional login method alongside email and password authentication. Users will have the flexibility to choose their preferred login option. We will continue using JWTs for user authorization, generating a JWT after successful authentication with Firebase. This integration combines the convenience of Google authentication with the security and flexibility of our existing JWT-based system.

## Setting up

To get started, let's sign up for Firebase using our Google account by visiting the official Firebase website at https://firebase.google.com/. Click on the "Get Started" button and proceed to "Create project".

Enter the required information, such as the project name. For example, let's use "Project Management Feb" You'll also be prompted to enable or disable Google Analytics for the project—choose according to your preference. For this example I chose to disable it.

Once the project is created, we need to add an app within the project. Click on the "</>" (Web) button to create a web app. Give your app a name, like "Project Management" and click "Register App".

Copy the firebaseConfig object that appears on the screen, as we'll need it later in our code.

Next, go to the Firebase console at https://console.firebase.google.com/. Select your project, and in the left sidebar, click on the gear icon to access project settings. Navigate to the "Service Accounts" tab and click on "Generate new private key" This will download a JSON file containing the keys we'll use in our code.

To enable authentication in our Firebase project, go to the Firebase console and click on "Authentication" Followed by that, click on "Get Started" Under "Additional providers," choose "Google." Toggle the "Enable" button to activate it.

Fill out the necessary information, such as the project name that will appear in the Google signup popup, and select the email associated with your Google account for the support email. Click "Save" to proceed.

## Instructions

After each code block in this tutorial, you will find a link to the final version of the file. This link will provide you with the complete code for that specific step, allowing you to compare your implementation and ensure accuracy. Feel free to refer to the final file if needed, but remember to follow along with the tutorial to understand the implementation details and learn the concepts thoroughly.

Let's go! 🚀

## Server

So, let's get started by making the required changes to our server code to integrate Firebase authentication smoothly and securely.

Once we have completed the server-side setup, we can proceed to the client-side implementation, allowing users to seamlessly authenticate and interact with our application using Firebase authentication.

First thing we'll do is install the firebase-admin package.

```
npm i firebase-admin
```

Now we'll add the keys from our service account JSON file to our .env file. We only need three of those values: `project_id`, `private_key`, and `client_email`.

```
SERVICE_ACCOUNT_PROJECT_ID=yourProjectIdHere
SERVICE_ACCOUNT_CLIENT_EMAIL=yourClientEmailHere
SERVICE_ACCOUNT_PRIVATE_KEY=yourPrivateKeyHere
```

Link for file: [.env](project-management-server/example.env)

Now that we have these keys, we can go to the folder `config`and create a `firebase.config.js`. We'll use the `firebase-admin` package we installed and initialize a firebase app with the credentials of our service account. In the `privateKey`, we'll need to sanitize the key by using the `replace.(/\\n/g, '\n')` at the end of it.

```js
const admin = require('firebase-admin');

const app = admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.SERVICE_ACCOUNT_PROJECT_ID,
    clientEmail: process.env.SERVICE_ACCOUNT_CLIENT_EMAIL,
    privateKey: process.env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, '\n')
  })
});

const auth = admin.auth(app);
module.exports = auth;
```

Link for file: [firebase.config.js](project-management-server/config/firebase.config.js)

The next thing we'll do is update our `User.model.js`. When signing up with Google, our user no longer adds a password and as such, we need to remove the required from the model.

```js
const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      lowercase: true,
      trim: true
    },
    name: {
      type: String,
      required: [true, 'Name is required.']
    },
    password: {
      type: String,
      required: [true, 'Password is required.'] // <--- Delete this line
    }
  },
  {
    timestamps: true
  }
);

const User = model('User', userSchema);

module.exports = User;
```

Link for file: [User.model.js](project-management-server/models/User.model.js)

Now we'll create a middleware to verify the token from firebase. It will be very similar to what we already have in `jwt.middleware.js` and will replace that middleware on our authentication verification process, meaning you can delete it if you want. Create a `firebase.middleware.js` inside the middleware folder. The main difference is that we'll use the `verifyIdToken` from firebase for the token verification.

```js
const auth = require('../config/firebase.config');

const isAuthenticated = async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    const token = req.headers.authorization.split(' ')[1];

    try {
      const decodeValue = await auth.verifyIdToken(token);
      if (decodeValue) {
        req.user = decodeValue;
        return next();
      }
    } catch (e) {
      console.log(e);
      return res.json({ message: 'Internal Error' });
    }
  } else {
    return res.json({ message: 'No token' });
  }
};

module.exports = isAuthenticated;
```

Link for file: [firebase.middleware.js](project-management-server/middleware/firebase.middleware.js)

Now we need to import it on our `app.js`. We can remove the previous middleware.

```js
const { isAuthenticated } = require('./middleware/jwt.middleware'); // <-- Delete this one
const isAuthenticated = require('./middleware/firebase.middleware'); //  <-- Add this one
```

Link for file: [app.js](project-management-server/app.js)

Now we have to update our authentication routes! Let's start by importing at the top of the file:

```js
const auth = require('../config/firebase.config');
```

In our `login` route, let's create a firebase token instead of our current JWT token. The first argument needs to be a unique id for our user, so we'll use the `user._id` converted to a string and the second argument is the `developerClaims`, an object with information we might want to pass to the client. In this case, I want to pass the information of the authenticated user so we can then use it in our React app.

```js
// Add this
const authToken = await auth.createCustomToken(user._id.toString(), {
  _id: user._id,
  email: user.email,
  name: user.name
});

// Remove this
const authToken = jwt.sign(payload, process.env.TOKEN_SECRET, {
  algorithm: 'HS256', // the algorithm we want to use to encrypt, default is HS256
  expiresIn: '6h' // TTL - time to live of the JWT
});
```

The rest of the router stays the same but here's the complete method:

```js
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // check if all parameters have been provided
    if (email === '' || password === '') {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // if the user is not found, send an error response
      return res
        .status(401)
        .json({ message: 'Provided email is not registered' });
    }

    // comparing the provided password with the one saved in the database
    const isPasswordCorrect = bcrypt.compareSync(password, user.password);

    if (isPasswordCorrect) {
      // Create Custom Token using Firebase
      const authToken = await auth.createCustomToken(user._id.toString(), {
        _id: user._id,
        email: user.email,
        name: user.name
      });

      // send the token as the response
      res.status(200).json({ authToken: authToken });
    } else {
      res.status(401).json({ message: 'Incorrect password' });
    }
  } catch (error) {
    console.log('An error occurred login the user', error);
    next(error);
  }
});
```

Now we'll create a signup route for the users that authenticate with Google. These are different because they won't have a password by default.

```js
// Login Google - Checks if user already exists, creates it otherwise
router.post('/signup-google', async (req, res, next) => {
  const { email, name } = req.body;
  try {
    // check if all parameters have been provided
    if (email === '' || name === '') {
      return res.status(400).json({ message: 'All fields are mandatory' });
    }

    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: 'User already exists' });
    }

    // Creating the new user
    await User.create({
      email,
      name
    });
    res.json({ message: 'User created successfully' });
  } catch (error) {
    console.log('An error occurred login the user', error);
    next(error);
  }
});
```

We can delete the `verify` route because that will now be handled the firebase and we no longer need it.

Link for file: [auth.routes.js](project-management-server/routes//auth.routes.js)

And we are done on the server side! ✅

## Client

So, let's proceed with the client-side implementation of Firebase authentication to create a smooth and secure login experience for our users.

We start by installing firebase:

`npm install firebase`

If for some reason you didn't save the `firebaseConfig`object, you can retrieve it by going to the firebase console in https://console.firebase.google.com. Click on your project and then on the gear icon on the left, open project settings. In the general tab you should find the config again.

We can add the keys for this configuration object on the .env just because it's a good practice but it's important to point out that private keys on React will always end up on the client bundle, as mentioned [here](https://vitejs.dev/guide/env-and-mode.html).

However, it is safe to expose the firebase api key, as explained [here](https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public/37484053#37484053).

```
VITE_FIREBASE_API_KEY=firebaseApiKey
VITE_FIREBASE_AUTH_DOMAIN=firebaseAuthDomain
VITE_FIREBASE_PROJECT_ID=firebaseProjectId
VITE_FIREBASE_STORAGE_BUCKET=firebaseStorageBucket
VITE_FIREBASE_MESSAGING_SENDER_ID=firebaseMessagingSenderId
VITE_FIREBASE_APP_ID=firebaseAppId
```

Link for file: [.env](project-management-client/example.env)

After that we can create a folder called `config` inside the `src` folder and create a `firebase.config.js` inside the `config` folder. There, we'll create the following configuration file and use the firebaseConfig keys they provided:

```js
import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithCustomToken,
  getAdditionalUserInfo
} from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

initializeApp(firebaseConfig);

export const auth = getAuth();

const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => signInWithPopup(auth, provider);

export const signInEmailPassword = token => signInWithCustomToken(auth, token);

export const getAdditionalInfo = user => getAdditionalUserInfo(user);
```

Link for file: [firebase.config.js](project-management-client/src/config/firebase.config.js)

We created a new route on our server, so let's add it to our `auth.api.js` and remove the `verify`:

```js
// Add this
export const signupGoogle = user => {
  return axios.post(`${baseURL}/signup-google`, user);
};

// Remove this
export const verify = storedToken => {
  return axios.get(`${baseURL}/verify`, {
    headers: { Authorization: `Bearer ${storedToken}` }
  });
};
```

Link for file: [auth.api.js](project-management-client/src/api/auth.api.js)

Now we need to adjust our `auth.context.js` to handle the authentication changes we have made. We'll also abstract the signInWithGoogle method here because there is no difference if the user is new or a returning one in the firebase method but we need that information to know if we should create it on our database.

Let's create the `handleGoogleAuthentication` method. After signing in with Google using firebase, we call the `getAdditionalInfo` to check if the user is new or returning to our app. If it is new, we call the `signupGoogle` to create it on our database. Make sure you send this method as props in the `AuthContext.Provider >`.

```js
const handleGoogleAuthentication = async () => {
  try {
    const userCredential = await signInWithGoogle();
    const additionalInfo = getAdditionalInfo(userCredential);
    if (additionalInfo.isNewUser) {
      await signupGoogle({
        name: userCredential.user.displayName,
        email: userCredential.user.email
      });
    }
  } catch (error) {
    console.log('Error authenticating with Google', error);
  }
};
```

We also need to update the `authenticateUser` method. I'll change its name to `verifyUser`, since it will no longer authenticates the users but receives information every time there is an update on the user authentication status.

The user data we receive from the `onAuthStateChanged` can come from authenticating with Google or from the traditional method of email and password. This means the properties `name` and `email` will be stored in different objects depending on the method user.

We'll start by handling the case where the user is not defined, which means no user is authenticated and update the state variables for that.

Next, we'll check if the user was authenticated with Google and for that we'll see if `providerData` array is populated and if so, see if the `providerId` is `google.com`. In this case, the data we are looking for will be in the properties `displayName`and `email`.

Lastly, if the user authenticated with email and password, we'll need to get the `claims` from the token we generated in our backend with the method `getIdTokenResult` and set the `name` and `email`from those claims.

For both authenticated cases we also get the token and store it in localStorage so we can retrieve it for authenticating our requests to our api.

```js
const verifyUser = async () => {
  auth.onAuthStateChanged(async user => {
    if (!user) {
      setUser(null);
      setIsLoggedIn(false);
    } else if (
      user.providerData.length &&
      user.providerData[0].providerId === 'google.com'
    ) {
      setUser({
        name: user.displayName,
        email: user.email
      });
      setIsLoggedIn(true);
      const authToken = await user.getIdToken();
      localStorage.setItem('authToken', authToken);
    } else {
      const { claims } = await user.getIdTokenResult();
      setUser({
        name: claims.name,
        email: claims.email
      });
      setIsLoggedIn(true);
      const authToken = await user.getIdToken();
      localStorage.setItem('authToken', authToken);
    }

    setIsLoading(false);
  });
};
```

The `removeToken`to logOut our user also needs to be updated, calling the `signOut`from firebase in addition to delete the token from localStorage.

```js
const removeToken = () => {
  // Upon logout, remove the token from the localStorage
  localStorage.removeItem('authToken');
  auth.signOut();
};
```

Link for file: [auth.context.js](project-management-client/src/context/auth.context.jsx)

Now we need to update our login and signup pages. Let's start with the `Login.jsx`.

Import the `signInEmailPassword` from our `firebase.config.js` and called it instead of the `storeToken`and `authenticateUser`methods in the `handleSubmit`. This new method will use the firebase `signInWithCustomToken`to validade the token we got from our backend as a valid firebase token.

```js
// At the top of the file
import { signInEmailPassword } from '../config/firebase.config';

// below, inside the component
const handleSubmit = async e => {
  e.preventDefault();

  try {
    const user = { email, password };

    const response = await login(user);
    await signInEmailPassword(response.data.authToken);

    navigate('/');
  } catch (error) {
    console.log('Error login in', error);
    const errorDescription = error.response.data.message;
    setErrorMessage(errorDescription);
  }
};
```

Now get the `handleGoogleAuthentication` from the auth context, add a new button after the login form for the Google Authentication and use the method as the click handler for this new button.

```html
<button onClick="{handleGoogleAuthentication}">Login With Google</button>
```

Link for file: [Login.jsx](project-management-client/src/pages/Login.jsx)

For the Signup.jsx page we'll do something very similar, the difference is that we don't have the `useContext` hook on this page yet, so let's add it and then we can use it on a new button as well.

```js
import { useState, useContext } from 'react';
import { AuthContext } from '../context/auth.context';

const { handleGoogleAuthentication } = useContext(AuthContext);
```

```html
<button onClick="{handleGoogleAuthentication}">Signup With Google</button>
```

Link for file: [Signup.jsx](project-management-client/src/pages/Signup.jsx)

Done! 🚀💙

## After deployment

Once we deploy our Client, we'll need to add it as an authorized domain:

Add your domain (your-deployed-app.com) to the OAuth redirect domains list in the Firebase console -> Authentication -> Settings -> Authorized domains tab.
