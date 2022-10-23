import React from 'react';
import Desk from './components/Desk';
import Header from './components/Header';
import Steps from './components/Steps';
import logo from './logo.svg';
import './styles/main.scss';

function App() {
  return (
    <div className="App">
      <Header />
      <Desk />
      <Steps />
    </div>
  );
}

export default App;
