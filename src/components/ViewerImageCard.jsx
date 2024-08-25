import React, { useState } from 'react';

const ViewerImageCard = ({ photoUrl, originalFileName, isSelected: initialIsSelected, id, uniqueID }) => {
    const [isSelected, setIsSelected] = useState(initialIsSelected);
    const backendURL = 'http://localhost:3000/';

    const handleIsSelectedClick = async () => {
        try {
            const newSelectionState = !isSelected;

            const response = await fetch(`${backendURL}photolinks/${originalFileName}/${id}/${uniqueID}/select`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isSelected: newSelectionState })
            });

            if (!response.ok) {
                throw new Error('Failed to update selection');
            }

            // Update local state to reflect the new selection state
            setIsSelected(newSelectionState);
        } catch (err) {
            console.error('Failed to update selection:', err);
        }
    };

    return (
        <div className={`border-2 border-black border-solid rounded-xl p-4 ${isSelected ? 'bg-green-200' : 'bg-slate-300'}`}>
            <img className="w-full h-auto mb-2 rounded-xl pointer-events-none" src={photoUrl} alt={originalFileName} />
            <p className="text-center mb-2">{originalFileName}</p>
            <button
                className={`w-full py-2 rounded ${isSelected ? 'bg-green-500' : 'bg-blue-500'} text-white`}
                onClick={handleIsSelectedClick}
            >
                {isSelected ? 'Selected' : 'Select'}
            </button>
        </div>
    );
};

export default ViewerImageCard;
