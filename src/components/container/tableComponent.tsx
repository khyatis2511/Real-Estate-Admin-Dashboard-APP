import React, { FC, useMemo, useState } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

interface TableComponentProps {
  data: any[];
  columns: TableColumn<any>[];
  fetchData: (page: number, pageSize: number) => void;
  total: number;
  loading: boolean;
  title?: string;
}

const TableComponent: FC<TableComponentProps> = ({
  data,
  columns,
  fetchData,
  total,
  loading,
  title,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filters, setFilters] = useState<{ [key: string]: string }>({});

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    fetchData(page, rowsPerPage);
  };

  const handleRowsPerPageChange = (newRowsPerPage: number) => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1);
    fetchData(1, newRowsPerPage);
  };

  const handleFilterChange = (column: string, value: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [column]: value,
    }));
  };

  const filteredData = useMemo(() => {
    return data?.filter((row) => {
      return Object.keys(filters).every((key) =>
        row[key]?.toString().toLowerCase().includes(filters[key].toLowerCase())
      );
    });
  }, [data, filters]);

  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      {title && (
        <h2 className="text-2xl font-bold text-gray-700 mb-6 border-b pb-2">
          {title}
        </h2>
      )}
      <DataTable
        columns={columns}
        data={filteredData}
        pagination
        paginationServer
        paginationTotalRows={total}
        paginationRowsPerPageOptions={[10, 20, 30]}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleRowsPerPageChange}
        progressPending={loading}
        subHeaderComponent={
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 w-full bg-white p-0">
            {!loading &&
              columns.map((column: any) => {
                if (!column?.filterable) return null;
                return (
                    <input
                      id={column?.id}
                      type="text"
                      placeholder={`Filter ${column?.name}`}
                      onChange={(e) => handleFilterChange(column?.id, e.target.value)}
                      className="p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
                    />
                );
              })}
          </div>
        }
        customStyles={{
          headCells: {
            style: {
              fontWeight: 'bold',
              color: '#374151',
              fontSize: '14px',
              textAlign: 'center',
            },
          },
          pagination: {
            style: {
              padding: '8px',
              borderTop: '1px solid #e5e7eb',
            },
          },
        }}
      />
    </div>
  );
};

export default TableComponent;
