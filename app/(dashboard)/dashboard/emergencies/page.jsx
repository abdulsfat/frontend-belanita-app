'use client';

import TitleCard from '@/components/cards/title-card';
import DataTable from '@/components/table/data-table';
import DummyData from '@/helper/dummy-data';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

function EmergencyRequestAdmin() {
  const title = 'Emergency Requests Data';
  const columns = [
    { label: 'Contact Via', key: 'contacted_via' },
    { label: 'User', key: 'user_id' },
    { label: 'Actions', key: 'actions' },
  ];

  const data = [
    {
      contacted_via: 'WhatsApp Chat',
      user_id: 'Dea',
    },
    {
      contacted_via: 'Telephone',
      user_id: 'Mira',
    },
  ];

  const getContactedViaComponent = (contacted_via) => {
    if (contacted_via === 'Call')
      return <div className="badge badge-primary">{contacted_via}</div>;
    if (contacted_via === 'Message')
      return <div className="badge badge-secondary">{contacted_via}</div>;
    else return <div className="badge badge-ghost">{contacted_via}</div>;
  };

  const [members, setMembers] = useState(DummyData.TEAM_MEMBERS_LIST);
  const submenuIconClasses = 'h-5 w-5 mr-2';

  return (
    <>
      <TitleCard title="List of Emergency Requests" topMargin="mt-2">
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>User</th>
                <th>Contact Via</th>
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
                    <td>{getContactedViaComponent(l.contacted_via)}</td>
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

export default EmergencyRequestAdmin;
