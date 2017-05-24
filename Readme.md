# Same.to RN App

### dev setup

Install [`react-native-debugger`](https://github.com/jhen0409/react-native-debugger)
run `npm run ios` or `react-native run-ios`


Install dependencies through yarn or npm.
You'll have to follow the steps outlined here to install Facebook sdk correctly: [`https://github.com/facebook/react-native-fbsdk`](https://github.com/facebook/react-native-fbsdk)

In order to publish with hockeyapp the hockey SDK needs to be installed as well: https://hockeyapp.net/

### project structure and overview

The project uses react native and redux for state management. If you are not familiar with redux start here: http://redux.js.org/ and watch the free video lessons. Instead of seperating everthing (actions, constants, reduxers) into different files I used the "ducks" pattern described here: https://github.com/erikras/ducks-modular-redux

The initial development of this project is based on this boilerplate as it integrates well with the redux devtools: https://github.com/jhen0409/react-native-boilerplate

The routing is handled with https://github.com/aksonov/react-native-router-flux


### Folder structure

Every screen in the app has it's on subfolder in the `views` folder. These are actual screens in the app with their own route associated to them.
So in `./Routes.js` we import all of these files and set up the according routing options.

In the `./components/` folder live all the re-usable components that we are using in different screens in the app (e.g. button, searchbar, user list, etc)

in `./hocs/` are the higher order components that can be wrapped around another component in order to enhance their functionality (using this only for firebase messenging at the moment).

In `./constants/` are reusable styles defined - suchas paddings etc so we can change them once for all components.

In `./i18n/` are the translations.

In `./utils/` are any helper functions and methods that I use that dn't belong to any specific component.

In `./services/` is the api handling and endpoints managed. the `ai.js` file there just provides methods for handling RESTful calls to the api, the other files are specific for certain resources, e.g. contacts.js tells us how to addContact, removeContact etc.
These methods are usually async and not called directly in any component. Instead, all async calls are handled using [`redux-saga`](https://github.com/redux-saga/redux-saga) (watch this if you have no idea what isgoing on: https://www.youtube.com/watch?v=msx0Qiu8NxQ)

In `./redux/modules` there is all the different (sub) states of our store defined. they usually belong to a certain ressource of view (contacts, chats, etc.) and have an initial state and some actions that trigger a possible state change and a reducer that re-calculates the next state from previous state and the action's payload (sometimes no payload is needed). All of these changes can be monitored and analyzed using the react-native-devtools.

In `./redux/sagas` there are all async actions and sagas managed. All of them are imported into `index.js` where we basically just setup some watchers that listen to a specific action and then run a certain amount of async operations and trigger new actions depending on the result of these operations.


