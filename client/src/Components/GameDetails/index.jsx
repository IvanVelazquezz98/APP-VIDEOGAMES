import react from 'react'

import { Link , useParams , useHistory} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react";
import { getVideogames , clearPage, getDetail } from '../../Redux/actions'
import styles from "../GameDetails/GameDetails.module.css"
import Loading from '../Loading';


export default function GamesDetail (id) {

    const detailGame = useSelector((state) => state.detail) 
    const dispatch = useDispatch()
    const gameId = useParams()
    
    const history = useHistory()

    useEffect(() => {
        dispatch(getDetail(gameId.id))

        return() =>{
           dispatch(clearPage())
        }
            
        
    },[dispatch,id])


     function handleReload() {
        history.push('/Home')
        window.location.reload();

    }
  
    return (
        <div >
            <div>
                <div className={styles.firstContainer} >
                
                    <button onClick={(e) => handleReload(e)} className={styles.home} >Go back!</button>

                
            </div>
                
                
             {
                
               (detailGame == !detailGame ) ? //arreglar detail recipe se buguea
                   <div >
                     <Loading></Loading>
                    </div> 
                :
                
                    <div className={styles.innerContainer}>
                        <img className={styles.image} src={detailGame.image}/> 
                        <h1 className={styles.content}>{detailGame.name}</h1>
                        <h3 className={styles.title} >Description</h3>
                        <p className={styles.content} >{detailGame.description ? (detailGame.description) : (<p>-</p>) }</p>                         
                        <h3 className={styles.title} >ReleaseDate</h3>
                        <p className={styles.content} >{detailGame.releaseDate  ? (detailGame.releaseDate) : (<p>-</p>)}</p>
                        <h3 className={styles.title}>Genre</h3>
                        <p className={styles.content}> {detailGame.genre.map(r => (<li key={r}>{r} </li>))}</p>
                        <h3 className={styles.title}>Rating</h3>
                        <p className={styles.content}>{detailGame.rating ? (detailGame.rating) : (<p>-</p>) }</p>
                        <h3 className={styles.title}> Platforms</h3>
                        <p className={styles.content}>{detailGame.platform.map(r => (<li key={r}>{r} </li>))}</p>
                      
                    </div>
                    

                    
                
            }
            </div>
            
        </div>
        
     )

}

