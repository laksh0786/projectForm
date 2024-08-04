import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getAllMachineHealthDataController } from '../services/machineHealth';

const MachineHealthFormAll = () => {
    const [formDataList, setFormList] = useState([]);
    const [filteredForms, setFilteredForms] = useState([]);
    const [filter, setFilter] = useState('all');
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Authentication state
    const navigate = useNavigate();

    async function getAllForms() {
        try {
            const response = await getAllMachineHealthDataController();
            const data = await response.data.data;
            setFormList(data);
            setFilteredForms(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        // Check if the user is logged in (this is just a placeholder)
        // In a real app, you'd check an authentication token or similar
        const checkLoginStatus = () => {
            // This is just a placeholder logic. Replace it with actual login check.
            const loggedIn = !!localStorage.getItem('userToken');
            setIsLoggedIn(loggedIn);
        };

        checkLoginStatus();
        getAllForms();
    }, []);

    useEffect(() => {
        if (filter === 'all') {
            setFilteredForms(formDataList);
        } else if (filter === 'verified') {
            setFilteredForms(formDataList.filter(form => form.verified === 1));
        } else if (filter === 'unverified') {
            setFilteredForms(formDataList.filter(form => form.verified === 0));
        }
    }, [filter, formDataList]);

    const parseDepartments = (departments) => {
        try {
            return JSON.parse(departments).join(', ');
        } catch (error) {
            console.error('Invalid JSON:', error);
            return '';
        }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[1000px] mx-auto bg-white shadow-lg rounded-lg p-4 mb-6">
                {isLoggedIn && (
                    <button
                        onClick={() => navigate('/login')}
                        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
                    >
                        Login to Verify
                    </button>
                )}
                <div className="mb-4">
                    <button
                        onClick={() => setFilter('all')}
                        className={`mr-2 px-4 py-2 rounded ${filter === 'all' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        All Forms
                    </button>
                    <button
                        onClick={() => setFilter('verified')}
                        className={`mr-2 px-4 py-2 rounded ${filter === 'verified' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Verified Forms
                    </button>
                    <button
                        onClick={() => setFilter('unverified')}
                        className={`px-4 py-2 rounded ${filter === 'unverified' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
                    >
                        Unverified Forms
                    </button>
                </div>
                <table className="min-w-full border-4 text-center text-sm font-light dark:border-neutral-500">
                    <thead className="border-b-4 bg-gray-200 font-medium dark:border-slate-700">
                        <tr>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Plant
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Date
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Shift
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Machine Fit
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                HOD Name
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Verified
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredForms.map((formData) => (
                            <tr key={formData.id} className="bg-white border-b-4 dark:border-gray-700">
                                <td className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">{formData.plant}</td>
                                <td className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">{formData.date}</td>
                                <td className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">{formData.shift}</td>
                                <td className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">{formData.machineFit}</td>
                                <td className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">{formData.hodName}</td>
                                <td className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                    {formData.verified ? (
                                        <FontAwesomeIcon icon={faCheckCircle} className="text-green-500" />
                                    ) : (
                                        <FontAwesomeIcon icon={faTimesCircle} className="text-red-500" />
                                    )}
                                </td>

                                <td className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                    <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => navigate(`/machine-health-details/${formData.id}`)}
                                    >
                                        View Details
                                    </button>

                                    { formData.verified == 0 ? <button
                                        className="text-blue-500 hover:underline"
                                        onClick={() => navigate(`/verify-machine-health/${formData.id}`)}
                                    >
                                        Verify
                                    </button> : null }

                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MachineHealthFormAll;
