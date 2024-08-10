import React, { useState, useEffect } from 'react';
import './App.css';
import novaPuppy from './NOVA.jpg';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');
  const [codewarsData, setCodewarsData] = useState({ honor: 0, rank: 0 });

  useEffect(() => {
    const getOrdinalSuffix = (day) => {
      if (day > 3 && day < 21) return 'th'; // Catch-all for 11th-13th
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    const formatDate = () => {
      const now = new Date();
      const dayOfWeek = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(now);
      const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(now);
      const day = now.getDate();
      const year = now.getFullYear();
      const time = now.toTimeString().split(' ')[0];

      return `${dayOfWeek}, ${month} ${day}${getOrdinalSuffix(day)}, ${year}; ${time}`;
    };
    const timer = setInterval(() => {
      setCurrentTime(formatDate());
    }, 1000);

    // Fetch Codewars data
    fetch('https://www.codewars.com/api/v1/users/spereddigari23')
      .then(response => response.json())
      .then(data => {
        console.log('API Response:', data); // Log the response to inspect structure
        if (data && data.honor !== undefined && data.ranks && data.ranks.overall) {
          setCodewarsData({
            honor: data.honor,
            rank: data.leaderboardPosition, // Fixed rank extraction
          });
        } else {
          console.error('Unexpected API response structure:', data);
        }
      })
      .catch(error => console.error('Error fetching Codewars data:', error));

    return () => clearInterval(timer);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  return (
    <div className="App">
      <div className="background-container">
        <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1231630/moon2.png" alt="moon" />
        <div className="stars"></div>
        <div className="twinkling"></div>
        <div className="clouds"></div>
      </div>
      <div className="Hello">👋🏾 I'M SHASHANK PEREDDIGARI</div>
      <header>
        <div className="top-menu">
          <button className="menu-toggle" onClick={toggleMenu}>☰ Menu</button>
          <nav className={`dropdown-menu ${isMenuOpen ? 'show' : ''}`}>
            <a href="https://github.com/spereddigari23" target="_blank" rel="noopener noreferrer">💫 GITHUB</a>
            <a href="https://www.linkedin.com/in/shashank-pereddigari-12a4b51a1" target="_blank" rel="noopener noreferrer">🖥️ LINKEDIN</a>
            <a href="https://www.codewars.com/users/spereddigari23" target="_blank" rel="noopener noreferrer">🀄 CODEWARS</a>
            <a href="/download-resume" download>📄 RESUME 🔻</a>
          </nav>
        </div>
        <div className="header-text">
          <div className="score">Codewars Score: {codewarsData.honor}</div>
          <div className="rank">Codewars Global Rank: {codewarsData.rank}</div>
          <div className="time" id="time">{currentTime}</div>
        </div>
      </header>
      <div className="puppy-container">
        <img src={novaPuppy} alt="Puppy Nova" className="puppy-image" />
        
      </div>
      <div className="paragraph">
        <p>
          Born on August 28, 2001, in Central Jersey, the journey began with a foundation of support and love from
          my parents. At Sayreville War Memorial High School, my leadership as President of the Programming Club led to organizing the school's inaugural
          hackathon, while a memorable varsity football championship at MetLife Stadium capped off senior year. The pursuit of a Computer Science
          degree at Rutgers University, with a focus on machine learning and artificial intelligence, followed. Beyond the professional realm, socializing
          with friends, diving into open-source machine learning models, and enjoying leisurely park walks with Nova, my loyal dog, are cherished
          activities.
        </p>
      </div>
    </div>
  );
}

export default App;
