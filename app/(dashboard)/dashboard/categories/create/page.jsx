'use client';

import PlainCard from '@/components/cards/plain-card';
import ErrorText from '@/components/input/error-text';
import InputText from '@/components/input/input-text';
import Link from 'next/link';
import React, { useState } from 'react';

const category_obj = {
    name: '',
};

const CreateCategory = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [leadObj, setLeadObj] = useState(category_obj);

    const updateFormValue = (updateType, value) => {
        setErrorMessage('');
        setLeadObj({ ...leadObj, [updateType]: value });
    };

    const handleSubmit = (e) => {};

    return (
        <div>
            <PlainCard>
            <h2 className="mb-4 text-xl font-semibold">Add new category</h2>
            <form action="">
                <InputText
                    type="text"
                    defaultValue={leadObj.name}
                    updateType="name"
                    containerStyle="mt-4"
                    placeholder="Category name"
                    labelTitle="Name"
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
            </PlainCard>
        </div>
    );
};

export default CreateCategory;
