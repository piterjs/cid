import React from 'react';

import history from '../../history';

import './styles.css';

export default () => (
  <div className="loginform">
    <h1>Welcome!</h1>
    <label>
      Name: <input type="text" />
    </label>
    <label>
      Email: <input type="email" />
    </label>
    <label>
      Secret: <input type="password" />
    </label>
    <button onClick={() => history.push('/editor')}>Play</button>
  </div>
);
