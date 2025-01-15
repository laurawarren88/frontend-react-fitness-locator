import React, { useState, useEffect, createRef } from 'react';
import PlaceDescription from './PlaceDescription'

const List = ({ places, childClicked, setChildClicked, isLoading }) => {
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
    <div className="flex h-[70vh]">
      <div className="overflow-y-scroll">
      {isLoading ? (
        <div className='flex justify-center items-center h-screen'>
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-blue-500">“Loading…”</div>
        </div>
      ) : (
        <>
          {places.length === 0 ? (
            <div className="w-full text-center text-vibrantBlue p-4 border border-gray-300 rounded-md">
              <p>No options found for the selected type and radius.</p>
            </div>
          ) : (
            <div>
              {places?.map((place, index) => (
                console.log("List Place:", place),
                <div
                  // key={index}
                  key={place.id} 
                  className={`list-item ${childClicked === index ? 'highlight' : ''}`}
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
    </div>
  );
};

export default List;