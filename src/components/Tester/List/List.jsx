import React, { useState, useEffect, createRef } from 'react';
import PlaceDescription from '../PlaceDescription/PlaceDescription'

const List = ({ places, childClicked, setChildClicked, isLoading }) => {
  const [type, setType] = useState('gym');
  const [elRefs, setElRefs] = useState([]);

  useEffect(() => {
    console.log(places);
    const refs = Array(places?.length)
    .fill()
    .map((_, index) => elRefs[index] || createRef());
    setElRefs(refs);
  }, [places]);

  // Scroll to the clicked card
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
            <label htmlFor="">Type</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="gym">Gym</option>
            </select>
          </form>

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
      </>
       )}
    </div>
  );
};

export default List;