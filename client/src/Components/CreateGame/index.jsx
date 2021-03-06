import React, { useState, useEffect } from "react";
import {  useHistory} from "react-router-dom"
import { postGame } from "../../Redux/actions"
import { useDispatch , useSelector } from "react-redux"
import { allPlatform } from "./platforms";
import styles from '../CreateGame/CreateGame.module.css'


function validate(post){

    let errors = {}
    post.name
    ? (errors.name = "")
    :(errors.name) = "Your game needs a name!"

    post.description
    ? (errors.description = "")
    : (errors.description = "Your game needs a description!")

    post.releaseDate
    ? (errors.releaseDate = "")
    : (errors.releaseDate = "Your game need a release date")
    post.rating
    ? (errors.rating = "")
    :(errors.rating = "Your game need a rating")

   post.image 
   ? (errors.image = "")
   : (errors.image = "Your game need a image!")
   post.platform
   ? (errors.platform = "")
   :(errors.platform = "Your game need a platform!")

 return errors
    }

    
   

export default function GameCreate(){
    const dispatch = useDispatch()
    const history = useHistory()
    const allGenre = useSelector((state) => state.genres)
    

    
    function handleReload() {
        history.push('/Home')
        window.location.reload();
    }
    const [errors, setErrors] = useState({
            name: "",
            description: "",
            releaseDate: "",
            image: "",
            rating: "",     
            platform: [],
            genres: []
    })

    const [post, setPost] = useState({
            name: "",
            description: "",
            releaseDate: "",
            image: "",
            rating: "",     
            platform: [],
            genres: []
    })

    function handleChange(e){
       e.preventDefault();
        setPost({
            ...post,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...post,
            [e.target.name]: e.target.value
        }))
    }

    
    function handleSelect(e){
        e.preventDefault();
                setPost({
                    ...post,
                    genres: [...new Set ([...post.genres , e.target.value])]
                })   
         }
    function handleGenreDelete(deleteThis){
             setPost({
                  ...post,
                  genres: [...post.genres.filter(g =>{return g !== deleteThis})]
            }) 
        }

    function handleSelectPlatform(e){
       e.preventDefault();
        setPost({
            ...post,
            platform:[...new Set ([...post.platform ,e.target.value])]
        })
    }

    function handleDeletePlatform(deleteThis){
        setPost({
            ...post,
            platform: [...post.platform.filter(pp =>{return pp !== deleteThis})]
        })
    }
    
    

    function handleSubmit(e){
        var videogame;
        const maximo = 50
        const rMaximo = 5
        const rMinimo = 0

        if(!post.name ){
            e.preventDefault()
            return alert("The recipe needs a name")
        } if (post.name.length > maximo){
            e.preventDefault()
            return alert("the name cannot exceed 50 characters")
        }
        else if(!post.description) {
            e.preventDefault()
            return alert ("The recipe needs a description")    
        } 
        else if(!post.platform) {
            e.preventDefault()
            return alert ("The recipe needs a platform")    
        } 
        else if(post.platform.length > 100){
           e.preventDefault()
            return alert ("platform cannot have as many characters")
        }
        else if(post.rating < rMinimo && post.rating > rMaximo) {
            e.preventDefault()
             return alert ("The game needs a valid rating")   
        } 
        else if (!post.rating){
            e.preventDefault()
            return alert ("The game needs a rating")
        }
        else if (!post.releaseDate){
            e.preventDefault()
            return alert ("The game needs a release date")
        }
        else if(post.releaseDate.length < 5 ){
            e.preventDefault()
            return alert ("You entered an invalid release date")
        }
        else if(!post.genres.length){
           e.preventDefault()
            return alert("You need to add at least one genre for the game")
        } else {
            if(!post.image.includes("https://") && !post.image.includes("http://")){
                e.preventDefault()
                return alert ("This isn't a valid image address")}
            else{
                videogame = {
                name: post.name,
                description: post.description,
                releaseDate: post.releaseDate,
                image: post.image,
                rating: post.rating,     
                platform: post.platform,
                genres: post.genres
                }
            }

           dispatch(postGame(videogame))
            alert("Game sucessfully created!")
            setPost({
                title: "",
                description: "",
                releaseDate: "",
                image: "",
                rating: "",
                platform:[],
                genres: []
                })
            
         }
        }
    
    return(
        <div className={styles.firstContainer}>
            <div >
                <button onClick={(e) => handleReload(e)} className={styles.home} >HOME</button>
            </div>
                <h1 className={styles.gameContainer}>Create your own Game</h1>
            <form >
            <div  className={styles.gameContainer}>
                <label className={styles.title} >Name</label>
                <input className={styles.imput} type="text" value={post.name} name="name" onChange={(e) => handleChange(e)} ></input>
                {errors.name && (<p className={styles.errors}>{errors.name}</p>)}
            </div>
            <div className={styles.gameContainer}>
                <label className={styles.title}>Description</label>
                <textarea className={styles.imput} type="text" value={post.summary} name="description" maxLength="2000" onChange={(e) => handleChange(e)}></textarea>
                {errors.description && (<p className={styles.errors}>{errors.description}</p>)}
            </div>
            <div className={styles.gameContainer}>
                <label className={styles.title} >releaseDate</label>
                <input className={styles.imput} type="date" value={post.releaseDate} name="releaseDate" onChange={(e) => handleChange(e)}></input>
                {<p >{post.releaseDate}</p>}
                {errors.releaseDate && (<p className={styles.errors}>{errors.releaseDate}</p>)}
            </div>
            <div className={styles.gameContainer}>
                <label className={styles.title}>Image URL</label>
                <input className={styles.imput} type="url" value={post.image} name="image" onChange={(e) => handleChange(e)}></input>
                {errors.image && (<p className={styles.errors}>{errors.image}</p>)}
            </div>
            <div className={styles.gameContainer}>
                    <label className={styles.title}>Rating</label>
                    <input className={styles.imput} type="Number" value={post.rating} name="rating" min= "0" max= "5" step="0.1" onChange={(e) => handleChange(e)}></input>
                    {errors.rating && (<p className={styles.errors}>{errors.rating}</p>)}
            </div>
            <div className={styles.gameContainer}>
                    <label className={styles.title}>select Platforms</label>
                    <select className={styles.imput} defaultValue="default" onChange={(e)=> handleSelectPlatform(e)}>
                    <option value="default" hidden name="platform" >Select Platforms</option>
                    {allPlatform && allPlatform?.map((p) => {
                    return ( <option value={p.name} key={p.name}>{p.name}</option>)
                    })
                    } 
                    </select>
                    <ul className={styles.gameContainer}>
                    <h5>                            
                            {post.platform.map(p => 
                            <div>
                                <label className={styles.botonDelete} onClick={() => handleDeletePlatform(p)}>x</label>
                                <p>{p}</p>
                            </div>
                            )}
                        </h5> 
                    </ul>
                </div>
                <div className={styles.gameContainer} >
                    <div className={styles.title} >
                    <label >select Genres</label>
                    </div>
                    <select className={styles.imput} onChange={(e)=> handleSelect(e)}>
                    <option value="" hidden name="genre" >Select Genres</option>
                    {allGenre?.map((genres) => {
                    return ( <option value={genres.id} key={genres.id}>{genres.name}</option>)
                    })
                    } 
                    </select>
                    <ul className={styles.gameContainer}>
                    <h5>                            
                            {post.genres.map(g => 
                            <div>
                                <label className={styles.botonDelete} onClick={() => handleGenreDelete(g)}>x</label>
                                <p>{allGenre?.find(element => element.id === g)?.name}</p>
                            </div>
                            )}
                        </h5>
                    </ul>
                </div>
                <div className={styles.gameContainer}>
                <button className={styles.botonCreateGame}  type="submit" onClick={(e) => handleSubmit(e)}>Create Game</button>
                </div> 
           </form>
        </div>
    )
}


