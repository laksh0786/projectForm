import React, { useState, useEffect } from 'react';
import { Container, Grid, Paper, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import '../../App.css';

const dummyMachines = [
  { machine_id: 1, machine_name: 'Machine 1' },
  { machine_id: 2, machine_name: 'Machine 2' },
];

const dummyParts = [
  {
    machine_id: 1,
    part_id: 1,
    part_name: 'Part A',
    part_type: 'Type 1',
    thread_count: 100,
    last_change_date: '2023-06-01',
    next_change_date: '2023-12-01',
    frequency: 180 // in days
  },
  {
    machine_id: 1,
    part_id: 2,
    part_name: 'Part B',
    part_type: 'Type 2',
    thread_count: 200,
    last_change_date: '2023-03-15',
    next_change_date: '2023-09-15',
    frequency: 180
  },
  {
    machine_id: 2,
    part_id: 3,
    part_name: 'Part C',
    part_type: 'Type 1',
    thread_count: 150,
    last_change_date: '2023-04-10',
    next_change_date: '2023-10-10',
    frequency: 180
  }
];

function Ring() {
  const [machines, setMachines] = useState(dummyMachines);
  const [selectedMachine, setSelectedMachine] = useState('');
  const [threadCount, setThreadCount] = useState('');
  const [partType, setPartType] = useState('');
  const [partName, setPartName] = useState('');
  const [machineParts, setMachineParts] = useState(dummyParts);

  useEffect(() => {
    let filteredParts = dummyParts;

    if (selectedMachine) {
      filteredParts = filteredParts.filter(part => part.machine_id === selectedMachine.machine_id);
    }

    if (threadCount) {
      filteredParts = filteredParts.filter(part => part.thread_count === parseInt(threadCount, 10));
    }

    if (partType) {
      filteredParts = filteredParts.filter(part => part.part_type === partType);
    }

    if (partName) {
      filteredParts = filteredParts.filter(part => part.part_name === partName);
    }

    setMachineParts(filteredParts);
  }, [selectedMachine, threadCount, partType, partName]);

  const handleMachineSelect = (event) => {
    const machine = machines.find(m => m.machine_id === parseInt(event.target.value, 10));
    setSelectedMachine(machine);
  };

  const handleThreadCountSelect = (event) => {
    setThreadCount(event.target.value);
  };

  const handlePartTypeSelect = (event) => {
    setPartType(event.target.value);
  };

  const handlePartNameSelect = (event) => {
    setPartName(event.target.value);
  };

  const handleChangePart = (part) => {
    const newLastChangeDate = new Date().toISOString().split('T')[0];
    const nextChangeDate = new Date(newLastChangeDate);
    nextChangeDate.setDate(nextChangeDate.getDate() + part.frequency);
    const formattedNextChangeDate = nextChangeDate.toISOString().split('T')[0];

    const updatedParts = machineParts.map(p => 
      p.part_id === part.part_id 
        ? { ...p, last_change_date: newLastChangeDate, next_change_date: formattedNextChangeDate }
        : p
    );
    setMachineParts(updatedParts);
  };

  const handleDateUpdate = (part, newLastChangeDate) => {
    const nextChangeDate = new Date(newLastChangeDate);
    nextChangeDate.setDate(nextChangeDate.getDate() + part.frequency);
    const formattedNextChangeDate = nextChangeDate.toISOString().split('T')[0];

    const updatedParts = machineParts.map(p => 
      p.part_id === part.part_id 
        ? { ...p, last_change_date: newLastChangeDate, next_change_date: formattedNextChangeDate }
        : p
    );
    setMachineParts(updatedParts);
  };

  const uniqueThreadCounts = [...new Set(dummyParts.map(part => part.thread_count))];
  const uniquePartTypes = [...new Set(dummyParts.map(part => part.part_type))];
  const uniquePartNames = [...new Set(dummyParts.map(part => part.part_name))];

  return (
    <Container>
      <h1>Maintenance Tracker</h1>
      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Machine</InputLabel>
              <Select value={selectedMachine.machine_id || ''} onChange={handleMachineSelect}>
                <MenuItem value=""><em>None</em></MenuItem>
                {machines.map(machine => (
                  <MenuItem key={machine.machine_id} value={machine.machine_id}>{machine.machine_name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Thread Count</InputLabel>
              <Select value={threadCount} onChange={handleThreadCountSelect}>
                <MenuItem value=""><em>None</em></MenuItem>
                {uniqueThreadCounts.map(count => (
                  <MenuItem key={count} value={count}>{count}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Part Type</InputLabel>
              <Select value={partType} onChange={handlePartTypeSelect}>
                <MenuItem value=""><em>None</em></MenuItem>
                {uniquePartTypes.map(type => (
                  <MenuItem key={type} value={type}>{type}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} md={3}>
            <FormControl fullWidth>
              <InputLabel>Part Name</InputLabel>
              <Select value={partName} onChange={handlePartNameSelect}>
                <MenuItem value=""><em>None</em></MenuItem>
                {uniquePartNames.map(name => (
                  <MenuItem key={name} value={name}>{name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Paper>
      <Paper elevation={3} style={{ padding: '20px' }}>
        <h2>Parts List</h2>
        <ul>
          {machineParts.map(part => (
            <li key={part.part_id}>
              {part.part_name} - Machine: {dummyMachines.find(m => m.machine_id === part.machine_id).machine_name} - Type: {part.part_type} - Thread Count: {part.thread_count} - Last Change: {part.last_change_date} - Next Change: {part.next_change_date}
              <Button variant="contained" color="primary" onClick={() => handleChangePart(part)}>Mark as Changed</Button>
              <Button variant="contained" color="secondary" onClick={() => handleDateUpdate(part, prompt('Enter new last change date (YYYY-MM-DD):'))}>
                Update Last Change Date
              </Button>
            </li>
          ))}
        </ul>
      </Paper>
    </Container>
  );
}

export default Ring;
