'use client';

import TitleCard from '@/components/cards/title-card';
import DataTable from '@/components/table/data-table';
import DummyData from '@/helper/dummy-data';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function ComplaintAdmin() {
  const title = 'Complaints Data';
  const columns = [
    { label: 'Subject', key: 'subject' },
    { label: 'Description', key: 'description' },
    { label: 'Image', key: 'image' },
    { label: 'Status', key: 'status' },
    { label: 'User', key: 'user_id' },
    { label: 'Actions', key: 'actions' },
  ];

  const data = [
    {
      subject: 'Limbah Plastik',
      description: 'Tumpukan limbah plastik di sungai kota',
      image: 'https://picsum.photos/200',
      status: 'Pending',
      user_id: 'user123',
    },
    {
      subject: 'Sampah Elektronik',
      description: 'TV rusak dibuang di pinggir jalan',
      image: 'https://picsum.photos/200',
      status: 'Resolved',
      user_id: 'user456',
    },
  ];

  const getStatusComponent = (status) => {
    if (status === 'Pending')
      return <div className="badge badge-secondary">{status}</div>;
    if (status === 'Processed')
      return <div className="badge badge-primary">{status}</div>;
    if (status === 'Completed')
      return <div className="badge badge-primary">{status}</div>;
    else return <div className="badge badge-ghost">{status}</div>;
  };
  const [members, setMembers] = useState(DummyData.TEAM_MEMBERS_LIST);
  const submenuIconClasses = 'h-5 w-5 mr-2';

  return (
    <>
      <TitleCard title="List of Complaints" topMargin="mt-2">
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Subject</th>
                <th>Description</th>
                <th>Image</th>
                <th>User</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {members.map((l, k) => {
                return (
                  <tr key={k}>
                    <td>
                      <div className="flex items-center space-x-3">
                        <div className="avatar">
                          <div className="w-12 h-12 mask mask-circle">
                            <img src={l.avatar} alt="Avatar" />
                          </div>
                        </div>
                        <div>
                          <div className="font-bold">{l.name}</div>
                        </div>
                      </div>
                    </td>
                    <td>{l.email}</td>
                    <td>{l.joinedOn}</td>
                    <td>{l.lastActive}</td>
                    <td>{getStatusComponent(l.status)}</td>
                    <td>
                      <div>
                        <button>
                          <PencilSquareIcon className={submenuIconClasses} />
                        </button>
                        <button>
                          <TrashIcon className={submenuIconClasses} />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </TitleCard>
    </>
  );
}

export default ComplaintAdmin;
