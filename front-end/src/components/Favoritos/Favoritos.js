import React, { useEffect , useState} from 'react';
import axios from 'axios';
import styles from '../../App.module.css'
import {Link, Route} from 'react-router-dom'


export default function Favoritos(){
    const [info, setInfo] = useState([]);
    const [userId, setUserId] = useState();

    useEffect(() => {
        const userId = localStorage.getItem("user");
        setUserId(userId)
       

         async function getFavoritos(res , error){
            await axios.post("http://localhost:3007/getFavoritos",{
                userId:userId
            }).then((response) => { 
                if(!response){
                   
                }else{
                    setInfo(response) 
                }
            }).catch((error) => {
                
            })
        } 

        getFavoritos()
       
    }, [])


    return (

        <div className={styles.App}>
            <h1 className={styles.title}>Favoritos</h1>
            <div className={styles.link}>
                <Route>
                    <Link to="/">Inicio</Link>
                </Route>
            </div>
            
            

        {info.data.length > 0?
        <div>
          {info.data && (
            <ul className={styles['animes-list']}>
              {info.data.map((favoritos) => (
                <li key={favoritos.id}>
                  <img
                    src={favoritos.imgUrl}
                    alt={favoritos.title}
                  />
                  {favoritos.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        :
        <div>
            <span>Ainda não existem favoritos para esse usuarios</span>
        </div>
        }
        </div>
    )}

