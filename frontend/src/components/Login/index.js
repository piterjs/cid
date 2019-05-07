import React from 'react';

import history from '../../history';

import './styles.css';

export default () => (
  <form className="form form--login" onSubmit={() => history.push('/editor')}>
    <h1>welcome!</h1>
    <h3>you can wear a blindfold</h3>
    <div className="form__line">
      <label htmlFor="login" className="form__label">login:</label>
      <input type="text" id="login" placeholder="@fogrew" autoFocus className="form__control" required/>
      <div className="form__hint">for example, telegram login</div>
    </div>
    <div className="form__line">
      <label htmlFor="email" className="form__label">email:</label>
      <input type="email" id="email" placeholder="hello@piterjs.org" className="form__control" required/>
      <div className="form__hint">we will write you if you win</div>
    </div>
    <div className="form__line">
      <button className="button button--shine">PLAY</button>
    </div>
  </form>
);
