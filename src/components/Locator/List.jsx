import React, { useState, useEffect, createRef } from 'react';
import PlaceDescription from './PlaceDescription'

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
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500">“Loading…”</div>
        </div>
      ) : (
        <>

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