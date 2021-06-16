import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import './custom.scss'
import { InProgress } from './pages/InProgress'
import { Builds } from './pages/Builds'

export function App() {
  return (
    <div>
      <div className="header">
        <div className="header-container">
          <header className="header-img"></header>
        </div>
      </div>
      <h1 className="title">Lego Log</h1>
      <div className="buttons">
        <button className="learn-more">In Progress</button>
        <button className="learn-more">Builds</button>
        <button className="learn-more">Wish List</button>
      </div>
      <Switch>
        <Route exact path="/">
          <InProgress />
        </Route>
        <Route exact path="/Builds">
          <Builds />
        </Route>
      </Switch>
      {/* <div>
        <h2 className="page-title">In Progress</h2>
        <img
          className="in-progress-photo"
          src="https://www.placecage.com/g/300/200"
          alt=""
        />
        <table className="in-progress-table">
          <thead>
            <tr>
              <th>Bugatti</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>PIECES - 1,000</td>
            </tr>
            <tr>
              <td>SN - 123456</td>
            </tr>
            <tr>
              <td>THEME - Technic</td>
            </tr>
          </tbody>
        </table>
      </div> */}
      <div className="footer">
        <div className="footer-container">
          <footer className="footer-img"></footer>
        </div>
      </div>
    </div>
  )
}
