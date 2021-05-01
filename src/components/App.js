import React from "react";
import { connect } from "react-redux";
import { guessLetter, resetGame, coinToggle } from "../redux/hangman";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faVolumeDown, faVolumeOff, faVolumeUp } from '@fortawesome/free-solid-svg-icons'
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import coinAudio from "../sound/mario_coin_sound.mp3";


function App(props) {
  let abc = "abcdefghijklmnopqrstuvwxyz".split("");
  let clickAudio = new Audio(coinAudio);
  clickAudio.playbackRate = 2;
  clickAudio.volume = 0.02;

  let handleClick = letter => {
    props.guessLetter(letter);
    clickAudio.play();
  }

  let handleClickSound = () => {
    if(props.coinSound) {
      clickAudio.volume = 0.02;
      return faVolumeUp;
    } else {
      clickAudio.volume = 0;
      return faVolumeOff;
    }
  }

  let renderButtonVolume = () => {
    return (
      <Button onClick={() => props.coinToggle()}>
        <FontAwesomeIcon icon={handleClickSound()} />
      </Button>

    )
  }

  let renderLetterButtons = (abc) => abc.map((letter, index) => {
    
    return (
      <>
        <Grid item xs={2}> {/* xs sm md lg xl */}
          <Button
            key={index}
            color="primary" 
            variant="contained" 
            size="large" 
            id={index} 
            className="letter-btn"
            onClick={() => handleClick(letter)}
            disabled={props.lettersCorrect.includes(letter) || props.lettersIncorrect.includes(letter) || props.isGameOver}
            >
              {letter.toUpperCase()}
          </Button>
        </Grid>
      </>
    )

  });
  let renderHangMan = (word) => word.split("").map(letter => {
    return !props.lettersCorrect.includes(letter) 
            ? 
            <span className="guesses grow">_ </span> 
            : 
            <span className="guesses grow">{letter.toUpperCase()}</span>;
  })

  let gameOverMsg = () => {
    if(props.isGameOver || props.isWinner()) {
      if(props.isWinner()) {
        return "WON"
      } else {
        return "LOST"
      }
    }
  }
  

  return (
    <Container maxWidth="sm" className="game">
      
      <h1 className="title">LETSSA PLAY <span className="rainbow-text-animated">MARIO</span> HANGMAN</h1>
      <h2 className="grow">Guesses Left: {props.limit() - props.numGuesses}</h2>
    
      <Grid
        container 
        justify="center"
        alignItems="center"
      >
        <div className="volume-btn">{renderButtonVolume()}</div>
      </Grid>
      <Grid
        container 
        justify="center"
        alignItems="center"
      >
        <h1 
          className={gameOverMsg() !== undefined ? gameOverMsg().toLowerCase() : "notDone"}
          >
            YOU {gameOverMsg()}
        </h1>
      </Grid>
     
      <h2 className="word">{renderHangMan(props.word)}</h2>
      <br />
      <br />
      <Grid container spacing={1}>
        {renderLetterButtons(abc)}
        <Grid 
          container 
          justify="center"
          alignItems="center" 
        >
          <Button variant="contained" color="secondary" onClick={() => props.resetGame()} > {props.isWinner() ? "Winner! Play Again?" : "Ragequit Reset"} </Button>
        </Grid>
      </Grid>      
    </Container>
    );
}

function mapStateToProps(state) {
  return {
    word: state.word, // [e, etc]
    numGuesses: state.numGuesses,
    lettersCorrect: state.lettersCorrect, //[]
    isGameOver: state.isGameOver,
    limit: state.limit,
    lettersIncorrect: state.lettersIncorrect,
    isWinner: state.isWinner,
    coinSound: state.coinSound

  }
}

const mapDispatchToProps = {
  guessLetter: guessLetter,
  resetGame: resetGame,
  coinToggle: coinToggle
}

// connect(Parts of State you need, Actions you want to perform)
export default connect(mapStateToProps, mapDispatchToProps)(App);
