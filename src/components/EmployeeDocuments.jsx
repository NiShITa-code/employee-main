import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { CircularProgress, Dialog, DialogTitle, DialogContent, Typography, Button, List, ListItem, ListItemText } from '@mui/material';

const EmployeeDocuments = ({ employeeId }) => {
  const [documents, setDocuments] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);

  const handleClickOpen = (document) => {
    setSelectedDocument(document);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
      <List>
        {documents.map((document, index) => (
          <ListItem button onClick={() => handleClickOpen(document)} key={index}>
            <ListItemText primary={`S.No: ${index + 1}`} />
            <ListItemText primary={document.remarks} />
            <ListItemText primary="View Document" />
          </ListItem>
        ))}
      </List>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{selectedDocument?.remarks}</DialogTitle>
        <DialogContent>
          <Button variant="contained" color="primary" href={`https://localhost:7127${selectedDocument?.url}`} target="_blank" rel="noopener noreferrer">
            View Document
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmployeeDocuments;