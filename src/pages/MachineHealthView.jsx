// src/pages/ViewForm.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getParticularMcHealthDataController } from '../services/machineHealth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

const MachineHealthView = () => {
    const { id } = useParams(); // Get the form ID from the route parameters
    const [formData, setFormData] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetchFormData();
    }, []);

    const fetchFormData = async () => {
        try {
            const response = await getParticularMcHealthDataController(id);
            const data = await response.data.data;
            setFormData(data[0]);
        } catch (err) {
            console.log(err);
        }
    };

    if (!formData) {
        return <p>Loading...</p>;
    }

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <button
                onClick={() => navigate('/')}
                className="mb-4 bg-blue-500 text-white px-4 py-2 rounded"
            >
                Back to All Forms
            </button>

            <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)' }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-5xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 transform transition-all duration-300 hover:shadow-2xl">
                    <div className="grid gap-8 grid-cols-1">
                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row items-center">
                                <h2 className="font-semibold text-3xl text-center sm:text-left mb-4 sm:mb-0">Machine Health Declaration</h2>
                            </div>
                            <div className="mt-5">
                                <form className="grid gap-4 grid-cols-1 md:grid-cols-2">


                                    {/* Plant Dropdown */}
                                    <div className="space-y-2">
                                        <label htmlFor="plant" className="font-semibold text-gray-600">
                                            Plant <span title="required">*</span>
                                        </label>
                                        <input
                                            name="plant"
                                            id="plant"
                                            required
                                            readOnly
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            value={formData.plant}

                                        />
                                    </div>

                                    {/* Date */}
                                    <div className="space-y-2">
                                        <label htmlFor="date" className="font-semibold text-gray-600">
                                            Date <span title="required">*</span>
                                        </label>
                                        <input
                                            type="date"
                                            name="date"
                                            id="date"
                                            readOnly
                                            required
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            value={formData.date}

                                        />
                                    </div>

                                    {/* Shift Dropdown */}
                                    <div className="space-y-2">
                                        <label htmlFor="shift" className="font-semibold text-gray-600">
                                            Shift <span title="required">*</span>
                                        </label>
                                        <input
                                            name="shift"
                                            id="shift"
                                            required
                                            readOnly
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            value={formData.shift}

                                        />

                                    </div>

                                    {/* Machine Health Declaration */}
                                    <div className="space-y-2 md:col-span-2 my-6">
                                        <label className="font-semibold text-gray-600">
                                            Is the machine fit to operate? <span title="required">*</span>
                                        </label>
                                        <div className="flex items-center space-x-4">
                                            {formData.machineFit === 'fit' ?
                                                <label className="custom-radio flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="machineFit"
                                                        value="fit"
                                                        checked={formData.machineFit === 'fit'}

                                                        className="hidden"
                                                    />
                                                    <div className={`radio-icon ${formData.machineFit === 'fit' ? 'bg-green-500' : 'bg-gray-300'}`}>
                                                        {formData.machineFit === 'fit' && (
                                                            <FontAwesomeIcon icon={faCheckCircle} className="text-white" />
                                                        )}
                                                    </div>
                                                    <span className="ml-2">Fit</span>
                                                </label>
                                                :
                                                <label className="custom-radio flex items-center">
                                                    <input
                                                        type="radio"
                                                        name="machineFit"
                                                        value="unfit"
                                                        checked={formData.machineFit === 'unfit'}

                                                        className="hidden"
                                                    />
                                                    <div className={`radio-icon ${formData.machineFit === 'unfit' ? 'bg-red-500' : 'bg-gray-300'}`}>
                                                        {formData.machineFit === 'unfit' && (
                                                            <FontAwesomeIcon icon={faTimesCircle} className="text-white" />
                                                        )}
                                                    </div>
                                                    <span className="ml-2">Unfit</span>
                                                </label>
                                            }
                                        </div>
                                    </div>

                                    {formData.machineFit === 'unfit' && (
                                        <>

                                            {/* Departments */}
                                            <div className="space-y-2 md:col-span-2 mb-6 ">
                                                <label className="font-semibold text-gray-600">
                                                    Select Department(s) <span title="required">*</span>
                                                </label>
                                                <div className="flex items-center space-x-4">
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="electrical"
                                                            checked={formData.departments.electrical}
                                                            readOnly
                                                            className="form-checkbox"
                                                        />
                                                        <span className="ml-2">Electrical</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="mechanical"
                                                            checked={formData.departments.mechanical}
                                                            readOnly
                                                            className="form-checkbox"
                                                        />
                                                        <span className="ml-2">Mechanical</span>
                                                    </label>
                                                    <label className="flex items-center">
                                                        <input
                                                            type="checkbox"
                                                            name="utility"
                                                            checked={formData.departments.utility}
                                                            readOnly
                                                            className="form-checkbox"
                                                        />
                                                        <span className="ml-2">Utility</span>
                                                    </label>
                                                </div>
                                            </div>


                                            {/* Action plan */}
                                            <div className="space-y-2 md:col-span-2">
                                                <label htmlFor='inoperativeDetails' className="font-semibold text-gray-600">
                                                    Details of Inoperative Equipment and Reason for Abnormalities <span title="required">*</span>
                                                </label>
                                                <textarea
                                                    required
                                                    name="inoperativeDetails"
                                                    id="inoperativeDetails"
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 h-64 resize-none shadow-sm"
                                                    placeholder="Enter details here"
                                                    spellCheck="false"
                                                    readOnly
                                                    value={formData.inoperativeDetails}
                                                ></textarea>
                                            </div>

                                            {/* TIme bound Plamn */}
                                            <div className="space-y-2 md:col-span-2">
                                                <label htmlFor='actionPlan' className="font-semibold text-gray-600">
                                                    Time-Bound Action Plan for Rectification <span title="required">*</span>
                                                </label>
                                                <textarea
                                                    required
                                                    name="actionPlan"
                                                    id="actionPlan"
                                                    className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 h-64 resize-none shadow-sm"
                                                    placeholder="Enter action plan here"
                                                    spellCheck="false"
                                                    readOnly
                                                    value={formData.actionPlan}
                                                ></textarea>
                                            </div>
                                        </>
                                    )}

                                    {/* HOD Name */}
                                    <div className="space-y-2">
                                        <label htmlFor='hodName' className="font-semibold text-gray-600">
                                            HOD Name <span title='required'>*</span>
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            required
                                            type="text"
                                            name="hodName"
                                            id="hodName"
                                            readOnly
                                            value={formData.hodName}
                                        />
                                    </div>

                                    {/* Salary Code */}
                                    <div className="space-y-2">
                                        <label htmlFor='salaryCode' className="font-semibold text-gray-600">
                                            Salary Code <span title='required'>*</span>
                                        </label>
                                        <input
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            required
                                            type="text"
                                            name="salaryCode"
                                            id="salaryCode"
                                            readOnly
                                            value={formData.salaryCode}
                                        />
                                    </div>

                                    {/* HOD Remarks */}
                                    {formData.verified ? <div className="space-y-2 md:col-span-2">
                                        <label htmlFor='hodRemarks' className="font-semibold text-gray-600">
                                            HOD Remarks <span title='required'>*</span>
                                        </label>
                                        <textarea
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 h-64 resize-none shadow-sm"
                                            required
                                            name="hodRemarks"
                                            id="hodRemarks"
                                            readOnly
                                            value={formData.hodRemarks}
                                        ></textarea>
                                    </div> : null}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        </div>
    );
};



export default MachineHealthView;
