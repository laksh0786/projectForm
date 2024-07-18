import React, { useEffect, useState } from 'react';

const RingTraveller = () => {
    
    const [machines, setMachines] = useState([
        {
            machineNo: 'Machine 1',
            parts: {
                "Type 1": { lastChangeDate: '2024-07-01', frequency: 18 }, // Change date will be 2024-07-19
                "Type 2": { lastChangeDate: '2024-07-03', frequency: 16 }, // Change date will be 2024-07-19
            }
        },
        {
            machineNo: 'Machine 2',
            parts: {
                "Type 1": { lastChangeDate: '2024-07-05', frequency: 14 }, // Change date will be 2024-07-19
                "Type 2": { lastChangeDate: '2024-07-10', frequency: 9 }, // Change date will be 2024-07-19
            }
        },
        {
            machineNo: 'Machine 3',
            parts: {
                "Type 1": { lastChangeDate: '2024-07-09', frequency: 10 }, // Change date will be 2024-07-19
                "Type 2": { lastChangeDate: '2024-07-12', frequency: 7 }, // Change date will be 2024-07-19
            }
        },
    ]);

    const [selectedMachine, setSelectedMachine] = useState('All Machines');
    const [selectedType, setSelectedType] = useState('Type 1');

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
        if (selectedMachine === 'All Machines') {
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
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1);
        const tomorrowDateStr = tomorrow.toISOString().split('T')[0];

        let alertMessage = '';

        machines.forEach(machine => {
            Object.keys(machine.parts).forEach(partType => {
                const part = machine.parts[partType];
                const nextChangeDate = calculateNextChangeDate(part.lastChangeDate, part.frequency);
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

    const clickHandler = async (e) => {
        e.preventDefault();
        // Your click handler code here
    };

    return (
        <div>
            <div className="relative min-h-screen flex items-center justify-center bg-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 bg-no-repeat bg-cover"
                style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1532423622396-10a3f979251a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1500&q=80)' }}>
                <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
                <div className="max-w-5xl w-full space-y-8 p-10 bg-white rounded-xl shadow-lg z-10 transform transition-all duration-300 hover:shadow-2xl">
                    <div className="grid gap-8 grid-cols-1">
                        <div className="flex flex-col">
                            <div className="flex flex-col sm:flex-row items-center">
                                <h2 className="font-semibold text-3xl text-center sm:text-left mb-4 sm:mb-0">Ring Traveller Maintenance</h2>
                            </div>
                            <div className="mt-5">
                                <form className="grid gap-4 grid-cols-1 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <label htmlFor='consumableSparePart' className="font-semibold text-gray-600">
                                            Consumable Spare Part
                                        </label>
                                        <input
                                            placeholder="Part"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            required
                                            type="text"
                                            name="consumableSparePart"
                                            id="consumableSparePart"
                                            onChange={changeHandler}
                                            value={data.consumableSparePart}
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor='type' className="font-semibold text-gray-600">
                                            Type
                                        </label>
                                        <select
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
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

                                    <div className="space-y-2">
                                        <label htmlFor='frequency' className="font-semibold text-gray-600">
                                            Frequency (days)
                                        </label>
                                        <input
                                            placeholder="Frequency"
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            required
                                            type="number"
                                            name="frequency"
                                            id="frequency"
                                            onChange={changeHandler}
                                            value={data.frequency}
                                            readOnly
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor='machineNo' className="font-semibold text-gray-600">
                                            Machine No
                                        </label>
                                        <select
                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:bg-white focus:border-blue-500 shadow-sm"
                                            required
                                            name="machineNo"
                                            id="machineNo"
                                            onChange={machineChangeHandler}
                                            value={selectedMachine}
                                        >
                                            <option value="All Machines">All Machines</option>
                                            {machines.map(machine => (
                                                <option key={machine.machineNo} value={machine.machineNo}>
                                                    {machine.machineNo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </form>

                                <div className="mt-8">
                                    <table className="min-w-full bg-white">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Machine No</th>
                                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Last Change Date</th>
                                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Next Change Date</th>
                                                <th className="py-2 px-4 border-b border-gray-200 bg-gray-100 text-left text-sm font-semibold text-gray-600">Frequency (days)</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {selectedMachine === 'All Machines' ? (
                                                machines.map(machine => (
                                                    <tr key={machine.machineNo}>
                                                        <td className="py-2 px-4 border-b border-gray-200">{machine.machineNo}</td>
                                                        <td className="py-2 px-4 border-b border-gray-200">{machine.parts[selectedType].lastChangeDate}</td>
                                                        <td className="py-2 px-4 border-b border-gray-200">{calculateNextChangeDate(machine.parts[selectedType].lastChangeDate, machine.parts[selectedType].frequency)}</td>
                                                        <td className="py-2 px-4 border-b border-gray-200">{machine.parts[selectedType].frequency}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td className="py-2 px-4 border-b border-gray-200">{selectedMachine}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{data.lastChangeDate}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{data.nextChangeDate}</td>
                                                    <td className="py-2 px-4 border-b border-gray-200">{data.frequency}</td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RingTraveller;
