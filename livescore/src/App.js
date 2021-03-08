// import logo from './logo.svg';
import React ,{useState,useEffect,Fragment }from 'react';
import './App.css';
// import {Button} from "@material-ui/core"; 
import Navbar from "./components/Navbar";
import MyCard from "./components/MyCard";
import getMatches from "./api/Api";
import {Grid} from "@material-ui/core";
// import {Fragment} from "@material-ui/core"; 
function App() {
const [matches, setMatches] = useState([]);




  useEffect(() => {
    {getMatches()
      .then((data)=>{
        setMatches(data.matches);
        console.log(data.matches)
      })
      .catch((error)=> alert("could not load data"))}
  }, [])
  return (
    <div className="App">
      <Navbar />
     <h1>Welcome to my Live Score App</h1>
    <Grid container>
      <Grid sm="2"></Grid>
      <Grid sm="6">
      { matches.map((match)=>(
       <Fragment>
         {match.type =="Twenty20" ? (
            <MyCard key={match.unique_id} match={match} />) :( " "
         )}
       </Fragment>
      ))}
      </Grid>
    </Grid>
     
    
    </div>
  );
}

export default App;
