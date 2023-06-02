import { Link, useLoaderData } from "react-router-dom"
import { getHostVans } from "../../api"
import { requireAuth } from "../../utils"
export async function loader(){
    await requireAuth()
    return getHostVans()
}

export default function HostVans(){

const vans = useLoaderData()

const render = vans.map(van => {
    return (
        <Link key={van.id} className="host-van-link-wrapper" to={van.id}>
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
                    <section>
                        {render}
                    </section>
            </div>
        </section>
    )
}
