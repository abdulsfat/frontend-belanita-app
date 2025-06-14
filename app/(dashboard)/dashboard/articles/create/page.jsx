'use client';

import PlainCard from '@/components/cards/plain-card';
import ErrorText from '@/components/input/error-text';
import InputText from '@/components/input/input-text';
import SelectBox from '@/components/input/select-box';
import TextArea from '@/components/input/text-area';
import Link from 'next/link';
import React, { useState } from 'react';

const article_obj = {
    title: '',
    image: '',
    content: '',
    status: 'draft',
    user_id: '',
};

const CreateArticle = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [leadObj, setLeadObj] = useState(article_obj);

    const updateFormValue = (updateType, value) => {
        setErrorMessage('');
        setLeadObj({ ...leadObj, [updateType]: value });
    };

    const handleSubmit = (e) => {};

    return (
        <div>
            <PlainCard>
                
            <h2 className="mb-4 text-xl font-semibold">Add new article</h2>
            <form action="">
                <InputText
                    type="text"
                    defaultValue={leadObj.title}
                    updateType="title"
                    containerStyle="mt-4"
                    labelTitle="Title"
                    updateFormValue={updateFormValue}
                />

                <TextArea
                    type="text"
                    defaultValue={leadObj.content}
                    updateType="content"
                    containerStyle="mt-4"
                    labelTitle="Content"
                    placeholder="Write a content here..."
                    updateFormValue={updateFormValue}
                />

                <fieldset className="mt-4 text-xs label-text text-base-content fieldset">
                    <legend className="text-xs fieldset-legend">Pick an image</legend>
                    <input type="file" className="file-input input-bordered" />
                    <label className="font-light text-blue-800 label">Max size 2MB</label>
                </fieldset>
                
                <SelectBox
                    updateType="status"
                    containerStyle="mt-4"
                    labelTitle="Status"
                    defaultValue={leadObj.status}
                    options={[
                        { name: 'Draft', value: 'draft' },
                        { name: 'Published', value: 'published' },
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
            </PlainCard>
        </div>
    );
};

export default CreateArticle;
