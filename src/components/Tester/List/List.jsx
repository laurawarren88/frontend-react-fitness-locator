import React, { useState, useEffect, createRef } from 'react';
import PlaceDescription from '../PlaceDescription/PlaceDescription'

const List = ({ places, type, setType, radius, setRadius, childClicked, setChildClicked, isLoading }) => {
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    const refs = Array(places?.length)
    .fill()
    .map((_, index) => elRefs[index] || createRef());
    setElRefs(refs);
    // console.log("List Places:", places);
  }, [places]);

  useEffect(() => {
    if (childClicked !== null && elRefs[childClicked]?.current) {
      elRefs[childClicked].current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [childClicked, elRefs]);

  return (
    <div className='p-6'>
        <h4>Gyms, Leisure Centres, Running routes and more</h4>
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500"></div>
        </div>
      ) : (
        <>
          <form className='mb-7'>
            <label htmlFor="type">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="gym">Gym</option>
              <option value="leisure+center">Leisure Center</option>
              <option value="running+track">Running Track</option>
              <option value="sports+club">Sports Club</option>
              <option value="yoga+studio">Yoga Studio</option>
              <option value="pilates+studio">Pilates Studio</option>
              <option value="crossfit+box">Crossfit Box</option>
              <option value="fitness+bootcamp">Fitness Bootcamp</option>
              <option value="health+club">Health Club</option>
              <option value="personal+trainer">Personal Trainer</option>
              <option value="dance+studio">Dance Studio</option>
              <option value="martial+arts">Martial Arts</option>
              <option value="swimming+pool">Swimming Pool</option>
              <option value="basketball+court">Basketball Court</option>
              <option value="tennis+court">Tennis Court</option>
              <option value="golf+course">Golf Course</option>
              <option value="skiing+snowboarding+center">Skiing/Snowboarding Center</option>
              <option value="cycling+route">Cycling Route</option>
              <option value="hiking+trail">Hiking Trail</option>
              <option value="rock+climbing+center">Rock Climbing Center</option>
              <option value="spa+wellness+center">Spa and Wellness Center</option>
              <option value="boxing+gym">Boxing Gym</option>
              <option value="cycling+studio">Cycling Studio</option>
              <option value="rowing+center">Rowing Center</option>
              <option value="horse+riding+center">Horse Riding Center</option>
              <option value="meditation+center">Meditation Center</option>
            </select>
          </form>
          <form className='mb-7'>
            <label htmlFor="radius">Radius</label>
            <select 
            value={radius} 
            onChange={(e) => setRadius(e.target.value)}>
              {/* <option value="8047">Within 5 miles</option>
              <option value="16093">Within 10 miles</option>
              <option value="24140">Within 15 miles</option>
              <option value="32187">Within 20 miles</option>
              <option value="80467">Within 50 miles</option> */}
              <option value="1600">Within 1 mile</option>
              <option value="3200">Within 2 miles</option>
              <option value="4800">Within 3 miles</option>
              <option value="6400">Within 4 miles</option>
              <option value="8000">Within 5 miles</option>
            </select>

          </form>

          {places.length === 0 ? (
            <div className="text-center text-gray-500">
              <p>No options found for the selected type and radius.</p>
            </div>
          ) : (
            <div className='grid h-screen overflow-auto'>
            {places?.map((place, index) => (
              <div
                key={index}
                className={`grid ${childClicked === index ? 'bg-blue-100' : ''}`} 
                onClick={() => {setChildClicked(index);}}
                ref={elRefs[index]}
              >
                  <PlaceDescription 
                    place={place}
                    selected={Number(childClicked) === index}
                    refProp={elRefs[index]} 
                  />
              </div>
            ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default List;