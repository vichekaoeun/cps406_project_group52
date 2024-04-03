import logo from './logo.svg';
import './App.css';
import ladybug from './images/ladybug.png';

function App() {
  return (
    <div className="Main-Container">
      <div className="Content">
        <div id="title-card">
          <img src={ladybug} className="App-logo" alt="logo" />
          <h1>Bug Report System (BRS)</h1>
        </div>
        <p><i>Login</i></p>
        <div className="red-bar"></div>
      </div>
      <div className="Authentication">
        <form id="form">
          <label>
            Username:
            <input />
          </label>
          <label>
            Password:
            <input />
          </label>
          <button type='submit'>Login</button>
        </form>
        <div className="other-form">
          <div id="forgot-form">
            <button>*Forgot password</button>
            <button>*Forgot username</button>
          </div>
          <div id="create-form">
            <button>New User?</button>
            <button>*Sign up now!</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
