
import server from "../server"
import { useParams,NavLink,Link,Outlet } from "react-router-dom"
import { useEffect,useState } from "react"


export default function HostCurrentVanDetail(){
    const params = useParams();
    const [currentVan,setCurrentVan] = useState(null)

    const activeStyles = {
        fontWeight: "bold",
        textDecoration: "underline",
        color: "#161616"
    }

    useEffect(() => {
        async function getCurrentVan(){
            const res = await fetch(`/api/host/vans/${params.id}`)
            const data = await res.json();
            setCurrentVan(data.vans);
        }
        getCurrentVan()
    },[])

    if(!currentVan) return <h1>Loading...</h1>

    return (
    <section>
       <Link to=".." relative="path" className="back-button">&larr; <span>Back to all vans</span></Link>
       <div className="host-van-detail-layout-container">
            <div className="host-van-detail">
                <img src={currentVan.imageUrl}/>
                <div className="host-van-detail-info-text">
                    <i className={`van-type selected ${currentVan.type}`}>{currentVan.type}</i>
                    <h3>{currentVan.name}</h3>
                    <h4>${currentVan.price}/day</h4>
                </div>
            </div>
        <nav className="host-van-detail-nav">
        <NavLink style={({isActive}) => isActive ? activeStyles : null} to="." end>Details</NavLink>
        <NavLink style={({isActive}) => isActive ? activeStyles : null} to="pricing">Pricing</NavLink>
        <NavLink style={({isActive}) => isActive ? activeStyles : null} to="photos">Photos</NavLink>
        </nav>
        <Outlet context={currentVan}/>
        </div>
    </section>
    )
}