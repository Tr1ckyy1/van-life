import server from "../../server"
import { useEffect , useState } from "react"
import { Link } from "react-router-dom"


export default function HostVans(){

const [vans,setVans] = useState([])


useEffect(() => {
    async function getVans(){
        const res = await fetch(`/api/host/vans`)
        const data = await res.json();
        setVans(data.vans)
    }
    getVans()
},[])

const render = vans.map(van => {
    return (
        <Link key={van.id} className="host-van-link-wrapper" to={`/host/vans/${van.id}`}>
            <div className="host-van-single">
                    <img src={van.imageUrl}/>
                    <div className="host-van-info">
                        <h3>{van.name}</h3>
                        <p>${van.price}/day</p>
                    </div>
            </div>
        </Link>
    )
})
    return (
        <section>
            <h1 className="host-vans-title">Your listed vans</h1>
            <div className="host-vans-list">
                {vans.length > 0 ? (
                    <section>
                        {render}
                    </section>

                ) : (
                    <h2>Loading...</h2>
                )
                }
            </div>
        </section>
    )
}
