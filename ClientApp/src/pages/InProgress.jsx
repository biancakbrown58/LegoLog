import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function InProgress() {
  const [builds, setBuilds] = useState([])

  useEffect(function () {
    async function loadBuilds() {
      const response = await fetch('/api/BuildLists')
      if (response.ok) {
        const json = await response.json()
        setBuilds(json)
      }
    }
    loadBuilds()
  }, [])

  return (
    <div>
      <h2 className="page-title">In Progress</h2>
      <img
        className="in-progress-photo"
        src="https://www.placecage.com/g/300/200"
        alt=""
      />
      {/* <ul>
        <button>
          {builds.map((build) => (
            <li key={build.id}>
              <h5>
                <Link to={`/buildlists/${build.id}`}>{build.theme}</Link>
              </h5>
            </li>
          ))}
        </button>
      </ul> */}
      <table className="in-progress-table">
        <thead>
          <tr>
            <th>Bugatti</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PIECES - 1,000</td>
          </tr>
          <tr>
            <td>SN - 123456</td>
          </tr>
          <tr>
            <td>THEME - Technic</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
