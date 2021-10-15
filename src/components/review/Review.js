import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import { Context } from './../../context/ContextApi';

export default function Review(props) {
    const context = useContext(Context)
    let review = props.review

    const[comment, setComment] = useState("")

    useEffect(()=>{
        context.setReviews(context.reviews)
    },[addComment])

    function addComment(reviewComments){
        if(comment.trim()){
            reviewComments.push({
                id: reviewComments.length+1,
                img: context.user[0].picture.thumbnail,
                content: comment
            })
            props.setReviews(context.reviews)
            localStorage.setItem("reviews", JSON.stringify(context.reviews))
            setComment("")
            console.log(context.reviews)
        } else {
            console.log("no")
        }
    }
    
    return (
        <div className="review px-5 py-3 bg-white position-relative rounded shadow w-100 text-center mb-5">
            <div className="user-photo position-absolute">
                <img src={review.user.img} className="rounded-circle position-absolute" alt={review.user.name.first} />
            </div>
            <div className="review-data mt-5">
                <h4 className="mb-3">{`${review.user.name.first} ${review.user.name.last}`}</h4>
                <span className="date d-block text-black-50 mb-4">
                    {`${review.date.day} ${review.date.month} ${review.date.year}`}
                </span>
                <h3 className="mb-4">{review.title}</h3>
                <div className="rating d-flex justify-content-center mb-4">
                    <div className={`thumb p-2 ${review.rating >=4 ? "bg-success" : "bg-danger"}`}>
                        <i className={`fas 5x fa-thumbs-${review.rating >=4 ? "up" : "down"}`}></i>
                    </div>
                    <div className="stars border p-2">
                        {context.showStars(review.rating)}
                        <span>{review.rating}/5</span>  
                    </div>
                </div>
                <div className="details text-start mb-4">
                    <p className="lead">{review.details}</p>
                </div>
                <div className="comments text-start">
                    {review.comments.length >=1 ? 
                        review.comments.map(comment => 
                            <div className="comment bg-white-75 p-3 position-relative" key={comment.id}>
                                <p className="fw-bold">{comment.content}</p>
                                <div className="img-box position-absolute">
                                    <img src={comment.img} alt="comment" />
                                </div>
                            </div>
                        )
                    : ""
                    }
                </div>
                <div className="add-comment row">
                    <div className="col-12 mb-2">
                        <textarea type="text" className="form-control " value={comment} onChange={(e)=> setComment(e.target.value)} placeholder="Add A Comment ..." ></textarea>
                    </div>
                    <div className="col-12">
                        <button className="btn" onClick={()=> addComment(review.comments)}>Comment</button>
                    </div>
                </div>
            </div>
            {/* {console.log(props.review)} */}

        </div>
    )
}
