import React from 'react'

const EditorialNotes = ({note}) => {
  return (
    <div className='bg-gradientPurple px-8'>
        <p className='text-white'>{note?.standard}</p>
      <hr />
    </div>
  )
}

export default EditorialNotes