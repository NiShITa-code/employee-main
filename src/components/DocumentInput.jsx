// DocumentInput.jsx
import React, { useState } from 'react';
import Input from '../reusable_ui/Input';
import Button from '../reusable_ui/Button';

const DocumentInput = ({ onUpload }) => {
  const [file, setFile] = useState(null);
  const [remark, setRemark] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleRemarkChange = (event) => {
    setRemark(event.target.value);
  };

  const handleSubmit = () => {
    onUpload(file, remark);
  };

  return (
    <div>
      <Input type="file" onChange={handleFileChange} style={{ marginBottom: '16px' }}/>
      <div>
      <Input type="text" placeholder="Remark" value={remark} onChange={handleRemarkChange} style={{ marginBottom: '16px' }}/>
      </div>
      <div>
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
    </div>
  );
};

export default DocumentInput;