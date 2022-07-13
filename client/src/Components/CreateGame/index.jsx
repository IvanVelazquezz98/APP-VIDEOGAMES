import React, { useState, useEffect } from "react";
import { Link , useHistory } from "react-router-dom"
import { postGame } from "../../Redux/actions"
import { useDispatch , useSelector } from "react-redux"
import styles from '../CreateGame/CreateGame.module.css'


function validate(post){


    let errors = {}
    post.name
    ? (errors.name = "")
    :(errors.name) = "Your game needs a name!"

    post.description
    ? (errors.description = "")
    : (errors.description = "Your game needs a description!")

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
    const [errors, setErrors] = useState({})

    const [post, setPost] = useState({
            name: "",
            description: "",
            releaseDate: "",
            image: "",
            rating: "",     
            platform: "",
            genres: []
    })

    function handleChange(e){
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
 
                setPost({
                    ...post,
                    genres: [...new Set ([...post.genres , e.target.value])]
                })
               
         }
    
    
   

    function handleGenreDelete(deleteThis){
        setPost({
            ...post,
            genres: post.genres.filter(g => g !== deleteThis)
        })
    }

    function handleSubmit(e){
        const maximo = 35
        const rMaximo = 5
        const rMinimo = 0

        if(!post.name ){
            e.preventDefault()
            return alert("The recipe needs a name")
        } if (post.name.length > maximo){
            e.preventDefault()
            return alert("the name cannot exceed 35 characters")
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
        
        else if(!post.genres.length){
            e.preventDefault()
            return alert("You need to add at least one genre for the game")
        } else {
            if(!post.image.includes("https://") && !post.image.includes("http://")){
                e.preventDefault()
                return alert ("This isn't a valid image address")}
   

           dispatch(postGame(post))
            alert("Game sucessfully created!")
            setPost({
                title: "",
                description: "",
                releaseDate: "",
                image: "",
                rating: "",
                platform: "",
                genres: []
                })
            history.push('/home')
           
             
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
                    <label >Name</label>
                    <input className={styles.imput} type="text" value={post.name} name="name" onChange={(e) => handleChange(e)} ></input>
                    {errors.name && (<p >{errors.name}</p>)}
                </div>
                <div className={styles.gameContainer}>
                    <label >Description</label>
                    <textarea className={styles.imput} type="text" value={post.summary} name="description" maxLength="1000" onChange={(e) => handleChange(e)}></textarea>
                    {errors.description && (<p>{errors.description}</p>)}
                </div>
                <div className={styles.gameContainer}>
                    <label >releaseDate</label>
                    <input className={styles.imput} type="date" min="0" max="100" value={post.releaseDate} name="releaseDate" onChange={(e) => handleChange(e)}></input>
                    {<p >{post.releaseDate}</p>}
                </div>
                <div className={styles.gameContainer}>
                    <label >Image URL</label>
                    <input className={styles.imput} type="url" value={post.image} name="image" onChange={(e) => handleChange(e)}></input>
                </div>
                <div className={styles.gameContainer}>
                                    <label>Rating</label>
                                    <input className={styles.imput} type="Number" value={post.rating} name="rating" min= "0" max= "5" step="0.1" onChange={(e) => handleChange(e)}></input>
                                    {errors.rating && (<p >{errors.rating}</p>)}
                </div>
                <div className={styles.gameContainer}>
                                    <label>Platform</label>
                                    <textarea className={styles.imput} type="text" value={post.platform} name="platform" onChange={(e) => handleChange(e)}></textarea>
                                    {errors.platform && (<p >{errors.platform}</p>)}
                </div>
                <div className={styles.gameContainer} >
                    <select  onChange={(e)=> handleSelect(e)}>
                        <option value="" hidden name="genre" >Select Genres</option>
                            {allGenre?.map((genres) => {
                            return ( <option value={genres.id} key={genres.id}>{genres.name}</option>)
                            })
                            } 
                    </select>
                    <ul className={styles.gameContainer}>
                    
                        <p>                            
                            {post.genres.map(g => 
                            <div>
                                <p>{allGenre?.find(element => element.id === g)?.name}</p>
                                <button className={styles.botonDelete} onClick={() => handleGenreDelete(g)}>x</button>
                            </div>
                            )}
                        </p>
                       
                    </ul>
                </div>
                <div className={styles.gameContainer}>
                <button className={styles.botonCreateGame}  type="submit" onClick={(e) => handleSubmit(e)}>Create Game</button>
                </div> 
           </form>
            
        </div>
    )


}


