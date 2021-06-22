import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Builds() {
  // const [legos, setLegos] = useState([])
  const params = useParams()
  const id = params.id

  const [builds, setBuilds] = useState({
    rating: 0,
    comment: '',
    legos: [],
  })

  useEffect(() => {
    async function loadLegos() {
      const response = await fetch(`/api/BuildLists/${id}`)

      if (response.ok) {
        const apiData = await response.json()
        setBuilds(apiData)
      }
    }
    loadLegos()
  }, [id])
  return (
    <>
      <h2 className="page-title">Previous Builds</h2>
      <Link to="/AddBuilds">
        <button className="lego-button wish">+ Add to Build List</button>
      </Link>
      <div className="blog-card">
        <div className="description">
          <ul>
            {builds.legos.map((lego) => (
              <li key={lego.id}>
                <div className="meta">
                  <img
                    className="photo"
                    alt="lego"
                    src="https://www.placecage.com/g/300/200"
                  ></img>
                </div>
                <h1>{lego.name}</h1>
                {/* <h1>{}</h1> */}
                <p>
                  <span
                    className="stars"
                    style={{ '--rating': 4.7 }}
                    aria-label="Star rating of this location is 4.7 out of 5."
                  ></span>
                </p>
                <h2>Theme: {lego.theme}</h2>
                <p>Piece Count: {lego.pieceCount}</p>
                <p> Comments:</p>
                <p>{builds.comment}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
