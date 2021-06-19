import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Builds() {
  return (
    <>
      <h2 className="page-title">Previous Builds</h2>
      <Link to="/AddBuilds">
        <button className="lego-button wish">+ Add to Build List</button>
      </Link>
      <div className="blog-card">
        <div className="meta">
          <img
            className="photo"
            src="https://www.placecage.com/g/300/200"
          ></img>
        </div>
        <div className="description">
          <h1>Bugatti</h1>
          <p>
            <span
              className="stars"
              style={{ '--rating': 4.7 }}
              aria-label="Star rating of this location is 4.7 out of 5."
            ></span>
          </p>
          <h2>Theme: Technic</h2>
          <p>Piece Count: 1,000</p>
          <p> Comments:</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem,
            ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="meta">
          <img
            className="photo"
            src="https://www.placecage.com/g/300/200"
          ></img>
        </div>
        <div className="description">
          <h1>Bugatti</h1>
          <p>
            <span
              className="stars"
              style={{ '--rating': 4.7 }}
              aria-label="Star rating of this location is 4.7 out of 5."
            ></span>
          </p>
          <h2>Theme: Technic</h2>
          <p> Comments:</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem,
            ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="meta">
          <img
            className="photo"
            src="https://www.placecage.com/g/300/200"
          ></img>
        </div>
        <div className="description">
          <h1>Bugatti</h1>
          <p>
            <span
              className="stars"
              style={{ '--rating': 4.7 }}
              aria-label="Star rating of this location is 4.7 out of 5."
            ></span>
          </p>
          <h2>Theme: Technic</h2>
          <p> Comments:</p>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem,
            ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
      </div>
    </>
  )
}
