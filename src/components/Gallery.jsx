import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ViewerImageCard from './ViewerImageCard';

const Gallery = () => {
  const backendURL = 'https://selectify-backend.onrender.com/';
  const { nameId } = useParams();
  const [photos, setPhotos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${backendURL}gallery/show/${nameId}`);
        if (response.status === 403) {
          throw new Error('Link has been visited too many times');
        }
        if (!response.ok) {
          throw new Error('Failed to fetch photos');
        }
        const result = await response.json();

        if (result.photos) {
          setPhotos(result.photos);
        } else {
          setError('No photos found');
        }

      } catch (err) {
        setError(err.message);
      }
    };

    fetchPhotos();
  }, [nameId]);

  return (
    <div className="gallery-container bg-[#242424]">

      <h1 className='text-center text-3xl uppercase font-bold p-6 text-slate-200'>Select Photos</h1>
      {/* {error && <p className="error">{error}</p>} */}
      {/* flex flex-wrap justify-center p-8 gap-10 */}
      <div className="photos grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-7">
        {photos.length > 0 ? (

          photos.map((photo) => (
            <ViewerImageCard
              key={photo.uniquePhotoId}
              photoUrl={photo.photoUrl}
              originalFileName={photo.originalFileName}
              isSelected={photo.isSelected}
              id={photo.uniquePhotoId}
              uniqueID={nameId}
            />
          ))
        ) : (
          <p className="text-center flex justify-center pt-7 text-red-600">{error} !!</p>
        )}
      </div>
    </div>
  );
};

export default Gallery;
