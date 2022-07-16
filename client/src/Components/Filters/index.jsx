import react from 'react'
import {  useEffect } from 'react';
import { useHistory} from "react-router-dom"
import { useDispatch , useSelector  } from 'react-redux';
import {getGenres, getVideogames , orderByName
    ,orderByRating , filteredGenre ,filteredPlatform} from '../../Redux/actions';
import styles from '../Filters/Filters.module.css'
import {allPlatform} from '../CreateGame/platforms'


export default function Filters ({setOrder , setScore , setCurrentPage}) {

    const dispatch = useDispatch() 
    const allGames = useSelector((state) => state.allGames)
    const allGenre = useSelector((state) => state.genres)
    const history = useHistory()

    useEffect(() => {
        dispatch(getVideogames())

    },[dispatch])

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])

    function handleReload() {
        window.location.reload();
    }

    function handleSortedGameName(e){
        dispatch(orderByName(e.target.value))
        
        setOrder(e.target.value)
        e.preventDefault()
    }

    function handleSortedGameRating(e){
        dispatch(orderByRating(e.target.value))
        
        setScore(e.target.value)
        e.preventDefault();
    }
    function handleFilteredGenre(e){
        dispatch(filteredGenre(e.target.value))
        
        e.preventDefault();
    }
    function handleFilteredPlatform(e){
        dispatch(filteredPlatform(e.target.value))
        
        e.preventDefault()
    }

    return(
    <div>
        <div className={styles.inputContainer}>
        <select  onChange={e => handleSortedGameName(e)}>
                <option value="" >Select Order Name</option>
                <option value= "Asc">Ascendant</option>
                <option value ="des">Descendant</option>
        </select>
        <select  onChange={e => handleSortedGameRating(e)}>
                <option value="" >Order By Rating Score</option> 
                <option value="MAX RATING">Max Rating</option>
                <option value="MIN RATING">Min Rating</option>
        </select>
        <select onChange={e => handleFilteredGenre(e)}>
                    <option value="">Select Genre</option>
                    <option value="">All</option>
                    {allGenre.map((g) => (
                    <option value={g.name} key={g.id}>{g.name}</option>
                    ))}
         </select>
         <select onChange={e => handleFilteredPlatform(e)}>
                    <option value="">Select Platform</option>
                    <option value="">All</option>
                    {allPlatform.map((p) => (
                    <option value={p.name} key={p.name}>{p.name}</option>
                    ))}
         </select>
             <button className={styles.botonreload} onClick={(e) => handleReload(e)}  >↻</button>
        </div>

    </div>

    )
}
