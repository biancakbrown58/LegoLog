import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Wishes() {
  const params = useParams()
  const id = params.id

  const [oneLego, setOneLego] = useState({
    theme: '',
    legos: [],
  })

  useEffect(() => {
    async function loadLegos() {
      const response = await fetch(`/api/WishLists/${id}`)
      if (response.ok) {
        const apiData = await response.json()
        setOneLego(apiData)
      }
    }
    loadLegos()
  }, [id])

  return (
    <>
      <h2 className="page-title">Wish List</h2>

      <Link to={`/WishLists/${id}/AddWishList`}>
        <button className="lego-button wish">+ Add to Wish List</button>
      </Link>
      <div className="blog-card">
        <div className="description">
          <ul>
            {oneLego.legos.map((lego) => (
              <li key={lego.id}>
                <div className="meta">
                  <img
                    className="photo"
                    alt="lego"
                    src="https://www.placecage.com/g/300/200"
                  ></img>
                </div>
                <h1>{lego.name}</h1>

                <h2>Theme: {lego.theme}</h2>
                <p>
                  Interest Level: {lego.interestLevel}
                  <span
                    className="stars"
                    style={{ '--rating': lego.interestLevel }}
                    aria-label="Star rating of this location is 4.7 out of 5."
                  ></span>
                </p>

                <p>Piece Count: {lego.pieceCount}</p>
                <p> Price: ${lego.price}</p>
                <div className="in-progress">
                  <label className="in-progress-label">In Progress</label>
                  <input
                    type="checkbox"
                    className="in-progress-checkbox"
                  ></input>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
