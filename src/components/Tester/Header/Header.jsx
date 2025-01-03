import React from 'react'
import { Autocomplete } from '@react-google-maps/api'
import { LiaSearchLocationSolid } from "react-icons/lia";

const Header = () => {
  return (
    // {/* Header Bar Container */}
    <div className='static'> 
      <div className='flex justify-between'>

        <div className='block'>
          <h1>Fitness Locator</h1>
        </div>
        
        {/* Search Element */}
        <div className='flex'>
          <div className='block'>
            <h2>Explore</h2>
          </div>

          {/* <Autocomplete> */}
          <div className='relative rounded bg-white width-full'>
            <div className='absolutee height-full flex items-center pl-3'>
              <LiaSearchLocationSolid />
            </div>
            <input
            id="keyword"
            type="text"
            name="keyword"
            placeholder="Search for an activity"
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-energeticGreen"
            required
            />
          {/* </Autocomplete> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Header