import React, { useState } from 'react';
import styles from '../Cards/Cards.module.css'
import Loading from '../Loading'
import { setFav } from '../../Redux/actions';
import { useDispatch } from 'react-redux';
import { useParams  } from 'react-router-dom';

export default function Card({ image , name , genres , fav }){
    const dispatch = useDispatch()
    const gameId = useParams()


    function handleClick(e){
        dispatch(setFav(fav))
        e.preventDefault();
    }
    return (
        <div className={styles.mainContainer} >
            <img className={styles.image}  src={ !image ? <Loading/> : image} alt="Image not found"/>
            <div className={styles.innerContainer} >
                <h3 className={styles.name}> {name ? name : <Loading/>}</h3>
                <h5 className={styles.genres} >{genres ? genres : <Loading/>}</h5>
                <h5 ><button title="Add to Favorites" className={styles.botonfavorites} onClick={(e) => handleClick(e) } >❤</button></h5>
            </div>
        </div>
    )
}
