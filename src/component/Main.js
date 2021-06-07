import React,{ useState, useEffect }from 'react'
const axios = require('axios').default;

export default function Main() {
    const [country, setCountry] = useState("");
    const [capitals, setCapitals] = useState([]);
    const [neigh, setNeigh] = useState();
    const [info, setInfo] = useState()

    const url = "https://restcountries.eu/rest/v2/name/"+country;
 

    const FindCountry = (e) =>{
        
        axios.get(url).then((res)=> {setInfo(res.data);
            capitals.push(res.data[0].capital);
            res.data[0].borders.forEach(element => {
                axios.get("https://restcountries.eu/rest/v2/alpha/"+element)
                .then((res)=>capitals.push(res.data.capital))})})}
       
    
    return (
       
        <div>
            <input onChange={(e)=> setCountry(e.target.value)} />
            <button onClick = {FindCountry}>Click me</button>
            {capitals.map((c) => <h1> {c} </h1>)}
        </div>
    )
}
