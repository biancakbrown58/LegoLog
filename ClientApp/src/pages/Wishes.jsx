import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authHeader } from '../auth'
export function Wishes() {
  const params = useParams()
  const id = params.id

  const [oneLego, setOneLego] = useState({
    theme: '',
    legos: [],
  })
  const [inProgress, setInProgress] = useState({
    inProgress: false,
  })
  const [lego, setLego] = useState({
    name: '',
    theme: '',
    pieceCount: '',
    serialNumber: '',
    inProgress: false,
    price: '',
    comment: '',
    rating: 0,
    finishedLego: false,
    // buildListId: null,
    // wishListId: null,
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

  // function handleProgressChange(event) {
  //   const value = event.target.value
  //   const name = event.target.name
  //   setLego({ ...lego, inProgress: true })
  // }
  // async function handleChecked(event) {
  //   console.log('Clicked')
  //   const response = await fetch(`/api/WishLists/${id}`, {
  //     method: 'PUT',
  //     headers: { 'content-type': 'application/json', ...authHeader() },
  //     body: JSON.stringify(lego),
  //   })
  // }
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
                    name="inProgress"
                    value={lego.inProgress}
                    className="in-progress-checkbox"
                    // onChange={handleProgressChange}
                    // onClick={handleChecked}
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
