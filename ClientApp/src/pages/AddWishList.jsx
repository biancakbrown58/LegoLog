import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function AddWishList() {
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
