
import '../components/MainPage.css';
import React, {useState} from 'react';



function MainPage(props) {

    //Exchange this with redux
    const [state, setState] = useState({
        email: '',
        password: '',
        amount: 0,
    });

    const[msg, setMsg] = useState({
        errorMsg: '',
    });
    
    const handleChange = e => {
        //merge both the previous and what the user just typed
        setState({
            ...state,
            [e.target.name] : e.target.value,
        });
    }

    const processData = (e) =>{
        e.preventDefault();
       
        if(state.email === '' || state.password === '') return messageAlert("Email/Password field is empty.");
        // if(state.errorMsg !== '') return setMsg({errorMsg: ''});
 
        props.store.dispatch({type: 'LOGIN',
        payload: {
            email: state.email,
            password: state.password,
            amount: state.amount,
            loggedIn:true,
        }})
    }
 
    let messageAlert = (message)=>{
        if(message === '')return;
        if(typeof message !== "string") return;

        return setMsg({errorMsg: message});
    }

    
    

    return ( <div>
           
            <div className="intro">  
                <h1>Hello {state.email}<br/> It seems This is your first time here, Please Create an Account</h1>
                <form>
                    <div className="outer_msg"><p id="msg">{msg.errorMsg}</p></div>

                    <input type="email" name="email" id="email" placeholder="Email Address" 
                    value={state.email} 
                    onChange={handleChange}/>

                    <input type="password" name="password" id="password" placeholder="Password" 
                    value={state.password}
                    onChange={handleChange}/>

                    <button id="btn" onClick={processData}>Create Account</button>
                </form>
            </div>
        </div>
    )

    
}

export default (MainPage);


