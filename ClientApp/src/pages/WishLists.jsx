import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export function WishLists() {
  const [wishList, setWishList] = useState([])

  useEffect(function () {
    async function loadWishList() {
      const response = await fetch('/api/WishLists')
      if (response.ok) {
        const json = await response.json()
        setWishList(json)
      }
    }
    loadWishList()
  }, [])

  return (
    <ul>
      {wishList.map((wish) => (
        <button key={wish.id} className="build-theme">
          {' '}
          <Link to={`/wishLists/${wish.id}`}>{wish.theme}</Link>
        </button>
      ))}
    </ul>
  )
}
