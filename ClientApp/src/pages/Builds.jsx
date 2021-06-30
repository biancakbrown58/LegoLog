import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { authHeader } from '../auth'

export function Builds() {
  const params = useParams()
  const id = params.id

  const [builds, setBuilds] = useState({
    rating: 0,
    comment: '',
    theme: '',
    legos: [],
  })

  //NEW
  const [addLego, setAddLego] = useState({
    name: '',
    theme: '',
    pieceCount: '',
    serialNumber: '',
    // inProgress: false,
    // price: '',
    comment: '',
    rating: 2,
    // finishedLego: false,
    photoURL: '',
    buildListId: id,
    wishListId: id,
  })
  ///

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

  //NEW
  async function handleNewLegoSubmit(event) {
    event.preventDefault()
    const response = await fetch(`/api/Legos`, {
      method: 'POST',
      headers: { 'content-type': 'application/json', ...authHeader() },
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
        photoURL: '',
      })
    }
  }

  ///

  //NEW\
  function handleNewReviewTextFieldChange(event) {
    const name = event.target.name
    const value = event.target.value

    setAddLego({ ...addLego, [name]: value })
    setBuilds({ ...builds, [name]: value })
  }
  ////
  return (
    <>
      <h2 className="page-title">Previous Builds</h2>

      <Link to={`/BuildLists/${id}/AddBuilds`}>
        <button className="lego-button wish">+ Add to Build List</button>
      </Link>
      <div className="blog-card">
        <div className="description">
          <ul>
            {builds.legos.map((lego) => (
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
          </ul>
        </div>
      </div>
      <form onSubmit={handleNewLegoSubmit}>
        <h2 className="form-header">Add to Wish List</h2>
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
          <input
            type="text"
            required
            name="price"
            value={addLego.price}
            onChange={handleNewReviewTextFieldChange}
          />
          <label>Price</label>
        </div>
        {/* {newWish.photoURL ? (
          <p>
            <img alt="Lego" width={200} src={newWish.photoURL} />
          </p>
        ) : null} */}
        {/* <div className="file-drop-zone">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive
              ? 'Drop the files here ...'
              : 'Drag a picture of the restaurant here to upload!'}
          </div>
        </div> */}
        <button
          className="lego-button submit"
          type="submit"
          value="Submit"
          onSubmit={handleNewLegoSubmit}
        >
          Submit
        </button>
      </form>
    </>
  )
}
