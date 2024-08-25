import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import ExcelJS from 'exceljs';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

function DashboardCardDetails() {
    const backendURL = 'http://localhost:3000/';
    const { uniqueId } = useParams(); // Extract uniqueId from URL
    const [cardData, setCardData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = cookies.get("SELECTIFY_TOKEN");

                // Fetch the card details by uniqueId
                const response = await fetch(`${backendURL}gallery/${uniqueId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error('Failed to fetch card details');
                }

                const data = await response.json();
                setCardData(data);

            } catch (error) {
                setError(error.message);
            }
        };

        fetchData();
    }, [uniqueId]);

    const handleSelectedPhoto = async () => {
        if (!cardData) return;

        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet('Selected Photos');

        worksheet.columns = [
            { header: 'Photo Original Name', key: 'originalFileName', width: 30 },
        ];

        cardData.photos.forEach(photo => {
            if (photo.isSelected) {
                worksheet.addRow({
                    originalFileName: photo.originalFileName,
                });
            }
        });

        const buffer = await workbook.xlsx.writeBuffer();
        const url = window.URL.createObjectURL(new Blob([buffer]));
        const a = document.createElement('a');
        a.href = url;
        a.download = 'selected_photos.xlsx';
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (error) return <div>{error}</div>;
    if (!cardData) return <div>Loading...</div>;

    const totalPhotoCount = cardData.photos.length;
    const selectedPhotoCount = cardData.photos.filter(photo => photo.isSelected).length;

    const handleCopySelectionLink = () => {
        const selectionLink = `${window.location.origin}/gallery/${uniqueId}`;
        navigator.clipboard.writeText(selectionLink)
            .then(() => {
                toast.success('Selection link copied to clipboard!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            })
            .catch(err => {
                toast.error('Failed to copy the selection link!', {
                    position: "bottom-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                console.error('Failed to copy text: ', err);
            });
    };

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
            <div className='bg-[#242424] text-slate-200'>

                <div className='h-screen pt-6 flex flex-col items-center gap-9'>
                    <div className='flex justify-center flex-col items-center'>
                        <h1 className='text-4xl uppercase font-bold p-6'>{cardData.name}</h1>
                        <p className='text-2xl font-medium p-5'>Total Number of Photos: {totalPhotoCount}</p>
                        <p className='text-2xl font-medium p-5'>Number of Selected Photos: {selectedPhotoCount}</p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        {selectedPhotoCount > 0 &&
                            <button
                                onClick={handleSelectedPhoto}
                                className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-fit">
                                Export Selected Photos to Excel
                            </button>
                        }
                        <button
                            onClick={handleCopySelectionLink}
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-fit">
                            Copy Selection Link
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default DashboardCardDetails;
