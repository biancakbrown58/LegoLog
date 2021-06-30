import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'
import './custom.scss'
import { InProgress } from './pages/InProgress'
import { Builds } from './pages/Builds'
import { Wishes } from './pages/Wishes'
import { WishLists } from './pages/WishLists'
import { AddBuilds } from './pages/AddBuilds'
import { AddWishList } from './pages/AddWishList'
import { BuildLists } from './pages/BuildLists'
import { LoadBuildTheme } from './components/LoadBuildTheme'

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
        <Link to="/">
          <button className="lego-button">In Progress</button>
        </Link>
        <Link to="/BuildLists">
          <button className="lego-button">Builds</button>
        </Link>
        <Link to="/WishLists">
          <button className="lego-button">Wish List</button>
        </Link>
      </div>
      <Switch>
        <Route exact path="/">
          <InProgress />
        </Route>
        <Route exact path="/BuildLists">
          <BuildLists />
        </Route>
        <Route exact path="/WishLists">
          <WishLists />
        </Route>
        <Route exact path="/BuildLists/:id">
          <Builds />
        </Route>
        <Route exact path="/WishLists/:id">
          <Wishes />
        </Route>

        <Route exact path="/BuildLists/:id/AddBuilds">
          <AddBuilds />
        </Route>
        <Route exact path="/WishLists/:id/AddWishList">
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
