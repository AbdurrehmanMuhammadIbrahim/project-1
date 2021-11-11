// import React, { useEffect, useState } from 'react';
// import { useHistory } from "react-router-dom";
// import "../../App.css"


// function Dashboard() {
//     return (
//         <>
//             <div className="dashboard">
//                 <h1 id="wlm">Welcome To Dash Board !! </h1>
//                 <br />
//                 <h2 id="personaldtl">Personal Details</h2>
//                 <br /><br />
//                 <div className="info">
//                     <h3>Name:</h3>
//                     <h4>Email: </h4>
//                     <h4>Phone Number: </h4>
//                 </div>
//             </div>
//         </>



//     )
// }
// export default Dashboard;


import "../../App.css"
import * as React from 'react';
import postimg from "../../img/post.jpg"
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function RecipeReviewCard(props) {
    const {name, text, email, description, timestamp } = props;

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card sx={{ maxWidth: 345 }} className="cards">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
             {name[0]}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={name}
        subheader={email}
      />
      <CardMedia
        component="img"
        height="194"
        image ={postimg}
        alt="Paella dish"
      />
      <CardContent>
      <Typography variant="body2" color="text.secondary">
        {timestamp}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        {text}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <DeleteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <EditIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{description}</Typography>
          
     
        </CardContent>
      </Collapse>
    </Card>
  );
}
