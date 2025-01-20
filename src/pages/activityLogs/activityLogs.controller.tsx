import React, { useEffect, useState } from 'react';
import TableComponent from '../../components/container/tableComponent';
import SidebarLayout from '../../components/layouts/sidebar.layout';
import { toast } from 'react-toastify';
import { toasterConfig } from '../../components/contexts/layoutContext';
import { getActivityLogsAPI } from '../../lib/api/activityLogs.api';
import { formatDate } from '../../utils/helpers';

const ActivityLogsController: React.FC = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const getActivityLogs = async (page: number, pageSize: number) => {
    setLoading(true);
    try {
      const userResponse = await getActivityLogsAPI(page, pageSize);
      console.log('user Response:', userResponse);
      if(userResponse.success) {
        setData(userResponse.data.activityLogsData);
        setTotal(userResponse.data.totalPages);
      }
    } catch (error: any) {
      console.error('getUserData error:', error);
      toast.error(error.message, toasterConfig)
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getActivityLogs(1, 10);
  }, []);

  const columns = [
    { 
      id: 'Name', 
      name: 'Name', 
      selector: (row: any) => `${row.user.firstName} ${row.user.lastName}`, 
      sortable: true, 
    },
    { 
      id: 'role', 
      name: 'Role', 
      selector: (row: any) => row.user.role, 
      sortable: true,
      center: true
    },
    { 
      id: 'actionType', 
      name: 'Action Type', 
      selector: (row: any) => row.actionType, 
      sortable: true,
      center: true
    },
    {
      id: 'target', 
      name: 'Target', 
      selector: (row: any) => row.target ? row.target : "--", 
      sortable: true,
      center: true
    },
    { 
      id: 'activityAt', 
      name: 'Activity At', 
      selector: (row: any) => formatDate(row.activityAt), 
      sortable: true, 
    },
  ];

  return (
    <SidebarLayout>
      <TableComponent
        data={data}
        columns={columns}
        loading={loading}
        total={total}
        fetchData={getActivityLogs}
        title={'User Activity Logs'}
      />
    </SidebarLayout>
    
  );
};

export default ActivityLogsController;
