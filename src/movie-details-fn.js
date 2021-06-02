import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from '@material-ui/core';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess  } from '@material-ui/icons';
// import axios from "axios";

const useStyles = makeStyles({
  details: {
    width: '100%',
  },
});

function MovieDetails({ movie }) {
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  const Item = ({ category, value }) => {
    const content = value ? `${category}: ${value}` : `No ${category.toLowerCase()} data available`;
    return (
      <ListItem>
        <ListItemText
          primary = { content }
        />
      </ListItem>
    )
  };

  return (
    <div className={ classes.details }>
      <List component="nav" >
        <Item category="Title" value={movie.title} />
        <Item category="Director" value={movie.director} />
        <Item category="Producer" value={movie.producer} />
        <Item category="Opening crawl" value={movie.opening_crawl} />
        <ListItem button onClick={handleClick}>

          {/* <ListItemIcon>
            <InboxIcon />
          </ListItemIcon> */}
          <ListItemText
            primary = 'Characters'
          />
          {open ? <ExpandLess /> : <ExpandMore />}
          
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div">
          {
            movie.characters.map((character, idx) => {
              return (
                <ListItem key={idx}>
                  <ListItemText
                    primary = {character}
                  />
                </ListItem>
              )
            })
          }
          </List>
        </Collapse>
      </List>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object
};

export default MovieDetails;
