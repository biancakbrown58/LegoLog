import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function AddBuilds() {
  const params = useParams()
  const id = params.id

  const [newBuild, setNewBuild] = useState({
    rating: 0,
    comment: '',
    theme: '',
    legos: [],
  })
  const [addLego, setAddLego] = useState({
    name: '',
    theme: '',
    pieceCount: '',
    serialNumber: '',
    buildListId: id,
  })

  useEffect(() => {
    async function fetchBuildList() {
      const response = await fetch(`/api/BuildLists/${id}`)
      if (response.ok) {
        const apiData = await response.json()
        setNewBuild(apiData)
      }
    }
    fetchBuildList()
  }, [id])

  function handleNewReviewTextFieldChange(event) {
    const name = event.target.name
    const value = event.target.value

    setAddLego({ ...addLego, [name]: value })
  }
  // function handleStarRadioButton(newStars) {
  //   setAddLego({ ...addLego })
  // }

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
        // buildListId: 0,
      })
    }
  }

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
        <div className="question">
          <input type="radio" name="rating" />
          <label>Rating</label>
        </div>
        <button className="lego-button submit">Submit</button>
      </form>
    </>
  )
}
