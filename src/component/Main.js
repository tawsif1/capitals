import React,{ useState, useEffect }from 'react';
import "./main.css";
const axios = require('axios').default;

export default function Main() {
    const [country, setCountry] = useState("");
    const [capitals, setCapitals] = useState([]);
    const [flag,setFlag]= useState(true);
    

    const url = "https://restcountries.eu/rest/v2/name/"+country;
 

    const FindCountry = (e) =>{
        setCapitals([])
        console.log("pressed")
        axios.get(url).then((res)=> {
            setCapitals(capitals => [...capitals, res.data[0].capital]);
            setFlag(true);
            let array = res.data[0].borders.map(element => {
                return axios.get("https://restcountries.eu/rest/v2/alpha/"+element)
            })
            axios.all(array).then((resps)=> setCapitals(capitals => [...capitals,...resps.map((res)=> res.data.capital)]) )

            }).catch(() =>{setFlag(false)}

            )
            }
       
    
    return (
       
        <div className="body">
            <h1 className="header">Know Your capitals</h1>
            <input placeholder="Country" className="input" onChange={(e)=> setCountry(e.target.value)} />
            <button className="button" onClick = {FindCountry}>Search Capital</button>
            { flag && capitals.map((c) => <h2> {c} </h2>)}
            {!flag && <h2>Enter A Valid Country</h2>}
        </div>
    )
}
