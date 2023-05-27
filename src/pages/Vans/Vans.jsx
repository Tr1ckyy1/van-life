import { useState,useEffect } from "react"
import server from "../../server"
import { Link } from "react-router-dom"


export default function Vans(){

const [vans, setVans] = useState([])

useEffect(() => {
    async function fetchData(){
        const res = await fetch('/api/vans')
        const data = await res.json()
        setVans(data.vans)
    }
    fetchData()
},[])



const render = vans.map(van => {
    return (
        <div className="vans-container" key={van.id}>
            <Link className="van-link" to={`${van.id}`}>
                <img src={van.imageUrl}/>
                <div className="van-info">
                <h3>{van.name}</h3>
                <p>${van.price}<span>/day</span></p>
                </div>
                <i className={`van-type ${van.type} selected`}>{van.type}</i>
            </Link>
        </div>
    )
})
    return (
        <div className="vans-page-container">
            <h1>Explore our van options</h1>
                {/* <div className="filter">
                    <button className="filter-btn">Simple</button>
                    <button className="filter-btn">Luxury</button>
                    <button className="filter-btn">Rugged</button>
                    <button className="clear-filter-btn">Clear filters</button>
                </div> */}
                <div className="vans">
                    {render}
                </div>
        </div>
    )
}