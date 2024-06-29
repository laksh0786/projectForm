import React, { useState } from 'react';

const FormPage = () => {


    const [buffingData , setBuffingData] = useState({
        unit: '',
        machineName: '',
        machineNo: '',
        buffingDate: '',
        cotsDescription: '',
        cotsDia: '',
        cotsMake: '',
        doneBy: '',
        verifiedBy: '',
        remarks: ''
    })

    const changeHandler = (e)=>{
        setBuffingData({
            ...buffingData,
            [e.target.name]: e.target.value
        })
    }


    const clickHandler = (e)=>{
        e.preventDefault();
        console.log(buffingData);
    }


    return (
        <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
            style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)' }}>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
            <div className="max-w-5xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 transform transition-all duration-300 hover:shadow-2xl">
                <div className="grid gap-8 grid-cols-1">
                    <div className="flex flex-col">
                        <div className="flex flex-col sm:flex-row items-center">
                            <h2 className="font-semibold text-3xl text-center sm:text-left mb-4 sm:mb-0">Cost Buffing Record</h2>
                        </div>
                        <div className="mt-5">
                            <form className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                <div className="space-y-2">
                                    <label htmlFor='unit' className="font-semibold text-gray-600">
                                        Unit <span title='required'>*</span>
                                    </label>
                                    <input
                                        placeholder="Unit"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        required
                                        type="text"
                                        name="unit"
                                        id="unit"
                                        onChange={changeHandler}
                                        value={buffingData.unitNo}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor='machineName' className="font-semibold text-gray-600">
                                        Machine Name <span title='required'>*</span>
                                    </label>
                                    <input
                                        placeholder="Machine Name"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        required
                                        type="text"
                                        name="machineName"
                                        id="machineName"
                                        onChange={changeHandler}
                                        value={buffingData.machineName}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor='machineNo' className="font-semibold text-gray-600">
                                        Machine No. <span title="required">*</span>
                                    </label>
                                    <input
                                        placeholder="1"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        required
                                        type="text"
                                        name="machineNo"
                                        id="machineNo"
                                        onChange={changeHandler}
                                        value={buffingData.machineNo}

                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor='buffingDate' className="font-semibold text-gray-600">
                                        Buffing Date <span title="required">*</span>
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        type="date"
                                        name="buffingDate"
                                        id="buffingDate"
                                        onChange={changeHandler}
                                        value={buffingData.buffingDate}
                                        required
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor='cotsDescription' className="font-semibold text-gray-600">
                                        Cots Description <span title="required">*</span>
                                    </label>
                                    <textarea
                                        required
                                        name="cotsDescription"
                                        id="cotsDescription"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 h-32 resize-none shadow-sm"
                                        placeholder="Enter your cots description here"
                                        spellCheck="false"
                                        onChange={changeHandler}
                                        value={buffingData.cotsDescription}
                                    ></textarea>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor='cotsDia' className="font-semibold text-gray-600">
                                        Cots Dia. <span title='required'>*</span>
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        required
                                        type="text"
                                        name="cotsDia"
                                        id="cotsDia"
                                        onChange={changeHandler}
                                        value={buffingData.cotsDia}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor='cotsMake' className="font-semibold text-gray-600">
                                        Cots Make <span title='required'>*</span>
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        required
                                        type="text"
                                        name="cotsMake"
                                        id="cotsMake"
                                        onChange={changeHandler}
                                        value={buffingData.cotsMake}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor='doneBy' className="font-semibold text-gray-600">
                                        Done By <span title='required'>*</span>
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        required
                                        type="text"
                                        name="doneBy"
                                        id="doneBy"
                                        onChange={changeHandler}
                                        value={buffingData.doneBy}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor='verifiedBy' className="font-semibold text-gray-600">
                                        Verified By <span title='required'>*</span>
                                    </label>
                                    <input
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                        required
                                        type="text"
                                        name="verifiedBy"
                                        id="verifiedBy"
                                        onChange={changeHandler}
                                        value={buffingData.verifiedBy}
                                    />
                                </div>

                                <div className="space-y-2 md:col-span-2">
                                    <label htmlFor='remarks' className="font-semibold text-gray-600">
                                        Remarks
                                    </label>
                                    <textarea
                                        name="remarks"
                                        id="remarks"
                                        className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 h-32 resize-none shadow-sm"
                                        placeholder="Enter your remarks here"
                                        spellCheck="false"
                                        onChange={changeHandler}
                                        value={buffingData.remarks}
                                    ></textarea>
                                </div>

                                <p className="text-xs text-red-500 text-right my-3 md:col-span-2">
                                    Required fields are marked with an asterisk <abbr title="Required field">*</abbr>
                                </p>

                                <div className="mt-5 text-center md:space-x-3 md:block flex flex-col md:col-span-2">
                                    <button className="mb-2 md:mb-0 bg-green-400 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full transform hover:scale-105 transition duration-300 ease-in-out hover:bg-green-500" onClick={clickHandler}>
                                        Save
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormPage;
