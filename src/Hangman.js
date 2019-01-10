import React, { Component } from 'react';
import { randomWord } from './words';
import './Hangman.css';
import img0 from './0.jpg';
import img1 from './1.jpg';
import img2 from './2.jpg';
import img3 from './3.jpg';
import img4 from './4.jpg';
import img5 from './5.jpg';
import img6 from './6.jpg';

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0, guessed: new Set(), answer: randomWord() };
    this.handleGuess = this.handleGuess.bind(this);
    this.printrandomWord = this.printrandomWord.bind(this);
    this.restartGame = this.restartGame.bind(this);
  }

  printrandomWord() {
    console.log(this.state.answer);
    return this.state.answer;
  }
  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split('')
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : '_'));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(state => {
      // make a copy of the set
      const newGuessed = new Set([...state.guessed.values(), ltr]);

      // tally number wrong
      let newNWrong = state.nWrong;
      if (!state.answer.includes(ltr)) {
        newNWrong += 1;
      }

      // finally udate the state
      return {
        guessed: newGuessed,
        nWrong: newNWrong
      };
    });
  }

  restartGame() {
    // on click, set state of game back to original and get new random word
    this.setState({ nWrong: 0, guessed: new Set(), answer: randomWord() });
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return 'abcdefghijklmnopqrstuvwxyz'.split('').map(ltr => (
      <button
        className="keyboard"
        key={ltr}
        value={ltr}
        u
        onClick={this.handleGuess}
        disabled={
          this.state.nWrong < this.props.maxWrong
            ? this.state.guessed.has(ltr)
            : true
        }
      >
        {ltr}
      </button>
    ));
  }

  /** render: render game */
  render() {
    return (
      <div className="Hangman">
        <img src={this.props.images[this.state.nWrong]} />
        <p className="Hangman-word">{this.guessedWord()}</p>
        <div>{this.generateButtons()}</div>
        {this.state.nWrong === this.props.maxWrong ? (
          <p>GAME OVER SUCKER the answer is {this.state.answer}</p>
        ) : (
          <p>You guessed {this.state.nWrong} wrong</p>
        )}
        <button onClick={this.restartGame}>Restart</button>
      </div>
    );
  }
}

export default Hangman;
