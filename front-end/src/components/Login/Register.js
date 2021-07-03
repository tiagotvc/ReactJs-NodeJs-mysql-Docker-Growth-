import React , {useState} from 'react';
import axios from 'axios';
import styles from './Login.module.css'


function Register(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function registerAccount(res , error){
        await axios.post("http://localhost:3007/register",{
            login:email,
            senha:password
        }).then((response) => { 
            if(response.data.hasUser){
                alert("Usuario já cadastrado");
            }
            else if(response.data.status == 200){
                alert("Usuário adicionado com sucesso")
                window.location.href = "/"  
            }
                
        }).catch((error) => {
                alert("Eroo")
           
        })
    }

    return (
        <>
        <div>
            <div className={styles.titles}>
                <h2>Tela De Registro simples</h2>
            </div>
            <div className={styles.registerBody}>
                <div className={styles.forms}>
                    <label name="email">Email:</label>
                    <input type="text" onChange={(e) => setEmail(e.target.value)}></input>
                <div className={styles.forms2}>
                    <label name="pass">Password:</label>
                    <input type="password" onChange={(e) => setPassword(e.target.value)}></input>
                </div>
                <button 
                    className={styles.buttonzi}
                    onClick={() => registerAccount()}
                    
                >
                    Salvar
                </button>
        </div>
        <div>
            <span className={styles.span}></span>
        </div>
       
        </div>
    </div>
    </>
    )

}
export default Register