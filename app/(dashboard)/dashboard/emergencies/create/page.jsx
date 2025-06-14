"use client"

import ErrorText from '@/components/input/error-text';
import InputText from '@/components/input/input-text';
import SelectBox from '@/components/input/select-box';
import TextArea from '@/components/input/text-area';
import Link from 'next/link';
import React, { useState } from 'react';


const INITIAL_LEAD_OBJ = {
    contacted_via: '',
};

const CreateEmergencyRequest = () => {

    const [errorMessage, setErrorMessage] = useState('');
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

    const updateFormValue = (updateType, value) => {
        setErrorMessage("");
        setLeadObj({ ...leadObj, [updateType]: value });
    };

    const handleSubmit = (e) => {
        
    }
    
    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold">Add new emergency</h2>
            <form action="">
                <SelectBox
                    updateType="contacted_via"
                    containerStyle="mt-4"
                    labelTitle="contacted_via"
                    defaultValue={leadObj.contacted_via}
                    options={[
                        { name: 'Message', value: 'message' },
                        { name: 'Call', value: 'call' },
                    ]}
                    placeholder="Choose a Contact via"
                    updateFormValue={updateFormValue}
                />

                <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                <div className="modal-action">
                    <Link
                        className="btn btn-ghost"
                        href="/emergencies"
                    >
                        Cancel
                    </Link>
                    <button
                        className="px-6 btn btn-primary"
                        onClick={() => handleSubmit()}
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateEmergencyRequest;
