import { useState } from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';

const Hello = () => {
  const [name, setName] = useState('Frank');

  const handleClick = () => {
    // eslint-disable-next-line no-console
    console.log('clicked button. Within App.tsx, name is', name);
    window.electron.ipcRenderer.sendMessage('send-name', [name]);
  };

  return (
    <div>
      <div className="Hello">
        <img width="200" alt="icon" src={icon} />
      </div>
      <h1>electron-react-boilerplate</h1>
      <div className="Hello">
        <label htmlFor="name">
          Name
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
        />
        <button type="button" onClick={handleClick}>
          <div role="img" aria-label="books">
            ➡️
          </div>{' '}
          Send name to main process
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
