import { useState } from "react"
import { Link, useSearchParams, useLoaderData } from "react-router-dom"
import { getVans } from "../../api"

export function loader(){
    return getVans()
}

export default function Vans(){
    const [searchParams,setSearchParams] = useSearchParams()
    const [error,setError] = useState(null)

    const typeFilter = searchParams.get("type")

    const vans = useLoaderData();


const filteredVan = typeFilter ? vans.filter(van => van.type === typeFilter) : vans

const render = filteredVan.map(van => {
    return (
        <div className="vans-container" key={van.id}>
            <Link to={van.id} state={{ search: `?${searchParams.toString()}`,type:typeFilter }}>
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

function handleFilterChange(key, value) {
    setSearchParams(prevParams => {
        if (value === null) {
            prevParams.delete(key)
        } else {
            prevParams.set(key, value)
        }
        return prevParams
    })
}



if(error){
    return <h1>There was an error: {error.message}</h1>
}

    return (
        <div className="vans-page-container">
            <h1>Explore our van options</h1>
                <button
                    onClick={() => handleFilterChange("type", "simple")}
                    className={`van-type simple ${typeFilter === "simple" ? "selected" : ""}`}
                >Simple</button>
                <button
                    onClick={() => handleFilterChange("type", "luxury")}
                    className={`van-type luxury ${typeFilter === "luxury" ? "selected" : ""}`}
                >Luxury</button>
                <button
                    onClick={() => handleFilterChange("type", "rugged")}
                    className={`van-type rugged ${typeFilter === "rugged" ? "selected" : ""}`}
                >Rugged</button>

                {typeFilter ? (
                    <button
                        onClick={() => handleFilterChange("type", null)}
                        className="van-type clear-filters"
                    >Clear filter</button>
                ) : null}
                <div className="vans">
                    {render}
                </div>
        </div>
    )
}