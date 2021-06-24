import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
// import { LoadBuildTheme } from '../components/LoadBuildTheme'

// export function LoadBuildTheme() {
//   const [builds, setBuilds] = useState([])

//   useEffect(function () {
//     async function loadBuilds() {
//       const response = await fetch('/api/BuildLists')
//       if (response.ok) {
//         const json = await response.json()
//         setBuilds(json)
//       }
//     }
//     loadBuilds()
//   }, [])
//   return (
//     <ul>
//       {builds.map((build) => (
//         <li key={build.id}>
//           <h5>
//             <Link to={`/buildlists/${build.id}`}>{build.theme}</Link>
//           </h5>
//         </li>
//       ))}
//     </ul>
//   )
// }

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

      {/* trying to show the build themes to view on this page instead of in progress */}

      {/* <ul>
        <li>ok</li>
        {singleBuild.map((build) => (
          <li>
            <LoadBuildTheme key={build.id} />
            {build.theme}
          </li>
        ))}
      </ul> */}
      <Link to={`/BuildLists/${id}/AddBuilds`}>
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
