'use client';

import TitleCard from '../../components/cards/title-card';
import ErrorText from '../../components/input/error-text';
import InputText from '../../components/input/input-text';
import TextArea from '../../components/input/text-area';
import React, { useState } from 'react';

const INITIAL_LEAD_OBJ = {
  first_name: '',
  last_name: '',
  email: '',
  avatar: '',
  description: '',
};

const ProfileAdmin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [leadObj, setLeadObj] = useState(INITIAL_LEAD_OBJ);

  const updateFormValue = (updateType, value) => {
    setErrorMessage('');
    setLeadObj({ ...leadObj, [updateType]: value });
  };

  const handleSubmit = (e) => {};

  return (
    <div>
      <TitleCard title="Profile Settings" topMargin="mt-2">
        <form action="">
          <InputText
            type="text"
            defaultValue={leadObj.first_name}
            updateType="first_name"
            containerStyle="mt-4"
            labelTitle="First Name"
            updateFormValue={updateFormValue}
          />

          <InputText
            type="text"
            defaultValue={leadObj.last_name}
            updateType="last_name"
            containerStyle="mt-4"
            labelTitle="Last Name"
            updateFormValue={updateFormValue}
          />

          <InputText
            type="email"
            defaultValue={leadObj.email}
            updateType="email"
            containerStyle="mt-4"
            labelTitle="Email Id"
            updateFormValue={updateFormValue}
          />

          <TextArea
            defaultValue={leadObj.description}
            updateType="description"
            containerStyle="mt-4"
            labelTitle="Description"
            updateFormValue={updateFormValue}
          />

          <ErrorText styleClass="mt-16">{errorMessage}</ErrorText>
          <div className="modal-action">
            <button
              className="px-6 btn btn-primary"
              onClick={() => handleSubmit()}
            >
              Update
            </button>
          </div>
        </form>
      </TitleCard>
    </div>
  );
};

export default ProfileAdmin;
