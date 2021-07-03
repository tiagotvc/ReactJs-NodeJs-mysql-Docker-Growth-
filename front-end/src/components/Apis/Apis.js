import React, { useEffect, useState } from 'react';
import qs from 'qs';
import axios from 'axios';
import SearchInput from '../SearchInput/SearchInput';
import Pagination from '../Pagination/Pagination';
import Login from '../Login/Login';
import styles from '../../App.module.css';
import md5 from 'md5';  
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'



export default function Apis() {
  const [info, setInfo] = useState({});
  const [loginStatus, setLoginStatus] = useState(false);
  const [text, setText] = useState('');
  const [nameStartsWith, setnameStartsWith] = useState('');
  const [offset, setOffset] = useState(0);
  const [marvel, setMarvel] = useState(true);
  const [animes , setAnime] = useState(false);
  const [marvelChars, setMarvelChars] = useState({});
  const [marvelCount, setMarvelCount] = useState();
  const [userId, setUserId] = useState(0);
  const [API , setAPI] = useState('')
  const time = Number(new Date());
  const privateKey = 'e7942b2018c6d1d4eced6cc1893097d3276492d3';
  const publicKey = 'a999aa7bdb306e733caacc3fbebeebfd';
  const hash = md5(time + privateKey + publicKey);
  const api = 'https://kitsu.io/api/edge/';
  const api_2 = 'https://gateway.marvel.com:443/v1/public/characters';
  const LIMIT = 16;
  

  useEffect(() => {
      setInfo({});
      setMarvelChars({});
      const user = localStorage.getItem("user")
      setUserId(user);

      async function userAuthenticated(){
        await axios.post("http://localhost:3007/isUserAuth", {
            headers:{
                "x-acess-token": localStorage.getItem("token"),
            },
        }).then((response) => {
            if(response.data.auth){
                setLoginStatus(true);
            }
            else{
                setLoginStatus(false);
                localStorage.clear();
            }
        });
    };

    
     


     

      

      if(API == 'MARVEL'){
        setMarvel(true);
        setAnime(false);
      }else{
        setMarvel(false);
        setAnime(true);
      }
      
      const query = {
        page: {
          limit: LIMIT,
          offset,
        }
      };

      var query2 = {
        limit:LIMIT,
        offset,
      }

      if (text || nameStartsWith){
        query.filter = {
          text,
        };
        query2 = {
          nameStartsWith,
        }
        setOffset(0)
      }

    
      fetch(`${api_2}?ts=${time}&apikey=${publicKey}&hash=${hash}&${qs.stringify(query2)}`)
          .then((response) => response.json())
          .then((response) => {
            setMarvelChars(response.data);
            setMarvelCount(response.count);
      });
        
      fetch(`${api}anime?${qs.stringify(query)}`)
        .then((response) => response.json())
        .then((response) => {
          setInfo(response);
    });

    userAuthenticated()  
  }, [text, offset, nameStartsWith, API]);


  async function addFavorites(imgLink, title, userId){
    await axios.post("http://localhost:3007/addFavoritos",{
      title:title,
      urlLink:imgLink,
      userId:userId
    }).then((response) =>{
        if(response.data.status == 200){
            alert("Add sucess")

        }else if (response.data.status == 150){
            alert("Já faz parte dos seus favoritos")

        }
    }).catch((error) => {

    })
  }

  


  return (
    <>   
    
    <div className={styles.App}>
      <Login />
      <h1 className={styles.title}>APIS</h1>
        <div className={styles.selects}>
          <h4>Selecione:</h4> 
          <select onChange={(e) => setAPI(e.target.value)}>
            <option>MARVEL</option>
            <option>ANIMES</option>
          </select>
        </div>
        {animes &&
          <div>
            <div className={styles.search}>
              <SearchInput
                value={text}
                onChange={(search) => setText(search)}
              />
            </div>
            {text && !info.data && <span>Carregando...</span>}
              {info.data && (
                <ul className={styles['animes-list']}>
                  {info.data.map((anime) => (
                    <li key={anime.id}>
                      <img
                        src={anime.attributes.posterImage.small}
                        alt={anime.attributes.canonicalTitle}
                      />
                        {anime.attributes.canonicalTitle}
                        {loginStatus &&
                      <button 
                        onClick={() => addFavorites(anime.attributes.posterImage.small,anime.attributes.canonicalTitle,userId)}
                        className={styles.favoritos}
                      >
                        Favoritos
                      </button>
                        }
                    </li>
                  ))}
                </ul>
               )}
            {info.meta && (
              <Pagination 
                limit={LIMIT} 
                total={info.meta.count} 
                offset={offset}
                setOffset={setOffset} 
              />
            )}
          </div>
        }
        {marvel &&
          <div>
            <div className={styles.search}>
              <SearchInput
                value={nameStartsWith}
                onChange={(search) => setnameStartsWith(search)}
              />
            </div>
            {nameStartsWith && !info.data && <span>Carregando...</span>}
              {marvelChars.results && (
                <ul className={styles['animes-list']}>
                  {marvelChars.results.map((marvel) => (
                    <li key={marvel.id}>
                      <img
                        src={marvel.thumbnail.path+"."+marvel.thumbnail.extension}
                        alt={marvel.name}
                      />
                      {marvel.name}
                      {loginStatus &&
                      <button 
                        onClick={() => addFavorites(marvel.thumbnail.path+"."+marvel.thumbnail.extension,marvel.name,userId)}
                        className={styles.favoritos}
                      >
                        Favoritos
                      </button>
                        }
                    </li>
                  ))}
                </ul>
              )}
            {marvelChars && (
              <Pagination 
              limit={LIMIT} 
              total={marvelChars.total} 
              offset={offset}
              setOffset={setOffset} 
            />
          )}
          </div>
        } 
    </div>
    </>
  );
}