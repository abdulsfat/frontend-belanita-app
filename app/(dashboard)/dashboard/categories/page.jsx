'use client';

import TitleCard from '@/components/cards/title-card';
import DummyData from '@/helper/dummy-data';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

function MerchandiseCategoryAdmin() {
    const title = 'Complaints Data';
    const columns = [
        { label: 'No', key: 'id' },
        { label: 'Name', key: 'name' },
        { label: 'Actions', key: 'actions' },
    ];

    const data = [
        {
            id: '1',
            name: 'Aksesoris',
        },
        {
            id: '2',
            name: 'Pakaian',
        },
        {
            id: '3',
            name: 'Alat Tulis',
        },
        {
            id: '4',
            name: 'Tas',
        },
    ];

    const TopSideButtons = () => {
    return (
      <div className="inline-block float-right">
        <Link
          href="/categories/create"
          className="px-6 normal-case btn btn-sm btn-primary"
        >
          Add category
        </Link>
      </div>
    );
  };
  const submenuIconClasses = 'h-5 w-5 mr-2';
  const [members, setMembers] = useState(DummyData.TEAM_MEMBERS_LIST);

  return (
    <>
      <TitleCard
        title="List of Categories"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Name</th>
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

export default MerchandiseCategoryAdmin;
