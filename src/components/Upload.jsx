import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

const Upload = () => {
    const navigate = useNavigate();
    const backendURL = 'http://localhost:3000/';
    const token = cookies.get("SELECTIFY_TOKEN");
    const [uploading, setUploading] = useState(false);
    const [files, setFiles] = useState([]);
    const [name, setName] = useState('');
    const [originalFileNames, setOriginalFileNames] = useState([]);

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(selectedFiles);
        setOriginalFileNames(selectedFiles.map(file => file.name));
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUploading(true);

        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append('photos', file);
        });
        formData.append('originalFileNames', JSON.stringify(originalFileNames));
        formData.append('name', name);

        try {
            const response = await fetch(`${backendURL}api/upload`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }

            const result = await response.json();
            setName('');
            setFiles([]);
            toast.success('Photos Uploaded Successfully!!', {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);

        } catch (err) {
            toast.error(`Uploading Failed!! ${err.message}`, {
                position: 'bottom-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark',
            });
        } finally {
            setUploading(false);
        }
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

                <div className="upload-container flex pt-12 flex-col items-center h-screen">
                    <h1 className='text-3xl uppercase p-6 font-bold'>Upload Photos</h1>
                    <form onSubmit={handleSubmit} className='flex flex-col items-center justify-center p-6'>
                        <input
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            placeholder="Enter folder name"
                            required
                            className='border-2 border-solid border-white w-full p-1 pl-2 rounded-xl bg-black text-white'
                        />
                        <input
                            type="file"
                            multiple
                            onChange={handleFileChange}
                            required
                            className='flex justify-center p-4'
                        />
                        <button className='border-2 border-solid px-2 py-1 border-white' type="submit" disabled={uploading}>
                            {uploading ? 'Uploading...' : 'Upload'}
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Upload;
