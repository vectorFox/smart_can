import AuthReducer from './AuthReducer.js'
import { combineReducers } from 'redux'
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase'

const RootReducer = combineReducers({
  auth: AuthReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default RootReducer