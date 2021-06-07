import React,{ useState, useEffect }from 'react'
const axios = require('axios').default;

export default function Main() {
    const [country, setCountry] = useState("");
    const [capitals, setCapitals] = useState([]);
    

    const url = "https://restcountries.eu/rest/v2/name/"+country;
 

    const FindCountry = (e) =>{
        console.log("pressed")
        axios.get(url).then((res)=> {
            setCapitals(capitals => [...capitals, res.data[0].capital]);
            let array = res.data[0].borders.map(element => {
                return axios.get("https://restcountries.eu/rest/v2/alpha/"+element)
            })
            axios.all(array).then((resps)=> setCapitals(capitals => [...capitals,...resps.map((res)=> res.data.capital)]) )

            })
            }
       
    
    return (
       
        <div>
            <input onChange={(e)=> setCountry(e.target.value)} />
            <button onClick = {FindCountry}>Click me</button>
            {capitals.map((c) => <h1> {c} </h1>)}
        </div>
    )
}
