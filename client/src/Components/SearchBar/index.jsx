import React from "react"
import {useState , useEffect} from "react"
import { useDispatch  } from "react-redux";
import {  searchGame } from "../../Redux/actions";
import styles from '../SearchBar/SearchBar.module.css'


export default function SearchBar({title , setCurrentPage}){
    const dispatch = useDispatch()
    const [name, setName] = useState("")
    
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
       
    }

     function handleSubmit(e){ 
        
        if(!name){ 
        alert("enter a valid name") 
        }else{ 
         
        dispatch(searchGame(name))
        setName(e.target.value); 
        setName("") 
        setCurrentPage(1)
        console.log(e)
         e.preventDefault();
        } 
        }
    

  
    return (
        <div className={styles.searchContainer}>
            
            <input className={styles.imput} type="text" placeholder="Search Game..." onChange={(e) => handleInputChange(e)}></input>
            <button className={styles.boton} type="submit"  onClick={ (e) => handleSubmit(e) }>Search</button>
            </div>
            )
    }