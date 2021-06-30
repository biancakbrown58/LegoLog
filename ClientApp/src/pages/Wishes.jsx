import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function Wishes() {
  const params = useParams()
  const id = params.id

  const [oneLego, setOneLego] = useState({
    theme: '',
    legos: [],
  })
  const [inProgress, setInProgress] = useState({
    inProgress: '',
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
  function handleChecked(event) {
    const name = event.target.name
    const value = event.target.value
    console.log(event.target.value)
    setInProgress(true)
    // setNewBuild({ ...newBuild, [name]: value })
  }
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

                <h2>Theme: {lego.theme}</h2>

                <p>Piece Count: {lego.pieceCount}</p>
                <p> Price: ${lego.price}</p>
                <div className="in-progress">
                  <label className="in-progress-label">In Progress</label>
                  <input
                    type="checkbox"
                    value={handleChecked}
                    className="in-progress-checkbox"
                    onChange={handleChecked}
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
