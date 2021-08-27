import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function InProgress() {
  const params = useParams()
  const id = params.id
  const [currentLego, setCurrentLego] = useState({
    theme: '',
    legos: [],
  })

  // useEffect(
  //   function () {
  //     async function loadBuilds() {
  //       const response = await fetch(`/api/WishLists${id}`)
  //       if (response.ok) {
  //         const json = await response.json()
  //         setCurrentLego(json)
  //       }
  //     }
  //     loadBuilds()
  //   },
  //   [id]
  // )

  return (
    <div>
      <h2 className="page-title">In Progress</h2>
      <img
        className="in-progress-photo"
        src="./images/Porsche.png"
        alt=""
        height="100"
        width="100"
      />

      {/* <ul>
        {currentLego.legos.map((lego) => (
          <li key={lego.id}>
            <div className="meta">
              <img className="photo" alt="lego" src="/Porsche.png"></img>
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
          </li>
        ))}
      </ul> */}

      <table className="in-progress-table">
        <thead>
          <tr>
            <th>Porsche 911 RSR</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PIECES - 1,580</td>
          </tr>
          <tr>
            <td>SN - 42096</td>
          </tr>
          <tr>
            <td>THEME - Technic</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
