'use client';

import ErrorText from '@/components/input/error-text';
import InputText from '@/components/input/input-text';
import SelectBox from '@/components/input/select-box';
import TextArea from '@/components/input/text-area';
import Link from 'next/link';
import React, { useState } from 'react';

const INITIAL_LEAD_OBJ = {
    subject: '',
    description: '',
    image: '',
    status: '',
};

const CreateComplaint = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

    const updateFormValue = (updateType, value) => {
        setErrorMessage('');
        setLeadObj({ ...leadObj, [updateType]: value });
    };

    const handleSubmit = (e) => {};

    return (
        <div>
            <h2 className="mb-4 text-2xl font-semibold">Add new complaint</h2>
            <form action="">
                <InputText
                    type="text"
                    defaultValue={leadObj.subject}
                    updateType="subject"
                    containerStyle="mt-4"
                    labelTitle="Subject"
                    updateFormValue={updateFormValue}
                />

                <TextArea
                    type="text"
                    defaultValue={leadObj.content}
                    updateType="description"
                    containerStyle="mt-4"
                    labelTitle="Description"
                    placeholder="Write a description here..."
                    updateFormValue={updateFormValue}
                />

                <fieldset className="mt-4 text-xs label-text text-base-content fieldset">
                    <legend className="text-xs fieldset-legend">
                        Pick an image
                    </legend>
                    <input type="file" className="file-input input-bordered" />
                    <label className="label">Max size 2MB</label>
                </fieldset>

                <SelectBox
                    updateType="status"
                    containerStyle="mt-4"
                    labelTitle="Status"
                    defaultValue={leadObj.status}
                    options={[
                        { name: 'Pending', value: 'pending' },
                        { name: 'Processed', value: 'processed' },
                        { name: 'Completed', value: 'Completed' },
                    ]}
                    placeholder="Choose a status"
                    updateFormValue={updateFormValue}
                />

                <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
                <div className="modal-action">
                    <Link href="/articles" className="btn btn-ghost">
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

export default CreateComplaint;
