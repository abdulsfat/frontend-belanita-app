'use client';

import TitleCard from '../components/cards/title-card';
import DummyData from '../helper/dummy-data';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useState } from 'react';

function MerchandiseAdmin() {
  const title = 'Merchandises Data';
  const columns = [
    { label: 'Product Name', key: 'name' },
    { label: 'Image', key: 'image' },
    { label: 'Description', key: 'description' },
    { label: 'Price', key: 'price' },
    { label: 'Stock', key: 'stock' },
    { label: 'Category', key: 'merchandise_categories_id' },
    { label: 'Actions', key: 'actions' },
  ];

  const data = [
    {
      name: 'Kaos Office Green',
      image: 'https://example.com/images/kaos-og.jpg',
      description: 'Kaos katun organik dengan desain logo Office Green.',
      price: 120000,
      stock: 25,
      merchandise_categories_id: 'Pakaian',
    },
    {
      name: 'Tumbler Stainless',
      image: 'https://example.com/images/tumbler-og.jpg',
      description: 'Tumbler ramah lingkungan kapasitas 500ml.',
      price: 85000,
      stock: 40,
      merchandise_categories_id: 'Aksesoris',
    },
    {
      name: 'Totebag Eco',
      image: 'https://example.com/images/totebag-og.jpg',
      description:
        'Totebag berbahan kanvas daur ulang, cocok untuk belanja harian.',
      price: 50000,
      stock: 10,
      merchandise_categories_id: 'Tas',
    },
  ];
  const getCategoryComponent = (category) => {
    if (category === 'Draft')
      return <div className="badge badge-accent">{category}</div>;
    if (category === 'Published')
      return <div className="badge badge-primary">{category}</div>;
    else return <div className="badge badge-ghost">{category}</div>;
  };

  const TopSideButtons = () => {
    return (
      <div className="inline-block float-right">
        <Link
          href="/merchandises/create"
          className="px-6 normal-case btn btn-sm btn-primary"
        >
          Add merchandise
        </Link>
      </div>
    );
  };
  const submenuIconClasses = 'h-5 w-5 mr-2';
  const [members, setMembers] = useState(DummyData.TEAM_MEMBERS_LIST);

  return (
    <>
      <TitleCard
        title="List of Merchandises"
        topMargin="mt-2"
        TopSideButtons={<TopSideButtons />}
      >
        <div className="w-full overflow-x-auto">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Categories</th>
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
                    <td>{l.joinedOn}</td>
                    <td>{l.lastActive}</td>
                    <td>{getCategoryComponent(l.category)}</td>
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

export default MerchandiseAdmin;
