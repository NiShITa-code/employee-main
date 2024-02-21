import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useTable } from 'react-table';
import { FaPencilAlt, FaSave, FaTrashAlt, FaPlus, FaTimes } from 'react-icons/fa';
import styled from 'styled-components';
import Button from '../reusable_ui/Button';
import { useForm} from 'react-hook-form';
import { Modal, Box, Typography } from '@mui/material';
import QualificationInput from './QualificationInput';
import Heading from '../reusable_ui/Heading';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { register, control, handleSubmit, reset, formState} = useForm();

    const fetchQualifications = () => {
        axios.get(`https://localhost:7127/api/employee/${employeeId}/qualifications`)
            .then(response => setQualifications(response.data))
            .catch(error => console.error('There was an error!', error));
    };
    
    const handleDelete = id => {
        axios.delete(`https://localhost:7127/api/employee/${employeeId}/qualifications/${id}`)
            .then(() => {
                // After the deletion, fetch the qualifications again to get the updated list
                setQualifications(oldQualifications => oldQualifications.filter(q => q.id !== id));
                fetchQualifications();

            })
            .catch(error => console.error('There was an error!', error));
    };
    const handleOpenModal = () => {
        setIsModalOpen(true); // Open the modal when the add button is clicked
    };

    const handleCloseModal = () => {
        reset();
        setIsModalOpen(false); // Close the modal
    };
    const submitQualification = (index) => {
        // Handle the submission of a qualification
    };
    const handleSubmitModal = (data) => {
        console.log(data);
        if (data) {
            const qualificationWithEmployeeId = { qualifications: [{
                qualificationName: data.qualifications.qualificationName,
                institution: data.qualifications.institution,
                yearOfPassing: data.qualifications.yearOfPassing,
                percentage: data.qualifications.percentage,
                stream: data.qualifications.stream,
                employeeId: employeeId,
            }]};
            console.log(qualificationWithEmployeeId);
            axios.post(`https://localhost:7127/api/employee/${employeeId}/qualifications`, qualificationWithEmployeeId, {
            headers: {
                'Content-Type': 'application/json', // set the Content-Type header
            },
        })
        .then(() => {
            reset();
            setIsModalOpen(false);
            fetchQualifications();  
        })
                .catch(error => console.error('There was an error!', error));
        } else {
            console.error('data is undefined');
        }
    };
 

    const cancelQualification = (index) => {
        handleCloseModal(); 
    };
    
    

    useEffect(() => {
        fetchQualifications();
    }, [employeeId]);
    
    const handleCancel = () => {
        console.log('Cancel button clicked');
        setEditingId(null);
        fetchQualifications();
    };

    const updateMyData = (rowIndex, columnId, value) => {
        const updatedQualifications = [...qualifications];

        // Update the value of the specific cell
        updatedQualifications[rowIndex][columnId] = value;
    
        // Update the state
        setQualifications(updatedQualifications);
        
    };

    const handleEdit = id => setEditingId(id);

    const handleSave = id => {
        let updatedQualification;
        
            updatedQualification = qualifications.find(q => q.id === id);
    
        console.log(updatedQualification);
        for (let key in updatedQualification) {
            if (updatedQualification[key] === '') {
                return;
            }
        }    

        axios.put(`https://localhost:7127/api/employee/${employeeId}/qualifications/${id}`, updatedQualification)
            .then(() => {
                setEditingId(null);
                fetchQualifications();  
            })
            .catch(error => console.error('There was an error!', error));
    };
    const modalBody = (
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', border: '2px solid #000', boxShadow: 24, p: 4 }}>
            <Heading as = "h2" >Add Qualification</Heading>

            <form onSubmit={handleSubmit(handleSubmitModal)}>
                <QualificationInput
                    register={register}
                    cancelQualification={handleCloseModal}
                    formState={formState}
                />
                <div>
                <Button type="submit">Submit</Button>
                </div>
            </form>
        </Box>
    );

    const columns = React.useMemo(() => [
        { Header: 'Qualification Name', accessor: 'qualificationName' },
        { Header: 'Institution', accessor: 'institution' },
        { Header: 'Year Of Passing', accessor: 'yearOfPassing' },
        { Header: 'Percentage', accessor: 'percentage' },
        { Header: 'Stream', accessor: 'stream' },
        { Header: 'Actions', accessor: 'id', Cell: ({ value, row }) => (
            <div style={{ display: 'flex', justifyContent: 'space-around' }}>
                {(editingId === value) ? (
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

        <Button onClick={handleOpenModal}><FaPlus /></Button>
        <Modal
                open={isModalOpen}
                onClose={handleCloseModal}
                aria-labelledby="modal-modal-title"
            >
                {modalBody}
            </Modal>
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
                                <td {...cell.getCellProps()}>{editingId === row.original.id  && cell.column.id !== 'id' ? <EditableCell {...cell.getCellProps()} value={cell.value} updateMyData={updateMyData} row={cell.row} column={cell.column} /> : cell.render('Cell')}</td>
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