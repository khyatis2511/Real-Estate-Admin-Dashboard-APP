import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/container/tableComponent';
import SidebarLayout from '../../components/layouts/sidebar.layout';
import { getUsersAPI, updateUserStatusAPI } from '../../lib/api/users.api';
import { toast } from 'react-toastify';
import { toasterConfig } from '../../components/contexts/layoutContext';

const ExistingUserController: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [activeId, setActiveId] = useState('');

  const getUserData = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const userResponse = await getUsersAPI(page, pageSize, 'Active');
      console.log('user Response:', userResponse);
      if(userResponse.success) {
        setData(userResponse.data.userData);
        setTotal(userResponse.data.totalPages);
      }
    } catch (error: any) {
      console.error('getUserData error:', error);
      toast.error(error.message, toasterConfig)
    } finally {
      setLoading(false);
    }
  };

  const handleBan = async (row: any) => {
    setActiveId(row.id);
    try {
      const userResponse = await updateUserStatusAPI({userId: row.id, status : 'Banned'});
      console.log('user Response:', userResponse);
      if(userResponse.success) {
        setActiveId('');
      }
    } catch (error: any) {
      console.error('getUserData error:', error);
      toast.error(error.message, toasterConfig)
    }
    finally {
      setActiveId('');
    }
  };

  useEffect(() => {
    getUserData(1, 10);
  }, []);

  const columns = [
    { 
      id: 'firstName', 
      name: 'First Name', 
      selector: (row: any) => row.firstName, 
      sortable: true, 
    },
    { 
      id: 'lastName', 
      name: 'Last Name', 
      selector: (row: any) => row.lastName, 
      sortable: true, 
    },
    { 
      id: 'role', 
      name: 'Role', 
      selector: (row: any) => row.role, 
      sortable: true,
      center: true
    },
    { 
      id: 'status', 
      name: 'Status', 
      selector: (row: any) => row.status, 
      sortable: true,
      center: true
    },
    {
      id: 'actions',
      name: 'Actions',
      cell: (row: any) => (
        <button
          onClick={() => handleBan(row)}
          className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
        >
          {row.id === activeId ? 'Banning...' : 'Ban' }
        </button>
      ),
      center: true,
    },
  ];

  return (
    <SidebarLayout>
      <TableComponent
        data={data}
        columns={columns}
        loading={loading}
        total={total}
        fetchData={getUserData}
        title={'Existing User'}
      />
    </SidebarLayout>
    
  );
};

export default ExistingUserController;
