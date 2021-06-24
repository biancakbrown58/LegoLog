import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function LoadBuildTheme() {
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
    <ul>
      {builds.map((build) => (
        <li key={build.id}>
          <h5>
            <Link to={`/buildlists/${build.id}`}>{build.theme}</Link>
          </h5>
        </li>
      ))}
    </ul>
  )
}
