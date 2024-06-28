import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you use React Router for navigation

const FormDataDisplay = ({formData }) => {
    // console.log(formData);
    return (
        <tr className="border-b-4 bg-white">
            <td className="border-r-4 px-6 py-4 w-[200px] font-medium text-gray-900">
                {formData.plant}
            </td>
            <td className="border-r-4 px-6 py-4 w-[200px] font-medium text-gray-900">
                {formData.pmDate}
            </td>
            <td className="border-r-4 px-6 py-4 w-[200px] font-medium text-gray-900">
                {formData.machineName}
            </td>
            <td className="border-r-4 px-6 py-4 w-[200px] font-medium text-gray-900">
                <Link to={`/details/${formData._id}`} className="text-blue-500 hover:text-blue-700">View Details</Link>
            </td>
        </tr>
    );
}

export default FormDataDisplay;
