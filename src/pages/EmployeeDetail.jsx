import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { fetchEmployeeByEmail } from '../redux/employees/employeeSlice';
import GlobalStyles from '../styles/GlobalStyles';
import styled from 'styled-components';
import Heading from '../reusable_ui/Heading';

const EmployeeDetailsContainer = styled.div`
    width: 80%;
    height: 100vh;
    padding: 20px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    background-color: var(--color-grey-100); // change this to your preferred color
    color: var(--color-grey-900); // change this to your preferred color
    overflow: auto; // add this to enable scrolling if the content exceeds the height
    margin: auto;
    `;

const TabContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin: 20px 0;
    gap: 20px;
`;
const Space = styled.div`
    margin-bottom: 20px;
`;
const CenteredHeading = styled(Heading)`
    text-align: center;
    font-weight: bold;
`;
// ...

function EmployeeDetails() {
    // ...
    const { email } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchEmployeeByEmail(email));
    }, [dispatch, email]);

    const employee = useSelector(state => state.employees.find(emp => emp.email === email));

    if (!employee) {
        return <div>Loading...</div>;
    }
    const firstName = employee.firstName.charAt(0).toUpperCase() + employee.firstName.slice(1);
    const lastName = employee.lastName.charAt(0).toUpperCase() + employee.lastName.slice(1);
    
    return (
        <EmployeeDetailsContainer>
            <CenteredHeading as="h3">{firstName} {lastName}</CenteredHeading>
            <Space />
            
            <Tabs>
                <TabList>
                    <Tab>Employee Info</Tab>
                    <Tab>Qualifications</Tab>
                    <Tab>Employee Documents</Tab>
                </TabList>

                <TabPanel>
                <TabContent>
                    <Heading as="h5">Personal Information</Heading>
                    <Space />
                    <p>Email: {employee.email}</p>
                    <p>Gender: {employee.gender}</p>
                    <p>Address: {employee.address}</p>
                    <Space />
                    <Heading as="h5">Work Information</Heading>
                    <Space />
                    <p>Department: {employee.department}</p>
                    <p>Salary: ${employee.salary}</p>
                    <p>Is Active: {employee.isActive ? 'Yes' : 'No'}</p>
                </TabContent>
                
                    
                </TabPanel>

                <TabPanel>
                    {employee.qualifications.map((qualification, index) => (
                        <div key={index}>
                             <Heading as="h5">Qualification {index + 1}</Heading>
                        <TabContent key={index}>
                            <p>Qualification Name: {qualification.qualificationName}</p>
                            <p>Institution: {qualification.institution}</p>
                            <p>Year Of Passing: {qualification.yearOfPassing}</p>
                            <p>Percentage: {qualification.percentage}</p>
                            <p>Stream: {qualification.stream}</p>
                        </TabContent>
                        </div>
                    ))}
                </TabPanel>

                <TabPanel>
                    {employee.employeeDocuments.map((document, index) => (
                        <div key={index}>
                             <Heading as="h5">Document {index + 1}</Heading>
                        <TabContent key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px', padding: '10px', border: '1px solid #ddd' }}>
                            <a href={`https://localhost:7127/uploads/${document.fileName}`} target="_blank" rel="noopener noreferrer" style={{ marginRight: '10px' }}>
                                <img className="preview-image" src={`https://localhost:7127/uploads/${document.fileName}`} alt={document.fileName} style={{ width: '100px', height: '100px' }} />
                            </a>
                            <div style={{ flex: 1 }}>
                                <p><strong>Remarks:</strong> {document.remarks}</p>
                                <p><strong>File Name:</strong> {document.fileName}</p>
                            </div>
                        </TabContent>
                        </div>
                    ))}
                </TabPanel>
            </Tabs>
        </EmployeeDetailsContainer>
    );
}

export default EmployeeDetails;
