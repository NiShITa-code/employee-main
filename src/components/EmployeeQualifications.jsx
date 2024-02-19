import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { FaPencilAlt, FaSave, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import Button from '../reusable_ui/Button';

const EditableCell = ({
    value: initialValue,
    row: { index },
    column: { id },
    updateMyData,
}) => {
    const [value, setValue] = useState(initialValue);
    const onChange = e => setValue(e.target.value);
    const onBlur = () => updateMyData(index, id, value);

    useEffect(() => setValue(initialValue), [initialValue]);

    return <input value={value} onChange={onChange} onBlur={onBlur} />;
};

const StyledTable = styled.table`
    margin: auto;
    width: 80%;
    text-align: center;
    border-collapse: collapse;

    th, td {
        border: 1px solid #ddd;
        padding: 8px;
    }

    tr:nth-child(even) {
        background-color: #f2f2f2;
    }

    tr:hover {
        background-color: #ddd;
    }

    th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: left;
        background-color: #4CAF50;
        color: white;
    }
`;


const EmployeeQualifications = ({ employeeId }) => {
    const [qualifications, setQualifications] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const fetchQualifications = () => {
        axios.get(`https://localhost:7127/api/employee/${employeeId}/qualifications`)
            .then(response => setQualifications(response.data))
            .catch(error => console.error('There was an error!', error));
    };
    const handleDelete = id => {
        axios.delete(`https://localhost:7127/api/employee/${employeeId}/qualifications/${id}`)
            .then(() => {
                // After the deletion, fetch the qualifications again to get the updated list
                fetchQualifications();
            })
            .catch(error => console.error('There was an error!', error));
    };
    const [newQualification, setNewQualification] = useState(null);
    const handleAdd = () => {
        const newQual = { 
            id: null, // Set id to null for new qualification
            qualificationName: '',
            institution: '',
            yearOfPassing: '',
            percentage: '',
            stream: ''
        };
        setQualifications(old => [
            ...old,
            newQual
        ]);
        setNewQualification(newQual);
        setEditingId(null);
    };

    useEffect(() => {
        fetchQualifications();
    }, [employeeId]);
    
    const handleCancel = () => {
        console.log('Cancel button clicked');
        if (newQualification) {
            setQualifications(old => old.filter(q => q.id !== newQualification.id)); // Remove the new row from the qualifications state based on its id
        }
        setNewQualification(null);
        setEditingId(null);
        fetchQualifications();
    };
    const updateMyData = (rowIndex, columnId, value) => {
        const updatedQualifications = [...qualifications];

        // Update the value of the specific cell
        updatedQualifications[rowIndex][columnId] = value;
    
        // Update the state
        setQualifications(updatedQualifications);
        if (newQualification && rowIndex === updatedQualifications.length - 1) {
            setNewQualification(updatedQualifications[rowIndex]);
        }
    };

    const handleEdit = id => setEditingId(id);

    const handleSave = id => {
        console.log('id:', id);
    console.log('newQualification:', newQualification);
        

        let updatedQualification;
        if (id === null) { // If it's a new qualification
            updatedQualification = newQualification;
        } else { // If it's an existing qualification
            updatedQualification = qualifications.find(q => q.id === id);
        }
        console.log(updatedQualification);

    if (id === null) { // If it's a new qualification
        let qualificationData;
        const { id, ...qualificationWithoutId } = updatedQualification; // Remove id from updatedQualification
        qualificationData = { ...qualificationWithoutId, employeeId };
        
        axios.post(`https://localhost:7127/api/employee/${employeeId}/qualifications`, { qualifications: [qualificationData] }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                setEditingId(null);
                setNewQualification(null);
                fetchQualifications();  
            })
            .catch(error => console.error('There was an error!', error));
    } else { // If it's an existing qualification
        axios.put(`https://localhost:7127/api/employee/${employeeId}/qualifications/${id}`, updatedQualification)
            .then(() => {
                setEditingId(null);
                fetchQualifications();  
            })
            .catch(error => console.error('There was an error!', error));
    }
    };

    const columns = React.useMemo(() => [
        { Header: 'Qualification Name', accessor: 'qualificationName' },
        { Header: 'Institution', accessor: 'institution' },
        { Header: 'Year Of Passing', accessor: 'yearOfPassing' },
        { Header: 'Percentage', accessor: 'percentage' },
        { Header: 'Stream', accessor: 'stream' },
        { Header: 'Actions', accessor: 'id', Cell: ({ value }) => (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {editingId === value ? (
                    <>
                        <FaSave onClick={() => handleSave(value)} />
                        <FaTimes onClick={handleCancel} /> {/* This is the new cancel button */}
                    </>
                ) : (
                    <FaPencilAlt onClick={() => handleEdit(value)} />
                )}
                <FaTrashAlt onClick={() => handleDelete(value)} />
            </div>
        )}
            
        
    ], [editingId]);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data: qualifications, updateMyData });

    return (
        <div>

        <Button onClick={handleAdd}><FaPlus /></Button>
        <StyledTable {...getTableProps()}>
            <thead>
                {headerGroups.map(headerGroup => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => (
                            <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map(row => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map(cell => (
                                <td {...cell.getCellProps()}>{editingId === row.original.id && cell.column.id !== 'id' ? <EditableCell {...cell.getCellProps()} value={cell.value} updateMyData={updateMyData} row={cell.row} column={cell.column} /> : cell.render('Cell')}</td>
                            ))}
                        </tr>
                    );
                })}
            </tbody>
        </StyledTable>
        </div>
    );
};

export default EmployeeQualifications;