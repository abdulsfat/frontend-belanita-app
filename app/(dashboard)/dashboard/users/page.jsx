'use client';
import TitleCard from '../components/cards/title-card';
import DummyData from '../helper/dummy-data';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { useState } from 'react';

const Page = () => {
  const getRoleComponent = (role) => {
    if (role === 'User')
      return <div className="badge badge-secondary">{role}</div>;
    if (role === 'Admin')
      return <div className="badge badge-primary">{role}</div>;
    else return <div className="badge badge-ghost">{role}</div>;
  };

  const [members, setMembers] = useState(DummyData.TEAM_MEMBERS_LIST);
  const submenuIconClasses = 'h-5 w-5 mr-2';

  return (
    <>
      <TitleCard title="List of Users" topMargin="mt-2">
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone Number</th>
                <th>Address</th>
                <th>Role</th>
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
                    <td>{getRoleComponent(l.role)}</td>
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
};

export default Page;
