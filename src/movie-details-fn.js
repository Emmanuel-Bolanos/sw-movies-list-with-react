import React, { useState } from "react";
import PropTypes from "prop-types";
import { List, ListItem, ListItemText } from '@material-ui/core';
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import { ExpandMore, ExpandLess  } from '@material-ui/icons';
import axios from "axios";

const useStyles = makeStyles({
  details: {
    width: '100%',
    color: 'white',
  },
  card: {
    backgroundColor: 'rgb(156, 154, 43)',
  }
});

function MovieDetails({ movie }) {
  const classes = useStyles();

  const [state, setState] = useState({
    open: false,
    characterInfo: [],
  });

  const handleClick = () => {
    setState((prevState) => ({
      ...prevState,
      open: !prevState.open,
    }));
    state.open === false 
    ? movie.characters.map((character) => {
      axios.get(character)
        .then(({data}) => {
          setState((prevState) => ({
              ...prevState, 
              characterInfo: [...prevState.characterInfo, {
                name: data.name,
                height: data.height,
                mass: data.mass,
              }],
            }));
        });
    })
    : setState((prevState) => ({
      ...prevState, 
      characterInfo: [],
    }));
  };

  const ListOfCharacters = () => {
    return (
      <>
        <ListItem button onClick={handleClick}>
          <ListItemText
            primary = 'Characters'
          />
          {state.open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={state.open} timeout="auto" unmountOnExit>
        <Grid container spacing={3}>
            {
              state.characterInfo.map((character, idx) => {
                return (
                  <Grid item xs={6} key={idx}>
                    <Card className={ classes.card }>
                      <CardHeader title={character.name} />
                      <CardContent>
                        <p> {`Height: ${character.height} cm`} </p>
                        <p> {`Mass: ${character.mass} kg`} </p>
                      </CardContent>
                    </Card>
                  </Grid>
                )
              })
            }
          </Grid>
        </Collapse>
      </>
    )
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
        {
          movie.characters
            ? <ListOfCharacters />
            : <Item category="Characters"/>
        }
      </List>
    </div>
  );
}

MovieDetails.propTypes = {
  movie: PropTypes.object
};

export default MovieDetails;
