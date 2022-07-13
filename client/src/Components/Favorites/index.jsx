import React from 'react';
import styles from '../Favorites/Favorites.module.css'
import Loading from '../Loading'
import { useSelector , useDispatch } from 'react-redux';
import { Link , useParams , useHistory} from "react-router-dom";
import { delFav } from '../../Redux/actions';
export default function Favorites(){
    const favGame = useSelector((state) => state.favGames) 
    const history = useHistory()
    const dispatch = useDispatch()

    function handleReload() {
        history.push('/Home')
        
    }

    function handleDelete(game){
        dispatch(delFav(game))
    }

    return (
        <>
        <div className={styles.firstContainer} >
                
            <button className={styles.home} onClick={(e) => handleReload(e)} >HOME</button>
        <h1>Favorites</h1>
        {
            (favGame == !favGame)?
            <div>No registered favorite games found... <Loading/> </div>
            : favGame.map(game => {
                return (
                    <div className={styles.mainContainer}>
                        <div className={styles.innerContainer}>
                    <Link className={styles.Link} to={`/videogames/${game.id}`}> 
                    <img className={styles.image} src={game.image} />
                    <h3 className={styles.name}>{game.name} </h3></Link>
                    </div>
                    <button className={styles.botonDelete} onClick={(e) => {handleDelete(game)}}>X</button>
                 </div>)
            })
        } 

        </div>
        </>
    )
}