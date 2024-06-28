import React, { useState } from 'react';
import clriData from '../data/clriData';
import { addController } from '../services/clriFormController';
import { useNavigate } from 'react-router-dom';

const CLRIForm = () => {

    const navigate = useNavigate();

    // Initialize formData with sequential arrays for each label
    const initialFormData = clriData.reduce((acc, data) => {
        acc[data.label] = Array(data.question.length).fill("").map(() => (""));
     return acc;
    }, {
        plant: '',
        department: '',
        section: '',
        machineName: '',
        pmFrequency: '',
        pmType: '',
        pmTeamMember: '',
        pmDate: '',
        pmStartTime: '',
        pmFinishTime: ''
    });

    const [formData, setFormData] = useState(initialFormData);

    

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSelectChange = (e, label, index) => {
        const { value } = e.target;
        const newData = [...formData[label]]; // Create a copy of the array

        // Update the answer at the specified index
        newData[index] = value;

        // Update the state
        setFormData(prevState => ({
            ...prevState,
            [label]: newData
        }));
    };

    const submitHandler = async () => {

        // console.log(formData);

        // Aading the formdata
        try {

            const response = await addController(formData);
            // console.log(response.data);

            if (response.status === 200) {
                alert('Data added successfully')
            }


        } catch (err) {
            console.log(err.message);
        }

    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Text fields */}
            <div className="max-w-[1000px] mx-auto bg-white shadow-lg rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="mb-4">
                        <label htmlFor="plant" className="block text-gray-900 font-medium">Plant</label>
                        <input
                            type="text"
                            id="plant"
                            name="plant"
                            value={formData.plant}
                            onChange={(e) => handleChange(e, 'plant')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="department" className="block text-gray-900 font-medium">Department</label>
                        <input
                            type="text"
                            id="department"
                            name="department"
                            value={formData.department}
                            onChange={(e) => handleChange(e, 'department')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="section" className="block text-gray-900 font-medium">Section</label>
                        <input
                            type="text"
                            id="section"
                            name="section"
                            value={formData.section}
                            onChange={(e) => handleChange(e, 'section')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="machineName" className="block text-gray-900 font-medium">Machine Name</label>
                        <input
                            type="text"
                            id="machineName"
                            name="machineName"
                            value={formData.machineName}
                            onChange={(e) => handleChange(e, 'machineName')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pmFrequency" className="block text-gray-900 font-medium">PM Frequency</label>
                        <input
                            type="text"
                            id="pmFrequency"
                            name="pmFrequency"
                            value={formData.pmFrequency}
                            onChange={(e) => handleChange(e, 'pmFrequency')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pmType" className="block text-gray-900 font-medium">PM Type</label>
                        <input
                            type="text"
                            id="pmType"
                            name="pmType"
                            value={formData.pmType}
                            onChange={(e) => handleChange(e, 'pmType')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pmTeamMember" className="block text-gray-900 font-medium">PM Team Member</label>
                        <input
                            type="text"
                            id="pmTeamMember"
                            name="pmTeamMember"
                            value={formData.pmTeamMember}
                            onChange={(e) => handleChange(e, 'pmTeamMember')}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pmDate" className="block text-gray-900 font-medium">PM Date</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                                </svg>
                            </div>
                            <input
                                id="pmDate"
                                name="pmDate"
                                type="date"
                                value={formData.pmDate}
                                onChange={(e) => handleChange(e, 'pmDate')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-2"
                                placeholder="Select date"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pmStartTime" className="block text-gray-900 font-medium">PM Start Time</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                id="pmStartTime"
                                name="pmStartTime"
                                type="time"
                                value={formData.pmStartTime}
                                onChange={(e) => handleChange(e, 'pmStartTime')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-2"
                                placeholder="Select start time"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pmFinishTime" className="block text-gray-900 font-medium">PM Finish Time</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm11-4a1 1 0 1 0-2 0v4a1 1 0 0 0 .293.707l3 3a1 1 0 0 0 1.414-1.414L13 11.586V8Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                id="pmFinishTime"
                                name="pmFinishTime"
                                type="time"
                                value={formData.pmFinishTime}
                                onChange={(e) => handleChange(e, 'pmFinishTime')}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 pr-4 py-2"
                                placeholder="Select finish time"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* CLRI data tables */}
            {clriData.map((data, index) => (
                <div className="flex flex-col max-w-[1000px] mx-auto my-6 bg-white shadow-lg rounded-lg p-4" key={index}>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full border-4 text-center text-sm font-light dark:border-neutral-500">
                                    <thead className="border-b-4 bg-gray-200 font-medium dark:border-slate-700">
                                        <tr>
                                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                                PM Type
                                            </th>
                                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                                PM Activity
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="border-b-4 bg-white">
                                            <td className="whitespace-nowrap border-r-4 px-6 py-4 w-[200px] font-medium dark:border-neutral-500 text-gray-900">
                                                {data.label}
                                            </td>
                                            <td className="whitespace-nowrap border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                {data.question.map((question, qIndex) => (
                                                    <div key={qIndex} className="flex items-center gap-x-4 my-4">
                                                        <label htmlFor={`${data.label}-${qIndex}`} className="w-[400px] text-left text-gray-900 font-medium">
                                                            {qIndex + 1}. {question}
                                                        </label>
                                                        <select
                                                            id={`${data.label}-${qIndex}`}
                                                            name={`${data.label}-${qIndex}`}
                                                            value={formData[data.label][qIndex] || ""}
                                                            onChange={(e) => handleSelectChange(e, data.label, qIndex)}
                                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2"
                                                        >
                                                            <option value="">Select</option>
                                                            <option value="Yes">Yes</option>
                                                            <option value="No">No</option>
                                                            <option value="NA">NA</option>
                                                        </select>
                                                    </div>
                                                ))}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Submit Button */}
            <div className="flex justify-center mt-6 gap-x-7">
                <button
                    type="button"
                    onClick={submitHandler}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    Submit
                </button>
                
                <button
                    type="button"
                    onClick={()=>navigate("/show-all") }
                    className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    View All Forms
                </button>
            </div>

        </div>
    );
};

export default CLRIForm;
