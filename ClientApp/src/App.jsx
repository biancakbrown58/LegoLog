import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import './custom.scss'
import { InProgress } from './pages/InProgress'
import { Builds } from './pages/Builds'
import { WishList } from './pages/WishList'
import { AddBuilds } from './pages/AddBuilds'
import { AddWishList } from './pages/AddWishList'

export function App({ id }) {
  return (
    <div>
      <div className="header">
        <div className="header-container">
          <header className="header-img"></header>
        </div>
      </div>
      <h1 className="title">Lego Log</h1>
      <div className="buttons">
        <Link to="/">
          <button className="lego-button">In Progress</button>
        </Link>
        <Link to={`/BuildLists/${id}`}>
          <button className="lego-button">Builds</button>
        </Link>
        <Link to="/WishList">
          <button className="lego-button">Wish List</button>
        </Link>
      </div>
      <Switch>
        <Route exact path="/">
          <InProgress />
        </Route>
        <Route exact path="/BuildLists/:id">
          <Builds />
        </Route>
        <Route exact path="/WishList">
          <WishList />
        </Route>
        <Route exact path="/BuildLists/:id/AddBuilds">
          <AddBuilds />
        </Route>
        <Route exact path="/AddWishList">
          <AddWishList />
        </Route>
      </Switch>
      <div className="footer">
        <div className="footer-container">
          <footer className="footer-img"></footer>
        </div>
      </div>
    </div>
  )
}
