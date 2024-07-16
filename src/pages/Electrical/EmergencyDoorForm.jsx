import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { EmergencyDoor8 , EmergencyDoor9 } from '../../data/Electrical/emergencyDoor';

const EmergencyDoorForm = () => {
    const navigate = useNavigate();

    const plantDataSet = {
        "TYB-8": EmergencyDoor8,
        "TYB-9": EmergencyDoor9
    }

    // const [selectedPlant, setSelectedPlant] = useState('');
    const [data, setData] = useState([]);

    // Initialize formData with sequential arrays for each label and their remarks
    const initialFormData = {
        unit: '',
        machineName: '',
        frequency: '',
        date: '',
    };

    const [formData, setFormData] = useState(initialFormData);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));

        // Handle machine name selection
        if (name === 'unit') {
            setFormData(prevState => {
                return {
                    ...prevState,
                    unit: value
                }
            })
            const selectedData = plantDataSet[value] || [];
            setData(selectedData);

            // Reset formData for the questions
            const updatedFormData = selectedData.reduce((acc, data) => {
                acc[data.label] = Array(data.question.length).fill({ value: "", action: "", remark: "" });
                return acc;
            }, {});
            setFormData(prevState => ({
                ...prevState,
                ...updatedFormData
            }));
        }
    };

    const handleSelectChange = (e, label, index, type) => {
        const { value } = e.target;
        const newData = [...formData[label]]; // Create a copy of the array

        // Update the answer or remark at the specified index
        newData[index] = {
            ...newData[index],
            [type]: value
        };

        // Update the state
        setFormData(prevState => ({
            ...prevState,
            [label]: newData
        }));
    };

    const submitHandler = async () => {
        console.log(formData);
        // try {
        //     const response = await addController(formData);

        //     if (response.status === 200) {
        //         alert('Data added successfully');
        //     }
        // } catch (err) {
        //     console.log(err.message);
        // }
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            {/* Text fields */}
            <div className="max-w-[1000px] mx-auto bg-white shadow-lg rounded-lg p-4 mb-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Render input fields for plant, department, section, etc. */}
                    {['unit', 'machineName', 'frequency', 'date'].map((field) => (
                        <div className="mb-4" key={field}>
                            <label htmlFor={field} className="block text-gray-900 font-medium">
                                {field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')}
                            </label>
                            {field === 'unit' ? (
                                <select
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                >
                                    <option value="">Select Unit</option>
                                    {Object.keys(plantDataSet).map((plant, index) => (
                                        <option key={index} value={plant}>{plant}</option>
                                    ))}
                                </select>
                            ) : (
                                <input
                                    type={field.includes('Time') ? 'time' : field.includes('date') ? 'date' : 'text'}
                                    id={field}
                                    name={field}
                                    value={formData[field]}
                                    onChange={handleChange}
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2"
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* CLRI data tables */}
            {data.map((data, index) => (
                <div className="flex flex-col max-w-[1000px] mx-auto my-6 bg-white shadow-lg rounded-lg p-4" key={index}>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="inline-block min-w-full py-2 sm:px-6">
                            <div className="overflow-hidden">
                                <table className="min-w-full border-4 text-center text-sm font-light dark:border-neutral-500">
                                    <thead className="border-b-4 bg-gray-200 font-medium dark:border-slate-700">
                                        <tr>
                                            <th scope="col" className="border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                S.No.
                                            </th>
                                            <th scope="col" className="border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                Area
                                            </th>
                                            <th scope="col" className="border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                Door No.
                                            </th>
                                            <th scope="col" className="border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                Working
                                            </th>
                                            <th scope="col" className="border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                Remark
                                            </th>
                                            <th scope="col" className="border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                Action Taken
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {data.question.map((question, qIndex) => (
                                            <tr key={qIndex} className="border-b-4 bg-white">
                                                <td className="whitespace-nowrap border-r-4 px-6 py-4 font-medium dark:border-neutral-500 text-gray-900">
                                                    {qIndex + 1}
                                                </td>

                                                <td className="whitespace-nowrap border-r-4 px-6 py-4 w-[120px] font-medium dark:border-neutral-500 text-gray-900">
                                                    {question}
                                                </td>

                                                <td className="whitespace-nowrap border-r-4 px-6 py-4 font-medium dark:border-neutral-500 text-gray-900">
                                                    {/* {qIndex + 1} */}
                                                </td>

                                                <td className="whitespace-nowrap border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                    <select
                                                        id={`${data.label}-${qIndex}`}
                                                        name={`${data.label}-${qIndex}`}
                                                        value={formData[data.label][qIndex].value || ""}
                                                        onChange={(e) => handleSelectChange(e, data.label, qIndex, 'value')}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[100px] p-2"
                                                    >
                                                        <option value="">Select</option>
                                                        <option value="Yes">Yes</option>
                                                        <option value="No">No</option>
                                                        <option value="NA">NA</option>
                                                    </select>
                                                </td>

                                                <td className="whitespace-nowrap border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                    <input
                                                        type="text"
                                                        placeholder="Remark"
                                                        value={formData[data.label][qIndex].remark || ""}
                                                        onChange={(e) => handleSelectChange(e, data.label, qIndex, 'remark')}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                                                    />

                                                </td>

                                                <td className="whitespace-nowrap border-r-4 px-3 py-4 dark:border-neutral-500 text-gray-900">
                                                    <input
                                                        type="text"
                                                        placeholder="Action taken"
                                                        value={formData[data.label][qIndex].action || ""}
                                                        onChange={(e) => handleSelectChange(e, data.label, qIndex, 'action')}
                                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2"
                                                    />
                                                </td>

                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            ))
            }

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
                    onClick={() => navigate("/show-all")}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    View All Forms
                </button>
            </div>

        </div >
    );
};

export default EmergencyDoorForm;
