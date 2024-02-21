
import React from 'react';
import Input from '../reusable_ui/Input';
import Button from '../reusable_ui/Button';

const QualificationInput = ({ register, formState: { errors }, cancelQualification }) => {
    return (
        <div>
            <Input style={{ marginBottom: '10px' }} {...register(`qualifications.qualificationName`, { required: true })} placeholder="Qualification Name" />
            {errors.qualifications?.qualificationName && <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>This field is required</p>}

            <Input style={{ marginBottom: '10px' }} {...register(`qualifications.institution`, { required: true })} placeholder="Institution" />
            {errors.qualifications?.institution && <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>This field is required</p>}

            <Input style={{ marginBottom: '10px' }} {...register(`qualifications.stream`, { required: true })} placeholder="Stream" />
            {errors.qualifications?.stream && <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>This field is required</p>}

            <Input style={{ marginBottom: '10px' }} {...register(`qualifications.yearOfPassing`, { required: true })} placeholder="Year Of Passing" />
            {errors.qualifications?.yearOfPassing && <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>This field is required</p>}

            <Input style={{ marginBottom: '10px' }} {...register(`qualifications.percentage`, { required: true })} placeholder="Percentage" />
            {errors.qualifications?.percentage && <p style={{ color: 'red', fontSize: '12px', marginTop: '-10px' }}>This field is required</p>}

            <div>
                <Button
                    style={{ marginBottom: '20px' }}
                    variation="danger"
                    type="button"  
                    onClick={cancelQualification}
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
};

export default QualificationInput;