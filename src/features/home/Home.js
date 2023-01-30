import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Flex from "components/Flex";
import { useEffect, useState } from "react";
import axiosInstance from "services/api";
import { TABLE_FILTER } from "./home.constants";
import { filterRows } from "./home.utils";

const Home = () => {
  const [config, setConfig] = useState({
    rows: [],
    totalRows: 0,
    rowsPerPageOptions: [5, 10, 15],
    pageSize: 5,
    page: 1,
  });

  const [filter, setFilter] = useState(TABLE_FILTER.ALL);
  const [loading, setLoading] = useState(false);
  const [allRows, setAllRows] = useState([]);

  const getAllUsers = async () => {
    let page = 1;
    let allUsers = [];
    setLoading(true);

    while (true) {
      try {
        const response = await axiosInstance.get(`/users?page=${page}`);
        const users = response.data.data;
        if (users?.length === 0) {
          setLoading(false);
          break;
        }
        allUsers = [...allUsers, ...users];

        setConfig((prevState) => ({
          ...prevState,
          rows: allUsers,
          totalRows: allUsers.length,
        }));

        setAllRows(allUsers);

        page++;
      } catch (error) {
        console.error(error);
        break;
      }
    }
  };

  const onPageChange = (value) => {
    setConfig((prevState) => ({
      ...prevState,
      page: value + 1, // table page start from 0
    }));
  };

  const onPageSizeChange = (value) => {
    setConfig((prevState) => ({
      ...prevState,
      page: 1,
      pageSize: value,
    }));
  };

  const onFilterChange = (e) => {
    const value = e?.target?.value;
    setFilter(value);

    let rows = allRows;

    if (value === TABLE_FILTER.FIRST_G) {
      rows = filterRows(rows, "first_name", "G");
    } else if (value === TABLE_FILTER.LAST_W) {
      rows = filterRows(rows, "last_name", "W");
    }

    setConfig((prevState) => ({
      ...prevState,
      rows: rows,
      totalRows: rows.total,
    }));
  };

  useEffect(() => {
    if (allRows.length < 1) {
      getAllUsers();
    }
  }, [allRows]);

  return (
    <Box py={4}>
      <Typography variant="h2">Manage Insurances</Typography>
      <Typography variant="body2">* Demo functions with user list</Typography>

      <Flex justifyContent="flex-end">
        <Box width={300}>
          <FormControl fullWidth>
            <InputLabel>Filter</InputLabel>
            <Select value={filter} label="Filter" onChange={onFilterChange}>
              <MenuItem value={TABLE_FILTER.ALL}>All</MenuItem>
              <MenuItem value={TABLE_FILTER.FIRST_G}>
                First name starts with G
              </MenuItem>
              <MenuItem value={TABLE_FILTER.LAST_W}>
                Last name starts with W
              </MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Flex>

      <Box mt={3}>
        <DataGrid
          autoHeight
          pagination
          loading={loading}
          rowsPerPageOptions={config.rowsPerPageOptions}
          page={config.page - 1}
          pageSize={config.pageSize}
          rows={config.rows}
          columns={[
            { field: "id", headerName: "ID" },
            { field: "email", headerName: "Email", flex: 2 },
            { field: "first_name", headerName: "First Name", flex: 1 },
            { field: "last_name", headerName: "Last Name", flex: 1 },
          ]}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          disableColumnMenu
          disableSelectionOnClick
        />
      </Box>
    </Box>
  );
};

export default Home;
