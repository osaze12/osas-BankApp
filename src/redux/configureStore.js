import {createStore } from 'redux';
import {rootReducer, initialState} from "./reducers"

export const configureStore = ()=>{

    //for persistent data
    //set inital state to the local storage data if there's any, or initial data
    function getLocalStorage(initialState){
        return localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data'))  : initialState;
    }

    function saveStore(getState){
        localStorage.setItem('data', JSON.stringify(getState) );
    }
    
    const store = createStore(rootReducer, getLocalStorage(initialState)); 
    //listen for change in the store, get the current state and save it to local storage
    store.subscribe(()=>{saveStore(store.getState())});
    return store;
}

export default configureStore;