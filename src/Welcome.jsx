import React from 'react';
import { Link } from 'react-router-dom';

function Welcome() {
    return (
        <div>
            <h1>
          Welcome to <span className="neon-text">NeonNexus</span>: Illuminate Your Imagination.
        </h1>
        <nav className="nav">
          <Link className="neon-link" to="/chat">Chat with NeonNexus</Link>
          <Link className="neon-link" to="/imggenerator">Generate Image with NeonNexus</Link>
        </nav>
        </div>
    );
}

export default Welcome;