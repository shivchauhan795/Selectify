import React from 'react';

const DashboardCard = ({ name, photos, uniqueId }) => {
    return (
        <div className="border-2 border-white border-solid rounded-xl p-4 flex flex-col items-center">
            <h3 className="text-xl font-semibold mb-2 uppercase">{name}</h3>
            <p className="mb-2">Number of Photos: {photos.length}</p>
            <p className="mb-2">Selected Photos: {photos.filter(photo => photo.isSelected).length}</p>
            <button
                className="w-full py-2 rounded bg-slate-600 text-white">
                View Details
            </button>
        </div>
    );
};

export default DashboardCard;
