import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { authHeader } from '../auth'

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
    buildListId: null,
    wishListId: id,
  })

  useEffect(() => {
    async function fetchWishList() {
      const response = await fetch(`/api/WishLists/${id}`)
      if (response.ok) {
        const apiData = await response.json()
        setNewWish(apiData)
      }
    }
    fetchWishList()
  }, [id])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropFile,
  })

  function handleNewReviewTextFieldChange(event) {
    const name = event.target.name
    const value = event.target.value

    setAddLego({ ...addLego, [name]: value })
    setNewWish({ ...newWish, [name]: value })
  }

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
  // function handleInProgressChange(event) {
  //   const name = event.target.name
  //   const value = event.target.value
  //   addLego.inProgress = true
  // }

  async function onDropFile(acceptedFiles) {
    // Do something with the files
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    // Create a formData object so we can send this
    // to the API that is expecting som form data.
    const formData = new FormData()

    // Append a field that is the form upload itself
    formData.append('file', fileToUpload)

    try {
      // Use fetch to send an authorization header and
      // a body containing the form data with the file
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      // If we receive a 200 OK response, set the
      // URL of the photo in our state so that it is
      // sent along when creating the restaurant,
      // otherwise show an error
      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url

        setNewWish({ ...newWish, photoURL: url })
      } else {
        window.prompt('Unable to upload image')
      }
    } catch {
      // Catch any network errors and show the user we could not process their upload
      window.prompt('Unable to upload image')
    }
  }
  return (
    <>
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
        {newWish.photoURL ? (
          <p>
            <img alt="Lego" width={200} src={newWish.photoURL} />
          </p>
        ) : null}
        <div className="file-drop-zone">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive
              ? 'Drop the files here ...'
              : 'Drag a picture of the restaurant here to upload!'}
          </div>
        </div>
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
