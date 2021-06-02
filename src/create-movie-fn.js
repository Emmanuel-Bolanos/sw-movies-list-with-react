import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import { nanoid } from 'nanoid';
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

function CreateMovie(props) {
  const { createMovieFn } = props;
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  function handleTitleChange(event) {
    setTitle(event.target.value);
  }
  function handleDirectorChange(event) {
    setDirector(event.target.value);
  }
  const handleNewMovie = useCallback((e) => {
    e.preventDefault();
    const episode_id = nanoid(6);
    createMovieFn({ title, director, episode_id });
  }, [createMovieFn, title, director]);
  return (
    <form 
      style={{ marginTop: 16 }} 
      onSubmit={handleNewMovie}
    >
      <TextField
        required
        id="title"
        label="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <TextField
        required
        id="director"
        label="Director"
        value={director}
        onChange={handleDirectorChange}
      />
      <div style={{ marginTop: 16 }}>
        <Button 
          type="submit"
          color="primary" 
          variant="contained" 
        >
          Create star wars movie
        </Button>
      </div>
    </form>
  );
}

CreateMovie.propTypes = {
  createMovieFn: PropTypes.func
};

CreateMovie.defaultProps = {
  createMovieFn: () => null
};

export default CreateMovie;
