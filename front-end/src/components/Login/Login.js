import React , {useState,useEffect} from 'react';
import axios from 'axios';
import styles from './Login.module.css'
import {BrowserRouter, Route} from 'react-router-dom'
import {Link} from 'react-router-dom';



function Login(){
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [mensagem, setMensagem] = useState('');
 const [loginStatus, setLoginStatus] = useState(false);
 const [userId, setUserId] = useState();


 useEffect(() => {
     
    async function userAuthenticated(){
        await axios.post("http://localhost:3007/isUserAuth", {
            headers:{
                "x-acess-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            if(response.data.auth){
                setLoginStatus(true);
                setUserId(localStorage.getItem('user'));
            }
            else{
                setLoginStatus(false);
                localStorage.clear();
            }
        });
    };

    
     userAuthenticated()  
 }, [email])

    async function LoginRequest(res , error){
        await axios.post("http://localhost:3007/login",{
            login:email,
            senha:password
        }).then((response) => { 
            if(!response.data.auth){
                setMensagem(response.data.generic)
            }else{
                const res = response.data.res.data[0].id;
                localStorage.setItem("user", res);
                localStorage.setItem("auth", response.data.auth);
                localStorage.setItem("token", response.data.token); 
                setUserId(res)
                setLoginStatus(true);
                window.location.reload();
                
            }
        }).catch((err) => {
          
        })
    }

    async function logout(){
        localStorage.clear()
        window.location.reload();
    }
    


    


    return (
        <>
        {!loginStatus?
        <div>
        <div className={styles.Login}>
            <label name="email">Email:</label>
            <input type="text" onChange={(e) => setEmail(e.target.value)}></input>
            <label name="pass">Password:</label>
            <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
            
            <button 
                onClick={() =>LoginRequest()}
            >
                Entrar
            </button>
        </div>
        <div>
            <span className={styles.span}>{mensagem}</span>
        </div>
        <div className={styles.registrar}>
            <Route>
                <Link to="/register">Registrar</Link>
            </Route>
        </div>
        </div>
        
        :
        <div className = {styles.loginUser}>
            <Route><Link to="/favoritos">Favoritos</Link></Route>
                <button className = {styles.logout} onClick={() => logout()}>Logout</button>
            
        </div>
        }
        </>
    )

}
export default Login