import React, { useState } from 'react';
import PlaceDescription from '../PlaceDescription/PlaceDescription'

const List = ({ places }) => {
  const [type, setType] = useState('gym');

  return (
    <div className='p-6'>
      <div className=''>
        <h4>Gyms, Leisure Centres, Running routes and more</h4>
      </div>
      <form className='mb-7'>
        <label htmlFor="">Type</label>
        <input type="text" />
        <select value={type} onChange={(e) => setType(e.target.value)} name="" id="">
          <option value="gym">Gym</option>
        </select>
      </form>

      <div className='grid h-screen overflow-auto'>
        {places?.map((place, index) => (
          <div key={index} className='grid'>
            <PlaceDescription place={place} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default List