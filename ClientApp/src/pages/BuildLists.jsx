import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function BuildLists() {
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
        <button key={build.id} className="build-theme">
          <Link to={`/buildlists/${build.id}`}>{build.theme}</Link>
        </button>
      ))}
    </ul>
  )
}
