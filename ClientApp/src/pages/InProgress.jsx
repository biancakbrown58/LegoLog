import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

export function InProgress() {
  return (
    <div>
      <h2 className="page-title">In Progress</h2>
      <img
        className="in-progress-photo"
        src="https://www.placecage.com/g/300/200"
        alt=""
      />
      <table className="in-progress-table">
        <thead>
          <tr>
            <th>BBBugatti</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>PIECES - 1,000</td>
          </tr>
          <tr>
            <td>SN - 123456</td>
          </tr>
          <tr>
            <td>THEME - Technic</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
