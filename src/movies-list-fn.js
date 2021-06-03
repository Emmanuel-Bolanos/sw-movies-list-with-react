import React, { useState, useEffect, useContext } from "react";
import MovieDetails from './movie-details-fn';
import PropTypes from "prop-types";
import axios from "axios";
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Collapse from '@material-ui/core/Collapse'
import { ThemeContext, LanguageContext } from "./App";
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: props => ({
    backgroundColor: props.background,
    color: props.foreground,
    padding: '1rem',
    margin: '1rem',
  }),
  cardContent: {
    padding: '0',
    margin: '0',
  },
});

function MoviesList({ additionalMovies }) {
  const language = useContext(LanguageContext);
  const innerTheme = useContext(ThemeContext);
  const classes = useStyles(innerTheme);
  const [state, setState] = useState({
    movies: [],
    displayTitle: '',
    loading: false,
    expanded: [],
  });

  useEffect(() => {
    // serviceX.subscribe(user);
    setState((prevState) => ({
      ...prevState, 
      loading: true,
    }));
    axios.get("https://swapi.dev/api/films/")
      .then(({ data: { results } }) => {
        setState((prevState) => ({
          ...prevState, 
          expanded: new Array(results.length).fill(false),
          movies: results,
          loading: true,
        }));
      });
    return () => {
      // serviceX.unsubscribe(user);
    };
  }, []);
  useEffect(() => {
    const newMovie = additionalMovies.length
      ? additionalMovies[additionalMovies.length - 1]
      : null;
    if (newMovie !== null) {
      setState((prevState) => ({
        ...prevState, 
        expanded: [...prevState.expanded, false],
        movies: [...prevState.movies, newMovie],
      }));
    }
  }, [additionalMovies]);
  useEffect(() => {
    const newTitle = language === "en/us" 
      ? "Star War movies" 
      : "Peliculas de Star Wars";
    setState((prevState) => ({
      ...prevState, 
      displayTitle: newTitle,
    }));
  }, [language]);

  const handleExpandClick = (id) => {
    setState((prevState) => ({
      ...prevState,
      expanded: prevState.expanded.map((status, idx) => {
        return id === idx 
          ? !status
          : status;
      }),
    }));
  };

  return (
    <>
      <h1>{state.displayTitle}</h1>
      <Grid container spacing={3}>
        {state.movies.map((movie, idx) => {
          return (
            <Grid item xs={12} key={movie.episode_id}>
              <Card className={ classes.root }>
                <div className={ classes.cardContent }>
                  <CardHeader title={movie.title} />
                  <CardContent>
                    <h3>{movie.director}</h3>
                  </CardContent>
                </div>
                <CardActions>
                  <Button 
                    variant="outlined"
                    size="large"
                    color="primary"
                    id={idx}
                    onClick={() => handleExpandClick(idx)}
                  >
                    See Details 
                  </Button>
                </CardActions>
                <Collapse in={state.expanded[idx]} timeout="auto" unmountOnExit>
                  <CardContent>
                    <MovieDetails 
                      movie={movie}
                    />
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

MoviesList.propTypes = {
  additionalMovies: PropTypes.array
};

export default MoviesList;
