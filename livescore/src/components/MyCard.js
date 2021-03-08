import React ,{useState,Fragment }from 'react';

import {Card, CardContent, Typography,CardActions, Grid, Dialog,DialogTitle,DialogActions,DialogContent,DialogContentText} from "@material-ui/core";
import {Button} from "@material-ui/core"; 

import  getMatchesDetails  from "../api/Api";

const MyCard =({ match })=>{
const [open, setOpen] = useState(false);
const [detail, setDetail] = useState({});

const handleClick =(id)=>{
  getMatchesDetails(id)
  .then((data)=>{ console.log("MATCH DATA",data);
   setDetail(data);
   handleOpen();
})
  .catch((error)=> console.log(error)) 
};

    const getMatchCart =()=>{
        return (
            <Card style={{ marginTop:20}}>
                <CardContent>
                   <Grid container justify="center" alignItems="center" spacinf={4}>
                        <Grid item>
                            <Typography varient="h3" >{match["team-1"]}</Typography>
                        </Grid>
                        <Grid item>
                            <img 
                            style={{width:85}}
                            src={require("../img/vs.png")
                            }
                            alt=" VS " />
                        </Grid>
                        <Grid item><Typography  varient="h3">{match["team-2"]}</Typography></Grid>
                        
                   </Grid>
                </CardContent>
                <CardActions>
                    <Grid container justify="center" >
                    <Button
                    onClick={()=>{
                        handleClick(match.unique_id);
                    }}
                    varient="contained" color="secondary" style={{ marginLeft:40}}> Show Details</Button>
                    <Button  varient="contained" color="primary"  style={{ marginLeft:10}}> Start Time :  {new Date(match.dateTimeGMT).toLocaleString()}</Button>
                    </Grid>
                </CardActions>
            </Card>
        )
    }
    const handleOpen=()=>{
        setOpen(true);
    }
    const handleClose=()=>{
        setOpen(false);
    }

const getDialog=()=>(
    <Dialog open={open} onClose={handleClose}>
    
            <DialogTitle id="alert-dialog-title">{"Match  Detail.."}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography>{detail.stat}</Typography>
                    <Typography>
                        Match <span style={{fontStyle:"italic",fontWeight:"bold"}}>{detail.matchStarted ?  "Started" : "Still not Started"}</span>
                    </Typography>

                    <Typography>
                        Score <span style={{fontStyle:"italic",fontWeight:"bold"}}>{detail.score }</span>
                    </Typography>

                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary" autoFocus>
            close
                </Button>
            </DialogActions>
      
    </Dialog>
)

  return(
      <Fragment>
            {getMatchCart()}
            {getDialog()}
      </Fragment>
  )
};
export default MyCard;