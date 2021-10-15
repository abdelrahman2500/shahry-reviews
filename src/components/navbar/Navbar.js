import React, { useContext, useEffect, useState } from 'react'
import "./index.scss"
import { Context } from './../../context/ContextApi';

export default function Navbar() {
    const context = useContext(Context)
    const [user, setUser] = useState({})

    useEffect(()=>{
        setUser((context.user)[0])
    },[context.user])

    return (
        <div className="navbar-comp bg-white">
            {user && user.id? 
                <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light bg-white">
                    <div className="container-fluid">
                        <a className="navbar-brand" href="#">
                            <img className="w-100" src={"https://d2k2fr4kgoo5so.cloudfront.net/vue/img/logo.ea876b95.svg"} alt="" width="30" height="24" />
                        </a>
                        <form className="d-flex align-items-center">
                            <img className="rounded-circle me-2" src={user.picture.thumbnail} alt={user.name.first} />
                            <h5 className="m-0">{`${user.name.first} ${user.name.last}`}</h5>
                        </form>
                    </div>
                </nav>
                </div>
            : ""}
        </div>
    )
}
