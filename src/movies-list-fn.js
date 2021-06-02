import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Card, CardHeader, CardContent, CardActions } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Collapse from '@material-ui/core/Collapse'
import { ThemeContext, LanguageContext } from "./App";

function MoviesList({ additionalMovies }) {
  const [state, setState] = useState({
    movies: [],
    displayTitle: '',
    loading: false,
    expanded: [],
  });
  const language = useContext(LanguageContext);
  const theme = useContext(ThemeContext);
  const textStyle = {
    color: theme.foreground
  };

  useEffect(() => {
    // serviceX.subscribe(user);
    setState((prevState) => ({
      ...prevState, 
      loading: true,
    }));
    axios.get("https://swapi.dev/api/films/")
      .then(({ data: { results } }) => {
        // TODO log off!
        setState((prevState) => ({
          ...prevState, 
          expanded: [false, false, false, false, false, false],
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
        movies: [...state.movies, newMovie],
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
      <h4>{state.displayTitle}</h4>
      <Grid container spacing={3}>
        {state.movies.map((movie, idx) => {
          return (
            <Grid item xs={4} key={movie.episode_id}>
              <Card style={{ backgroundColor: theme.background }}>
                <CardHeader style={textStyle} title={movie.title} />
                <CardContent>
                  <h4 style={textStyle}>{movie.director}</h4>
                </CardContent>
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
                    Some movie details
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
