import React, { useEffect, useState } from 'react';
import FormDataDisplay from '../components/FormDataDisplay'; // Import the component created above
import { getAllController } from '../services/clriFormController';

const CLRIALLFORMS = () => {

    const [formDataList , setFormList]  = useState([]);

    async function getAllClriForms(){

        try{

            const response = await getAllController();
            const data = await response.data.data;

            setFormList(data);

        } catch(err){
            console.log(err);
        }

    }

    useEffect(()=>{

        getAllClriForms();

    })

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="max-w-[1000px] mx-auto bg-white shadow-lg rounded-lg p-4 mb-6">
                <table className="min-w-full border-4 text-center text-sm font-light dark:border-neutral-500">
                    <thead className="border-b-4 bg-gray-200 font-medium dark:border-slate-700">
                        <tr>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Plant
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                PM Date
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Machine Name
                            </th>
                            <th scope="col" className="border-r-4 px-6 py-4 dark:border-neutral-500 text-gray-900">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {formDataList.map(formData => (
                            <FormDataDisplay key={formData.id} formData={formData} />
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default CLRIALLFORMS;
