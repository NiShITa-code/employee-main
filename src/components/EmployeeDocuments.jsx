import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { IconButton, Grid, Box, CircularProgress, Dialog, DialogTitle, DialogContent, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FaTrash } from 'react-icons/fa';
import AddEmployeeDocument from './AddEmployeeDocuments';
import DocumentInput from './DocumentInput';
import { useDispatch } from 'react-redux';
import { uploadDocuments } from '../redux/employees/employeeSlice';
import { MdClose } from 'react-icons/md';

const EmployeeDocuments = ({ employeeId }) => {
  
  const dispatch = useDispatch();
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const [openAddDocument, setOpenAddDocument] = useState(false);
  const handleOpenAddDocument = () => {
    setOpenAddDocument(true);
  };

  const handleCloseAddDocument = () => {
    setOpenAddDocument(false);
  };


  const handleClickOpen = (document) => {
    setSelectedDocument(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleAddDocument = () => {
    // Add your logic to add a new document here
  };

  const handleDelete = async (documentId) => {
    // Add your delete logic here
    // For example:
    try {
      await axios.delete(`https://localhost:7127/api/Employee/DeleteDocument/${employeeId}/${documentId}`);
      setDocuments(documents.filter(document => document.id !== documentId));
    } catch (error) {
      console.error('Failed to delete document', error);
    }
  };

  const handleUpload = async (file, remark) => {
    try {
      await dispatch(uploadDocuments({ employeeId, documents: [{ file, remark }] }));
      // Close the dialog
      handleCloseAddDocument();
      // Fetch the updated list of documents
      const response = await axios.get(`https://localhost:7127/api/Employee/GetEmployeeDocuments/${employeeId}`);
      setDocuments(response.data);
    } catch (error) {
      console.error('Failed to upload document', error);
    }
  };
  useEffect(() => {
    const fetchDocuments = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://localhost:7127/api/Employee/GetEmployeeDocuments/${employeeId}`);
        setDocuments(response.data);
      } catch (error) {
        setError('Failed to fetch documents');
      } finally {
        setLoading(false);
      }
    };

    if (employeeId) {
      fetchDocuments();
    }
  }, [employeeId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="body1" color="error">{error}</Typography>;
  }

  if (!documents || documents.length === 0) {
    return <Typography variant="body1">No documents found</Typography>;
  }

  return (
    <div>
      <Grid container direction="column" alignItems="flex-start" marginBottom={2}>
        <Typography variant="h4" align="center" style={{width: '100%'}}>Employee Documents</Typography>
        <Box marginTop={1}>
        <Button variant="contained" color="success" onClick={handleOpenAddDocument} style={{ fontSize: '12px' }}>
        Add Document
      </Button>
      <Dialog open={openAddDocument} onClose={handleCloseAddDocument}>
        <DialogTitle style={{ fontSize: '17px' }}>Add Document
        <IconButton style={{ position: 'absolute', right: '8px', top: '8px' }} onClick={handleCloseAddDocument}>
        <MdClose />
      </IconButton>
        </DialogTitle>
        <DialogContent>
        <DocumentInput onUpload={handleUpload} />
        </DialogContent>
      </Dialog>
        </Box>
      </Grid>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontSize: '15px' }}>S.No</TableCell>
                  <TableCell style={{ fontSize: '15px' }}>Remark</TableCell>
                  <TableCell style={{ fontSize: '15px' }}>View Document</TableCell>
                  <TableCell style={{ fontSize: '15px' }}>Delete Document</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {documents.map((document, index) => (
                  <TableRow key={index}>
                    <TableCell style={{ fontSize: '14px' }} >{index + 1}</TableCell>
                    <TableCell style={{ fontSize: '14px' }}>{document.remarks}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary" href={`https://localhost:7127${document.url}`} target="_blank" rel="noopener noreferrer" style={{ fontSize: '12px' }}>
                        View
                      </Button>
                    </TableCell>
                    <TableCell>
                      <Button variant="contained" color="warning" startIcon={<FaTrash />} onClick={() => handleDelete(document.id)} style={{ fontSize: '12px' }}>
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
       
    </div>
  );
};

export default EmployeeDocuments;