import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import DrumMachine from './components/DrumMachine';
import Pads from './components/Pads';
import Controls from './components/Controls';
import MIDISounds from 'midi-sounds-react';

class App extends Component {
  constructor() {
    super();
    this.frequencies = [261.63, 277.18, 293.66, 311.13, 329.63, 349.23, 369.99, 392];
    this.audioCx = new (window.AudioContext || window.webkitAudioContext)();
    this.gain = this.audioCx.createGain();
    this.gain.connect(this.audioCx.destination);
    this.gain.gain.value = 1;
    this.state = {
      pads: [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      ],
      playing: false,
      position: 0,
      bpm: 120,
      selectedDrum: 21
    }
    this.togglePlaying = this.togglePlaying.bind(this);
    this.toggleActive = this.toggleActive.bind(this);
    this.changeBpm = this.changeBpm.bind(this);
  }

  toggleActive(rowIndex, id) {
    console.log('Pad', rowIndex, id);
    let pads = [...this.state.pads];
    let padState = pads[rowIndex][id];

    if (padState === 1) {
      pads[rowIndex][id] = 0;
    } else {
      pads[rowIndex][id] = 1;
    }

    this.setState({ pads: pads });
  }

  togglePlaying() {
    if (this.state.playing) {
      clearInterval(this.timerId);
      this.setState({ playing: false });
    } else {
      this.setTimer();
      this.setState({ playing: true });
    }
  }

  setTimer() {
    this.timerId = setInterval(() => this.tick(), this.calculateTempo(this.state.bpm));
  }

  calculateTempo(bpm) {
    return 15000 / bpm;
  }

  tick() {
    let pos = this.state.position;
    pos++;

    if (pos > 15) {
      pos = 0;
    }

    this.setState({ position: pos });
    console.log(pos);

    this.checkPad();
  }

  checkPad() {
    this.state.pads.forEach((row, rowIndex) => {
      row.forEach((pad, index) => {
        if (index === this.state.position && pad === 1) {
          console.log("active");
          this.playSound(rowIndex);
        };
      })
    });
  }
  playSound(rowIndex) {
    // let freq = this.frequencies[rowIndex];
    // let node = this.audioCx.createOscillator();
    // let currentTime = this.audioCx.currentTime;
    // node.frequency.value = freq;
    // node.detune.value = 0;
    // node.type = 'sine';
    // node.connect(this.gain);
    // node.start(currentTime);
    // node.stop(currentTime + 0.2);
    if(rowIndex === 0){
      console.log("Row: 0 play");
    }
  }

  changeBpm(bpm) {
    this.setState({ bpm: bpm.target.value });
    if (this.state.playing) {
      clearInterval(this.timerId);
      this.setTimer();
    }
  }

  onSelectDrum(e){
		var list=e.target;
		let n = list.options[list.selectedIndex].getAttribute("value");
		this.setState({
			selectedDrum: n
		});
		this.midiSounds.cacheDrum(n);
	}
	createSelectItems() {
		if (this.midiSounds) {
			if (!(this.items)) {
				this.items = [];
				for (let i = 0; i < this.midiSounds.player.loader.drumKeys().length; i++) {
					this.items.push(<option key={i} value={i}>{'' + (i + 0) + '. ' + this.midiSounds.player.loader.drumInfo(i).title}</option>);
				}
			}
			return this.items;
		}
	}
	playTestDrum(rowIndex) {
		this.midiSounds.playDrumsNow([this.state.selectedDrum]);
  }
  
  addNewPads = () =>{
    var newArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    console.log("state",this.state);
    this.setState({ pads: [...this.state.pads, newArray] });
  }

  clearRow = (rowIndex) =>{
    console.log('Pad row:', rowIndex);
    let pads = [...this.state.pads];
    let padState = pads[rowIndex];
    console.log("padState: ", padState);
    for(var i=0; i<padState.length; i++){
      if (padState[i] === 1) {
        pads[rowIndex][i] = 0;
      }
    }
    console.log("pushed pads: ", pads);
    this.setState({ pads: pads });

  }

  deleteRow = (rowIndex) => {

  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <Pads 
          pos={this.state.position} 
          pads={this.state.pads} 
          toggleActive={this.toggleActive}
          clearRow={this.clearRow} 
          onSelectDrum={this.onSelectDrum}  
          createSelectItems={this.createSelectItems} 
          selectedDrum={this.state.selectedDrum}/>
        <Controls
          bpm={this.state.bpm}
          handleChange={this.changeBpm}
          playing={this.state.playing}
          togglePlaying={this.togglePlaying}
          addNewPads={this.addNewPads} />
      </div>
    );
  }
}

export default App;
