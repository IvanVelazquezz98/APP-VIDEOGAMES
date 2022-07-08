import React from 'react';
import styles from '../Cards/Cards.module.css'
export default function Card({ image , name , genres }){

    return (
        <div className={styles.mainContainer} >
            <img className={styles.imagen} src={image} alt="Imagen no encontrada"/>
            <div className={styles.innerContainer} >
                <h3 className={styles.name}> {name}</h3>
                <h5 className={styles.genres} >{genres ? genres : <p>-</p>}</h5>
            </div>
        </div>
    )
}
