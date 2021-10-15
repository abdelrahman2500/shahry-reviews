import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import data from '../data.json'

export const Context = createContext()

export function ContextProvider(props){

    // initial state of products
    const[user, setUser] = useState([])
    const[reviews, setReviews] = useState([])

    const[stars, setStars]= useState(Array(5).fill("icon"))
    const[starNum, setStarNum] = useState(5)


    // set Users = all users data
    useEffect(()=>{
        axios
            .get("https://randomuser.me/api/")
            .then(res => {
                const usersData = res.data.results
                setUser(usersData)
                // console.log(res.data.results)
        })
    }, [setUser])

    useEffect(() => {
        setReviews(localStorage.getItem("reviews") ? JSON.parse(localStorage.getItem("reviews")) : data.reviews )
        localStorage.setItem("reviews", localStorage.getItem("reviews") ? localStorage.getItem("reviews") : JSON.stringify(data.reviews))
    }, [setReviews])

    function addReview(){
        console.log(JSON.parse(localStorage.getItem("reviews")))
    }


    function showStars(num, edit=false){
        return (
            <span className=" p-2 m-0">{stars.map((_,i) => i < 5 ?<span onClick={()=> edit == true ? setStarNum(i+1): ""} key={i} ><i className={`star fas fa-star ${i< num  ? "text-warning" : "text-muted"}`}></i></span> : "" )}</span>
        )
    }



    return(
        <Context.Provider value={{ user, setUser, reviews, setReviews, addReview , showStars,starNum, setStarNum}}>
            {props.children}
        </Context.Provider>
    )
}