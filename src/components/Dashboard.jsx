import React, { useEffect, useState } from 'react';
import DashboardCard from './DashboardCard';
import { Link } from 'react-router-dom';

const Dashboard = () => {
    const backendURL = 'http://localhost:3000/';
    const [photoLinks, setPhotoLinks] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPhotoLinks = async () => {
            try {
                const response = await fetch(`${backendURL}gallery`);
                if (!response.ok) {
                    throw new Error('Failed to fetch photo links');
                }
                const result = await response.json();
                setPhotoLinks(result);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchPhotoLinks();
    }, []);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <div className='bg-[#242424] text-slate-200'>

                <div className="container mx-auto py-8 h-screen flex flex-col justify-start items-center">
                    <h1 className="text-3xl font-bold mb-8 text-center">Photo Gallery Dashboard</h1>
                    <div className="flex flex-wrap justify-center p-8 gap-10">
                        {photoLinks.length > 0 ? (
                            photoLinks.map((link) => (
                                <Link to={`/card/${link.uniqueId}`} key={link._id}>
                                    <DashboardCard
                                        name={link.name}
                                        photos={link.photos}
                                        uniqueId={link.uniqueId}
                                    />
                                </Link>
                            ))) : (<p className="text-center text-lg">No photo links have been created so far.</p>)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
