import React, { useEffect, useState } from 'react';

const RingTraveller = () => {
    const [machines, setMachines] = useState([
        {
            machineNo: 'Machine 1',
            parts: {
                "Type 1": { lastChangeDate: '2024-07-01', frequency: 18 },
                "Type 2": { lastChangeDate: '2024-07-03', frequency: 16 },
            }
        },
        {
            machineNo: 'Machine 2',
            parts: {
                "Type 1": { lastChangeDate: '2024-07-05', frequency: 14 },
                "Type 2": { lastChangeDate: '2024-07-10', frequency: 9 },
            }
        },
        {
            machineNo: 'Machine 3',
            parts: {
                "Type 1": { lastChangeDate: '2024-07-09', frequency: 11 },
                "Type 2": { lastChangeDate: '2024-07-12', frequency: 7 },
            }
        },
    ]);

    const [selectedMachine, setSelectedMachine] = useState('');
    const [selectedType, setSelectedType] = useState('Type 1');
    const [productChanged, setProductChanged] = useState(false);
    const [newChangeDate, setNewChangeDate] = useState('');

    const [data, setData] = useState({
        consumableSparePart: "Ring Traveller",
        type: "Type 1",
        frequency: 20,
        lastChangeDate: '',
        nextChangeDate: ''
    });

    const calculateNextChangeDate = (lastChangeDate, frequency) => {
        const lastDate = new Date(lastChangeDate);
        lastDate.setDate(lastDate.getDate() + frequency);
        return lastDate.toISOString().split('T')[0];
    };

    useEffect(() => {
        if (selectedMachine === '') {
            setData(prevData => ({
                ...prevData,
                lastChangeDate: '',
                nextChangeDate: '',
                frequency: ''
            }));
        } else {
            const machine = machines.find(machine => machine.machineNo === selectedMachine);
            const partData = machine.parts[selectedType];
            setData(prevData => ({
                ...prevData,
                lastChangeDate: partData.lastChangeDate,
                nextChangeDate: calculateNextChangeDate(partData.lastChangeDate, partData.frequency),
                frequency: partData.frequency
            }));
        }
    }, [selectedMachine, selectedType, machines]);

    useEffect(() => {
        const today = new Date();
        const todayDateStr = today.toISOString().split('T')[0];
        const tomorrowDate = new Date(today);
        tomorrowDate.setDate(today.getDate() + 1);
        const tomorrowDateStr = tomorrowDate.toISOString().split('T')[0];

        let alertMessage = '';

        machines.forEach(machine => {
            Object.keys(machine.parts).forEach(partType => {
                const part = machine.parts[partType];
                const nextChangeDate = calculateNextChangeDate(part.lastChangeDate, part.frequency);

                // Debugging logs
                console.log(`Machine: ${machine.machineNo}, Part: ${partType}, Last Change Date: ${part.lastChangeDate}, Frequency: ${part.frequency}, Next Change Date: ${nextChangeDate}`);

                if (nextChangeDate === tomorrowDateStr) {
                    alertMessage += `Machine: ${machine.machineNo}, Part: ${partType}, Next Change Date: ${nextChangeDate}\n`;
                }
            });
        });

        if (alertMessage) {
            alert(`Parts to be changed tomorrow:\n${alertMessage}`);
        }
    }, [machines]);

    const changeHandler = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
            nextChangeDate: name === 'lastChangeDate' || name === 'frequency' ? calculateNextChangeDate(value, prevData.frequency) : prevData.nextChangeDate
        }));
    };

    const machineChangeHandler = (e) => {
        setSelectedMachine(e.target.value);
    };

    const typeChangeHandler = (e) => {
        setSelectedType(e.target.value);
    };

    const productChangedHandler = (e) => {
        setProductChanged(e.target.checked);
    };

    const newChangeDateHandler = (e) => {
        setNewChangeDate(e.target.value);
    };

    const clickHandler = (e) => {
        e.preventDefault();
        let updatedMachines = [...machines];
        const machineIndex = updatedMachines.findIndex(machine => machine.machineNo === selectedMachine);
        
        if (machineIndex !== -1) {
            const partData = updatedMachines[machineIndex].parts[selectedType];
            const calculatedNextChangeDate = calculateNextChangeDate(partData.lastChangeDate, partData.frequency);
            const todayDateStr = new Date().toISOString().split('T')[0];

            let updatedLastChangeDate = todayDateStr;

            if (calculatedNextChangeDate === todayDateStr) {
                partData.lastChangeDate = updatedLastChangeDate;
                partData.nextChangeDate = calculateNextChangeDate(updatedLastChangeDate, partData.frequency);
            } else if (productChanged) {
                updatedLastChangeDate = newChangeDate || updatedLastChangeDate;
                partData.lastChangeDate = updatedLastChangeDate;
                partData.nextChangeDate = calculateNextChangeDate(updatedLastChangeDate, partData.frequency);
            } else {
                alert('Next change date does not match the calculated date. Please confirm the change.');
                return;
            }
            
            // Reset productChanged state
            setProductChanged(false);
            setNewChangeDate(''); // Optionally clear the new change date

            // Update state with new machine data
            setMachines(updatedMachines);

            // Update form data
            setData(prevData => ({
                ...prevData,
                lastChangeDate: updatedLastChangeDate,
                nextChangeDate: calculateNextChangeDate(updatedLastChangeDate, prevData.frequency)
            }));
        }
    };

    const selectedMachineData = selectedMachine ? machines.find(machine => machine.machineNo === selectedMachine) : null;

    return (
        <div className="relative min-h-screen bg-gray-100">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-teal-500 opacity-70"></div>
            <div className="relative max-w-6xl mx-auto p-8 bg-white rounded-lg shadow-xl mt-12 mb-12 z-10">
                <h2 className="text-4xl font-bold text-gray-800 text-center mb-10">Ring Traveller Maintenance</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Form Section */}
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-2xl font-semibold text-gray-800 mb-6">Maintenance Form</h3>
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label htmlFor='consumableSparePart' className="block text-sm font-medium text-gray-700">
                                        Consumable Spare Part
                                    </label>
                                    <input
                                        placeholder="Part"
                                        className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        type="text"
                                        name="consumableSparePart"
                                        id="consumableSparePart"
                                        onChange={changeHandler}
                                        value={data.consumableSparePart}
                                    />
                                </div>

                                <div>
                                    <label htmlFor='type' className="block text-sm font-medium text-gray-700">
                                        Type
                                    </label>
                                    <select
                                        className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        name="type"
                                        id="type"
                                        onChange={typeChangeHandler}
                                        value={selectedType}
                                    >
                                        <option value="Type 1">Type 1</option>
                                        <option value="Type 2">Type 2</option>
                                        {/* Add more types as needed */}
                                    </select>
                                </div>

                                <div>
                                    <label htmlFor='frequency' className="block text-sm font-medium text-gray-700">
                                        Frequency (days)
                                    </label>
                                    <input
                                        placeholder="Frequency"
                                        className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        type="number"
                                        name="frequency"
                                        id="frequency"
                                        onChange={changeHandler}
                                        value={data.frequency}
                                    />
                                </div>

                                <div>
                                    <label htmlFor='machineNo' className="block text-sm font-medium text-gray-700">
                                        Machine Number
                                    </label>
                                    <select
                                        className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        name="machineNo"
                                        id="machineNo"
                                        onChange={machineChangeHandler}
                                        value={selectedMachine}
                                    >
                                        <option value="">Select Machine</option>
                                        {machines.map(machine => (
                                            <option key={machine.machineNo} value={machine.machineNo}>
                                                {machine.machineNo}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <label htmlFor='lastChangeDate' className="block text-sm font-medium text-gray-700">
                                        Last Change Date
                                    </label>
                                    <input
                                        placeholder="Last Change Date"
                                        className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        type="date"
                                        name="lastChangeDate"
                                        id="lastChangeDate"
                                        value={data.lastChangeDate}
                                        onChange={changeHandler}
                                    />
                                </div>

                                <div>
                                    <label htmlFor='nextChangeDate' className="block text-sm font-medium text-gray-700">
                                        Next Change Date
                                    </label>
                                    <input
                                        placeholder="Next Change Date"
                                        className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                        type="date"
                                        name="nextChangeDate"
                                        id="nextChangeDate"
                                        value={data.nextChangeDate}
                                        readOnly
                                    />
                                </div>

                                {selectedMachine && (
                                    <>
                                        <div>
                                            <label htmlFor='productChanged' className="flex items-center text-sm font-medium text-gray-700">
                                                <input
                                                    type="checkbox"
                                                    name="productChanged"
                                                    id="productChanged"
                                                    checked={productChanged}
                                                    onChange={productChangedHandler}
                                                    className="mr-2 h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
                                                />
                                                <span>Has Product Changed?</span>
                                            </label>
                                        </div>

                                        {productChanged && (
                                            <div>
                                                <label htmlFor='newChangeDate' className="block text-sm font-medium text-gray-700">
                                                    New Change Date
                                                </label>
                                                <input
                                                    placeholder="New Change Date"
                                                    className="mt-1 block w-full bg-gray-100 text-gray-700 border border-gray-300 rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    type="date"
                                                    name="newChangeDate"
                                                    id="newChangeDate"
                                                    value={newChangeDate}
                                                    onChange={newChangeDateHandler}
                                                />
                                            </div>
                                        )}
                                    </>
                                )}

                                <button
                                    type="submit"
                                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    onClick={clickHandler}
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>

                    {/* Table Section */}
                    {selectedMachineData && (
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Selected Machine Data</h3>
                            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md">
                                <thead>
                                    <tr className="border-b bg-gray-100">
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Part Type</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Last Change Date</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Frequency (days)</th>
                                        <th className="py-3 px-4 text-left text-sm font-medium text-gray-700">Next Change Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.keys(selectedMachineData.parts).map(partType => {
                                        const part = selectedMachineData.parts[partType];
                                        return (
                                            <tr key={partType} className="border-b">
                                                <td className="py-3 px-4 text-sm text-gray-700">{partType}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{part.lastChangeDate}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{part.frequency}</td>
                                                <td className="py-3 px-4 text-sm text-gray-700">{calculateNextChangeDate(part.lastChangeDate, part.frequency)}</td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RingTraveller;
