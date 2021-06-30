import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Builds() {
  const params = useParams()
  const id = params.id

  const [singleBuild, setSingleBuild] = useState([])
  const [builds, setBuilds] = useState({
    rating: 0,
    comment: '',
    theme: '',
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

      <Link to={`/BuildLists/${id}/AddBuilds`}>
        <button className="lego-button wish">+ Add to Build List</button>
      </Link>
      <div className="blog-card">
        <div className="description">
          <ul>
            {builds.legos.map((lego) => (
              <li key={lego.id}>
                <div className="meta">
                  {lego.photoURL ? (
                    <img
                      alt="Lego"
                      className="photo"
                      height={200}
                      src={lego.photoURL}
                    />
                  ) : null}
                </div>
                <h1>{lego.name}</h1>
                <p>
                  <span
                    className="stars"
                    style={{ '--rating': lego.rating }}
                    aria-label="Star rating of this location is 4.7 out of 5."
                  >
                    {lego.rating}
                  </span>
                </p>
                <h2>Theme: {lego.theme}</h2>
                <p>Piece Count: {lego.pieceCount}</p>
                <p> Comments: {lego.comment}</p>
                {/* make this lego.comment */}
                {/* <p>{builds.comment}</p> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  )
}
