import React, { useState } from "react";
import { Grid, TextField, Button } from "@material-ui/core";
import { getUrls } from "./api";
import axios from "axios";
import validator from "validator";
import "./App.css";

function App() {
  //set initial state with useState hook
  const [state, setState] = useState({
    url: "",
    link: "",
  });

  //handleChange function sets state to user input
  const handleChange = (e) => {
    console.log(e.target.value);
    setState({
      ...state,
      url: e.target.value,
    });
  };

  //handleSubmit function creates and displays custom URL
  const handleSubmit = async (e) => {
    e.preventDefault();
    //use express validator to ensure input URL is a valid URL
    const validUrl = validator.isURL(state.url, {
      require_protocol: true,
    });
    if (!validUrl) alert(`Please enter a valid URL`);
    else console.log(`URL is: `, state.url);

    //search database if URL exists through getUrls() --> (imported from api.js)
    let databaseUrl = await getUrls();
    if (databaseUrl.length) {
      databaseUrl.forEach((data) => {
        if (data.url === state.url) {
          setState({
            ...state,
            link: `http://short.link/${data.id}`,
          });
        }
      });
    }

    //enter try/catch to send Post request with new URL
    try {
      const result = await axios.post("http://localhost:5000/api/shorten", {
        url: state.url,
      });
      setState({
        ...state,
        link: `http://short.link/${result.data.hash}`,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //showUrl() opens the link in a new window
  const showUrl = () => {
    window.open(state.url, "_blank");
  };

  return (
    <Grid
      className='App'
      container
      direction='column'
      justify='center'
      alignItems='center'
    >
      <div className='container'>
        <span className='text1'>Welcome To Short Link</span>
        <span className='text2'>Custom URL Shortener</span>
      </div>
      <form
        onSubmit={(e) => handleSubmit(e)}
        style={{ display: "flex", flexDirection: "column" }}
      >
        <TextField
          label='Paste Your Link'
          variant='outlined'
          type='text'
          name='url'
          placeholder='Enter URL Here'
          style={{ marginBottom: "15px", width: "800px" }}
          onChange={(e) => handleChange(e)}
        />
        <Button
          variant='contained'
          color='primary'
          type='submit'
          value='shorten'
        >
          Generate Short Link
        </Button>
        <div className={state.link !== "" ? "display-result" : "hide-result"}>
          <span id='result' onClick={() => showUrl()}>
            {state.link}
          </span>
        </div>
      </form>
    </Grid>
  );
}

export default App;
