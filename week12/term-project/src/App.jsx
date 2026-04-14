import React from 'react';

function App() {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', color: '#222' }}>
      <section style={{ padding: '60px 40px', backgroundColor: '#dbeafe' }}>
        <h1>Pacific Horizon Hotel</h1>
        <p>Modern comfort in the heart of Waikiki.</p>
      </section>

      <section style={{ padding: '40px' }}>
        <h2>About</h2>
        <p>
          Pacific Horizon Hotel is a fictional Waikiki hotel designed for
          business travelers, couples, and first-time visitors looking for
          convenient access to beaches, dining, shopping, and attractions.
        </p>
      </section>

      <section style={{ padding: '40px', backgroundColor: '#f3f4f6' }}>
        <h2>Amenities</h2>
        <ul>
          <li>Free Wi-Fi</li>
          <li>Pool</li>
          <li>Fitness Center</li>
          <li>Beach Access</li>
        </ul>
      </section>

      <section style={{ padding: '40px' }}>
        <h2>Book Your Stay</h2>
        <p>Experience Waikiki with comfort, style, and convenience.</p>
        <button>Reserve Now</button>
      </section>
    </div>
  );
}

export default App;