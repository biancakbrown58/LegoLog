import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function AddWishList() {
  const params = useParams()
  const id = params.id

  const [newWish, setNewWish] = useState({
    theme: '',
    legos: [],
  })

  const [addLego, setAddLego] = useState({
    name: '',
    theme: '',
    pieceCount: '',
    serialNumber: '',
    inProgress: false,
    price: '',
    comment: '',
    rating: 0,
    finishedLego: false,
    buildListId: id,
    wishListId: id,
  })

  useEffect(() => {
    async function fetchWishList() {
      const response = await fetch(`/api/WishLists/${id}`)
      if (response.ok) {
        const apiData = await response.json()
        setNewWish(apiData)
        // console.log(apiData.rating)
      }
    }
    fetchWishList()
  }, [id])

  function handleNewReviewTextFieldChange(event) {
    const name = event.target.name
    const value = event.target.value

    setAddLego({ ...addLego, [name]: value })
    // setNewBuild({ ...newBuild, [name]: value })
  }

  return (
    <>
      <form>
        <h2 className="form-header">Add to Wish List</h2>
        <div className="question">
          <input type="text" required />
          <label>Name</label>
        </div>
        <div className="question">
          <input type="text" required />
          <label>Theme</label>
        </div>
        <div className="question">
          <input type="text" required />
          <label>Piece Count</label>
        </div>
        <div className="question">
          <input type="text" required />
          <label>Serial Number</label>
        </div>
        <div className="question">
          <input type="text" required />
          <label>Price</label>
        </div>
        <div className="question">
          <input type="radio" />
          <label>Interest Level</label>
        </div>
        <div className="question">
          <input type="checkbox" />
          <label>In Progress</label>
        </div>
        <button className="lego-button submit">Submit</button>
      </form>
    </>
  )
}
