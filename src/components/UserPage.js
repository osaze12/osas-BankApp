
import {connect} from 'react-redux';
import '../components/UserPage.css';
import React, {useState} from 'react';


function UserPage({data, store}) {
    const [reveal, setReveal] = useState(true);
    const [revealWdithdraw, setRevealWithdraw] = useState(false);

    const [text, setText] = useState({value: ''})
    const [withdrawText,setWithdrawText] = useState({value: ''});

    const closeAccount = ()=>{
        store.dispatch({type: 'LOGOUT',
        })
    }
    const creditAccount = ()=>{
        setRevealWithdraw(false)
        setReveal(true);
    }
    const handleSaveAmount = ()=>{
        const correctValue = checkInputValue(text.value);
        if(!correctValue){return alert("There's an error in what you entered :(");}
        const oldCreditValue = parseInt(data.amount);
        const newCreditValue = oldCreditValue + parseInt(text.value);

        store.dispatch({type: 'CREDIT_ACCOUNT',
            payload: {
                amount: newCreditValue
            }
        })

        setText({value: ''});
    }
    const handleWithdrawAmount= ()=>{
        setReveal(false);
        setRevealWithdraw(true);
    }

    const handleWithdrawTextInput= (event)=>{
        setWithdrawText({value:event.target.value})
    }

    const withdraw = ()=>{
   
        const correctValue = checkInputValue(withdrawText.value);
        if(!correctValue){return alert("There's an error in what you entered :(");}
        if (withdrawText.value >= parseInt(data.amount)){return alert("You Don't have that amount/you can't Withdraw Everything")}
        const newAmount = parseInt(data.amount) - withdrawText.value;

        store.dispatch({type: 'CREDIT_ACCOUNT',
            payload: {
                amount: newAmount
            }
        })
        setWithdrawText({value:''});
    }
    const handleTextInput= (event)=>{
        setText({value:event.target.value})
    }

    function checkInputValue(value){
        let reg = new RegExp('^[0-9]{1,7}$');
        if(! reg.test(value)){ 
            return false;
        } 
        return true;
    }
    function numberWithCommas(number){
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    
    return (
        <>
             <div className="big_main">
                    <section className="side">
                        <div className="side__inner">
                            {reveal ?<h1 className="credit" style={{  color:"#c7c7c7"}} onClick={creditAccount}>Credit Account</h1> :<h1 className="credit" onClick={creditAccount}>Credit Account</h1>}
                            {revealWdithdraw ? <h1 className="widthdraw" style={{color:"#c7c7c7"}}  onClick={handleWithdrawAmount}>Widthdraw</h1> : <h1 className="widthdraw" onClick={handleWithdrawAmount}>Widthdraw</h1>}
                            <h1 className="close_acc" onClick={closeAccount }>Close Account</h1>
                        </div>
                    </section>

                    <section className="main">
                        <div className="show_details">
                           
                            {/* <h1 className="show_details__email"><span className="span_email">{data.email}</span></h1> */}
                            <h1 className="show_details__amount">Current Amount: <span className="span_amount">${numberWithCommas(data.amount)}</span></h1>
                        </div>
                        <div className="inputs">
                            {reveal &&<div className="cre">
                                        <input type="text" name="credit" id="text"  placeholder="Credit your Account :)" 
                                                value={text.value} 
                                                onChange={handleTextInput}>
                                        </input>

                                        <input type="button" value="Credit" 
                                            onClick={handleSaveAmount}>
                                        </input>
                                    </div>}

                            {revealWdithdraw && <div className="wid">
                                                <input type="text" name="withdraw" id="text" placeholder="Withdraw from Account"
                                                    value={withdrawText.value} 
                                                    onChange={handleWithdrawTextInput}>
                                                </input>
                                                <input type="button" value="Withdraw" onClick={withdraw}></input>
                                </div>}
                        </div>
                    </section>
            </div>
           
        </>
    )
}

//these takes data from our store and then puts it in userInfo
 let mapStateToProps = (state)=>{
        return {
            data: state
        }
 }
//these connect map... and UserPage, so we can see and use the data in the props
export default connect(mapStateToProps)(UserPage)
