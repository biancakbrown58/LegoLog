import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function AddBuilds() {
  const params = useParams()
  const id = params.id

  // const [newRating, setNewRating] = useState()
  const [newBuild, setNewBuild] = useState({
    rating: 5,
    comment: '',
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
    async function fetchBuildList() {
      const response = await fetch(`/api/BuildLists/${id}`)
      if (response.ok) {
        const apiData = await response.json()
        setNewBuild(apiData, { comment: '' })
        // console.log(apiData.rating)
      }
    }
    fetchBuildList()
  }, [id])

  function handleNewReviewTextFieldChange(event) {
    const name = event.target.name
    const value = event.target.value

    setAddLego({ ...addLego, [name]: value })
    // setNewBuild({ ...newBuild, [name]: value })
  }

  function handleStarRadioButton(newRating) {
    setNewBuild({ ...addLego, rating: newRating })
  }

  async function handleNewLegoSubmit(event) {
    event.preventDefault()

    const response = await fetch(`/api/Legos`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(addLego),
    })
    if (response.ok) {
      // Clear the form
      setAddLego({
        ...addLego,
        name: '',
        theme: '',
        pieceCount: '',
        serialNumber: '',
        inProgress: false,
        price: '',
        comment: '',
        rating: 0,
        finishedLego: false,
        // buildListId: 0,
      })
    }
  }
  // async function handleNewRatingSubmit(event) {
  //   event.preventDefault()

  //   const response = await fetch(`/api/BuildLists`, {
  //     method: 'POST',
  //     headers: { 'content-type': 'application/json' },
  //     body: JSON.stringify(newBuild),
  //   })
  //   if (response.ok) {
  //     setNewBuild({
  //       ...newBuild,
  //       rating: 0,
  //     })
  //   }
  // }

  return (
    <>
      <form onSubmit={handleNewLegoSubmit}>
        <h2 className="form-header">Add to Build List</h2>
        <div className="question">
          <input
            type="text"
            required
            name="name"
            value={addLego.name}
            onChange={handleNewReviewTextFieldChange}
          />
          <label>Name</label>
        </div>
        <div className="question">
          <input
            type="text"
            required
            name="comment"
            value={addLego.comment}
            onChange={handleNewReviewTextFieldChange}
          />
          <label>Comment</label>
        </div>
        <div className="question">
          <input
            type="text"
            required
            name="theme"
            value={addLego.theme}
            onChange={handleNewReviewTextFieldChange}
          />
          <label>Theme</label>
        </div>
        <div className="question">
          <input
            type="text"
            required
            name="pieceCount"
            value={addLego.pieceCount}
            onChange={handleNewReviewTextFieldChange}
          />
          <label>Piece Count</label>
        </div>
        <div className="question">
          <input
            type="text"
            required
            name="serialNumber"
            value={addLego.serialNumber}
            onChange={handleNewReviewTextFieldChange}
          />
          <label>Serial Number</label>
        </div>

        <div className="stars rating">
          <input
            id="star-rating-1"
            type="radio"
            name="rating"
            value="1"
            checked={addLego.rating === 1}
            onChange={() => handleStarRadioButton(1)}
          />
          <label htmlFor="star-rating-1">1 star</label>

          <input
            id="star-rating-2"
            type="radio"
            name="rating"
            value="2"
            checked={addLego.rating === 2}
            onChange={() => handleStarRadioButton(2)}
          />
          <label htmlFor="star-rating-2">2 star</label>

          <input
            id="star-rating-3"
            type="radio"
            name="rating"
            value="3"
            checked={addLego.rating === 3}
            onChange={() => handleStarRadioButton(3)}
          />
          <label htmlFor="star-rating-3">3 star</label>

          <input
            id="star-rating-4"
            type="radio"
            name="rating"
            value="4"
            checked={addLego.rating === 4}
            onChange={() => handleStarRadioButton(4)}
          />
          <label htmlFor="star-rating-4">4 star</label>

          <input
            id="star-rating-5"
            type="radio"
            name="rating"
            value="5"
            checked={addLego.rating === 5}
            onChange={() => handleStarRadioButton(5)}
          />
          <label htmlFor="star-rating-5">5 star</label>

          <div className="star-rating">
            <label
              htmlFor="star-rating-1"
              aria-label="1 star"
              title="1 star"
            ></label>
            <label
              htmlFor="star-rating-2"
              aria-label="2 stars"
              title="2 stars"
            ></label>
            <label
              htmlFor="star-rating-3"
              aria-label="3 stars"
              title="3 stars"
            ></label>
            <label
              htmlFor="star-rating-4"
              aria-label="4 stars"
              title="4 stars"
            ></label>
            <label
              htmlFor="star-rating-5"
              aria-label="5 stars"
              title="5 stars"
            ></label>
          </div>
        </div>

        <button className="lego-button submit">Submit</button>
      </form>
    </>
  )
}
