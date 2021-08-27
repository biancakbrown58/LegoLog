import React, { useEffect, useState } from 'react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { useDropzone } from 'react-dropzone'
import { authHeader } from '../auth'

export function AddWishList() {
  const params = useParams()
  const id = params.id

  const history = useHistory()

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
    photoURL: '',
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
      history.push(`/wishLists/${id}`)
    }
  }

  async function onDropFile(acceptedFiles) {
    const fileToUpload = acceptedFiles[0]
    console.log(fileToUpload)

    const formData = new FormData()

    formData.append('file', fileToUpload)

    try {
      const response = await fetch('/api/Uploads', {
        method: 'POST',
        headers: {
          ...authHeader(),
        },
        body: formData,
      })

      if (response.status === 200) {
        const apiResponse = await response.json()

        const url = apiResponse.url
        setAddLego({ ...addLego, photoURL: url })
        // setNewWish({ ...newWish, photoURL: url })
      } else {
        window.prompt('Unable to upload image')
      }
    } catch {
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
        {addLego.photoURL ? (
          // {newWish.photoURL ? (
          <p>
            {/* <img alt="Lego" width={200} src={newWish.photoURL} /> */}
            <img alt="Lego" width={200} src={addLego.photoURL} />
          </p>
        ) : null}
        <div className="file-drop-zone">
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive
              ? 'Drop the files here ...'
              : 'Drag a picture of the Lego here to upload!'}
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
