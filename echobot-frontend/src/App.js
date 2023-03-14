import './App.css';
import {Component} from "react";
import bot from "./bot.png";

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            userInput: undefined,
            messages: [{name: "bot", message: "Merhaba, Ben EchoBot!"}]
        }
    }

    handleChange(event) {
        this.setState({userInput: event.target.value});
    }

    callAPI() {
        let message = this.state.userInput;

        let userMessage = {name: "user", message: message}
        this.setState(prevState => ({
            messages: [...prevState.messages, userMessage]
        }));

        fetch("http://localhost:3001/sendMessage", {
            method: "post",
            body: JSON.stringify({message}),
            headers: {
                "Content-type":"application/json",
                'Access-Control-Allow-Origin': 'http://localhost:3001',
                'Access-Control-Allow-Credentials': 'true'
            }
        })
            .then(res => res.text())
            .then(res => {
                let botMessage = {name: "bot", message: res};
                this.setState(prevState => ({
                    messages: [...prevState.messages, botMessage]
                }))
            });
    }

    keyPress(e) {
        if(e.keyCode === 13) {
            console.log('value', e.target.value);
            this.setState({userInput: e.target.value});
            this.callAPI();
        }
    }

    render () {
      return (
          <div className="app">
              <div className="appHeader">
                  <img src={bot} className="appImg"></img>
                  <div className="appText">EchoBot</div>
              </div>
              <div className="chat">
                  {this.state.messages.map(function (data, i) {
                          return (
                              <div key={i} className="messageBox">
                                  {data.name === "bot" && <div className="botMessage">{data.message}</div>}
                                  {data.name === "user" && <div className="userMessage">{data.message}</div>}
                              </div>
                          );
                      })
                  }
              </div>
              <div className="appSend">
                  <input id="userMessageInput" type="text" placeholder="Type Here" onKeyDown={this.keyPress.bind(this)} onChange={(e) => this.handleChange(e)}/>
                  <button className="appButton" onClick={this.callAPI.bind(this)}>Send</button>
              </div>
          </div>
      )
    };
}

export default App;
