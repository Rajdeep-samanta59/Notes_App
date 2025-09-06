import React from 'react'
import { useParams } from 'react-router-dom'

const EditNote = () => {
  const { id } = useParams()
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-8 bg-white rounded-lg shadow">Edit note {id}</div>
    </div>
  )
}

export default EditNote
