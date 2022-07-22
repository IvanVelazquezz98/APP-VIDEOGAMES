import react from 'react'

import { useParams , useHistory} from "react-router-dom"
import { useDispatch , useSelector } from "react-redux"
import { useEffect } from "react";
import { clearPage, getDetail ,deletedGame} from '../../Redux/actions'
import styles from "../GameDetails/GameDetails.module.css"
import Loading from '../Loading';


export default function GamesDetail () {

    const detailGame = useSelector((state) => state.detail) 
    const dispatch = useDispatch()
    const {id} = useParams()
    
    const history = useHistory()

    useEffect(() => {
        dispatch(getDetail(id))

        return() =>{
           dispatch(clearPage())
        }
    },[dispatch])

    function handledeletedGame(e){
        dispatch(deletedGame(id))
        history.push('/Home')
        return alert("Game deleted")
    }


    function handleReload() {
        history.push('/Home')
    }
  
    return (
        
            <div>
                <div className={styles.firstContainer} >
                    <button onClick={(e) => handleReload(e)} className={styles.home} >HOME</button>
            </div>
                <div className={styles.mainContainer}>
             {
               (detailGame == !detailGame ) ? 
                   <div >
                     <Loading></Loading>
                    </div> 
                :
                
                    <div className={styles.mainContainer}>
                        <img className={styles.image} src={detailGame.image ? (detailGame.image) : (<p>Image not found</p>) }/> 
                        <h1 className={styles.content}>{detailGame.name ? (detailGame.name) : (<p>-</p>)}</h1>
                        <h3 className={styles.title} >Description</h3>
                        <p className={styles.content} >{detailGame.description ? (detailGame.description) : (<p>-</p>) }</p>                         
                        <h3 className={styles.title} >ReleaseDate</h3>
                        <p className={styles.content} >{detailGame.releaseDate  ? (detailGame.releaseDate) : (<p>-</p>)}</p>
                        <h3 className={styles.title}>Genre</h3>
                        <p className={styles.content}> {!detailGame.genres ? (<p>-</p>) : detailGame.genres.map(r => (<li key={r.name}>{r.name} </li>))}</p>
                        <h3 className={styles.title}>Rating</h3>
                        <p className={styles.content}>{detailGame.rating ? (detailGame.rating) : (<p>-</p>) }</p>
                        <h3 className={styles.title}> Platforms</h3>

                        { (detailGame.id.length > 8 )?
                        <div className={styles.mainContainer}>
                        <p className={styles.contentC}>{ detailGame.platform.replace("{",'' ).replace("}",'').replace( /['"]+/g,'')}</p>
                        <button className={styles.deletedGame} onClick={(e) => handledeletedGame(e)}>Deleted Game</button>
                        </div>
                       :
                       <p className={styles.content}> { detailGame.platform.map(r => (<li key={r.name}>{r.name} </li>))} </p>
                        }

                    </div>   
            }
            </div> 
            </div>
            
        
        
     )

}

