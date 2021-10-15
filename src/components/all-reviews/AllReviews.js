import React, { useContext, useState } from 'react'
import "./index.scss"
import { Context } from './../../context/ContextApi';
import { useEffect } from 'react';
import Review from './../review/Review';

export default function AllReviews() {
    const context = useContext(Context)
    const [reviews, setReviews] = useState([])
    const[starNum, setStarNum] = useState(context.starNum)
    const[title, setTitle] = useState("")
    const[details, setDetails] = useState("")
    const[reviewOk, setReviewOk]= useState("")
    const[titleValid, setTitleValid]= useState("")
    const[detailsValid, setDetailsValid]= useState("")

    useEffect(()=>{
        setStarNum(context.starNum)
    },[context.starNum, context.setStarNum])

    useEffect(()=>{
        setReviews(context.reviews)

        // localStorage.setItem("reviews", reviews)
    },[setReviews, context.setReviews])

    useEffect(()=>{
        setReviewOk(title && details ? "modal" : "")
    },[title , details])

    useEffect(()=>{
        if(title.trim()){
            setTitleValid("")
        }
    },[title])


    useEffect(()=>{
        if(details.trim()){
            setDetailsValid("")
        }
    },[details])
    

    function addReview(){
        // console.log("test")
        let newReview = {}
        
        if(title.trim()){
            console.log("title ok")
            setTitleValid("")
        } else {
            setTitleValid("error")
            console.log("title cancel")
        }

        if(details.trim()){
            console.log("details ok")
            setDetailsValid("")
        }
        else{
            console.log("details cancel")
            setDetailsValid("error")
        }
        let today = new Date()
        if(title.trim() && details.trim()){
            console.log("all ok")
            newReview = {
                id: context.reviews.length + 1,
                user:{
                    id:context.user[0].id.value,
                    img:context.user[0].picture.thumbnail,
                    name:{
                        first: context.user[0].name.first,
                        last: context.user[0].name.last
                    }
                } ,
                date: {
                    day: today.getDay(),
                    month: today.toLocaleString('default', { month: 'long' }),
                    year: today.getFullYear()
                },
                title: title,
                rating: context.starNum,
                details: details,
                comments: [
                    
                ] 
            } 
            // console.log(context.user[0].id.value)
            
            setReviews(context.reviews.unshift(newReview))
            // context.setReviews(context.reviews.push(newReview))
            localStorage.setItem("reviews", JSON.stringify(context.reviews))
            console.log(context.reviews)
            setReviewOk(true)
            setDetails("")
            setTitle("")
        } else{
            console.log("all cancel")
        }

    }

    

    return (
        <div className="all-reviews position-relative">
            <div className="img-box">
                <img className="" src={process.env.PUBLIC_URL + "/images/toa-heftiba-FV3GConVSss-unsplash.jpg"} />
            </div>
            <div className="reviews position-absolute text-center">
                <h2 className="h1 text-uppercase text-white fw-bold mb-4">
                    what our users say about shahry?
                </h2>
                <button className="btn btn-light text-success text-uppercase px-5 fw-bold mb-4"  data-bs-toggle="modal" data-bs-target="#exampleModal">add review</button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Add A Review</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <h5>rating</h5>
                                {starNum == context.starNum ? context.showStars(starNum, true): ""}
                                <h5 className="mt-4">review title</h5>
                                <input className={`${titleValid} form-control bg-light`} type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                                <h5 className="mt-4">review details</h5>
                                <textarea className={`${detailsValid} form-control bg-light`} type="text" value={details} onChange={(e) => setDetails(e.target.value)} />
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" className="btn btn-success" data-bs-dismiss={reviewOk} onClick={()=> addReview()}>Add Review</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="rev-content">
                    {
                        context.reviews.map(review => 
                            <div className="inner-content" key={review.id}>
                                <Review review={review} reviews={reviews} setReviews={setReviews} />
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
