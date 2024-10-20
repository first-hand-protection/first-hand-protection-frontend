// import { Container, Typography } from "@mui/joy";
// import { usePageEffect } from "../core/page";

// export const Component = function Tests(): JSX.Element {
//   usePageEffect({ title: "Tests" });

//   return (
//     <Container sx={{ py: 2, margin: 2 }}>
//       <Typography level="h2" gutterBottom>
//         Tests
//       </Typography>

//       <Typography>Coming soon...</Typography>
//     </Container>
//   );
// };
import { Container, FormControl, MenuItem, Select } from "@mui/joy";
import {
  Button,
  InputLabel,
  Pagination,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { CSVLink } from "react-csv";
import { usePageEffect } from "../core/page";
import { supabase } from "../core/supabase";

// Define an interface for the table data
interface TestData {
  testName: string;
  createDate: string;
  schedulePeriod: string;
  participants: number;
  department: string;
  status: string;
}

interface TestDataV2 {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: string;
  created_at: string;
  updated_at: string;
}

// Simulated API response structure
interface ApiResponse {
  data: TestDataV2[];
  total: number;
}

// Function to simulate fetching data from an API
const fetchData = async (
  page: number,
  rowsPerPage: number,
  filters: { [key: string]: string },
  sortBy: { field: string; direction: "asc" | "desc" }, // | null,
): Promise<ApiResponse> => {
  try {
    const data = await getAllCampaigns(); // Call the Supabase API function

    if (data === null) {
      // Handle the error case where getAllCampaigns returns null
      console.error("Failed to fetch data from Supabase.");
      return { data: [], total: 0 }; // Return empty data and zero total
    }

    // Apply filtering and sorting on the client-side
    let filteredData = data;

    // Filtering
    for (const field in filters) {
      if (filters[field]) {
        filteredData = filteredData.filter((row) =>
          String(row[field])
            .toLowerCase()
            .includes(filters[field].toLowerCase()),
        );
      }
    }

    // Sorting
    if (sortBy) {
      filteredData.sort((a, b) => {
        const aValue =
          typeof a[sortBy.field] === "string"
            ? a[sortBy.field].toLowerCase()
            : a[sortBy.field];
        const bValue =
          typeof b[sortBy.field] === "string"
            ? b[sortBy.field].toLowerCase()
            : b[sortBy.field];

        if (aValue < bValue) return sortBy.direction === "asc" ? -1 : 1;
        if (aValue > bValue) return sortBy.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    const startIndex = (page - 1) * rowsPerPage;
    const endIndex = startIndex + rowsPerPage;

    return {
      data: filteredData.slice(startIndex, endIndex),
      total: filteredData.length,
    };
  } catch (error) {
    // Handle any unexpected errors during filtering/sorting
    console.error("An unexpected error occurred:", error);
    return { data: [], total: 0 }; // Return empty data and zero total
  }
};

async function getAllCampaigns() {
  try {
    const { data, error } = await supabase.from("campaign").select("*");

    if (error) {
      console.error("Error fetching campaigns:", error);
      throw error; // Re-throw the error to be handled by the caller
    }

    return data;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    // Handle the error appropriately, e.g., display an error message to the user
    return null; // Or return an empty array or other suitable value
  }
}

export const Component = function Tests(): JSX.Element {
  usePageEffect({ title: "View Tests!" });
  const [tableData, setTableData] = useState<TestDataV2[]>([]);
  const [totalDataCount, setTotalDataCount] = useState(0);
  const [filters, setFilters] = useState({
    name: "",
    description: "",
    start_date: "",
    end_date: "",
    status: "",
    created_at: "",
    updated_at: "",
  });
  const [sortBy, setSortBy] = useState<{
    field: keyof TestDataV2;
    direction: "asc" | "desc";
  } | null>(null);
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [columnOrder, setColumnOrder] = useState([
    "name",
    "description",
    "start_date",
    "end_date",
    // "department",
    "status",
    "created_at",
    "updated_at",
    "actions", // Added actions column
  ]);
  const [
    visibleColumns,
    // setVisibleColumns // TODO.
  ] = useState({
    name: true,
    description: true,
    start_date: true,
    end_date: true,
    // department: true,
    status: true,
    created_at: true,
    updated_at: true,
    actions: true, // Added actions column
  });
  const [
    columnWidths,
    // setColumnWidths // TODO.
  ] = useState<{ [key: string]: number }>({});

  const tableRef = useRef<HTMLTableElement>(null);

  // Fetch initial data
  useEffect(() => {
    const getInitialData = async () => {
      const data = await fetchData(page, rowsPerPage, filters, sortBy);
      setTableData(data.data);
      setTotalDataCount(data.total);
    };
    getInitialData();
  }, [page, rowsPerPage, filters, sortBy]);

  const handleFilterChange = (field: keyof typeof filters, value: string) => {
    setFilters({
      ...filters,
      [field]: value,
    });
    setPage(1); // Reset to page 1 after filtering
  };

  const handleSort = (field: keyof TestDataV2) => {
    if (sortBy && sortBy.field === field) {
      setSortBy({
        field,
        direction: sortBy.direction === "asc" ? "desc" : "asc",
      });
    } else {
      setSortBy({ field, direction: "asc" });
    }
    setPage(1); // Reset to page 1 after sorting
  };

  const handleChangePage = (
    event: React.ChangeEvent<unknown>,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<unknown>) => {
    if (event) {
      setRowsPerPage(parseInt(event.target.value as string, 10));
    }

    setPage(1); // Reset to page 1 after changing rows per page
  };

  // TODO: Column Visibility
  // const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  // const open = Boolean(anchorEl);
  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };
  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const toggleColumnVisibility = (column: string) => {
  //   setVisibleColumns((prev) => ({ ...prev, [column]: !prev[column] }));
  // };

  // Column Reordering
  const onDragEnd = (result: {
    destination: { index: number };
    source: { index: number };
  }) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(columnOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setColumnOrder(items);
  };

  // TODO: Column Resizing
  // const handleResize = (column: string, width: number) => {
  //   setColumnWidths((prev) => ({ ...prev, [column]: width }));
  // };

  // Data Export
  const csvData = tableData.map((row) => ({
    ...row,
    // Remove actions from CSV export (optional)
    actions: undefined,
  }));

  return (
    <Container sx={{ py: 2, margin: 2 }}>
      {/* Filter Controls */}
      <div
        style={{
          display: "flex",
          gap: "1rem",
          marginBottom: "1rem",
          padding: "1rem",
          flexWrap: "wrap", // Allow wrapping for smaller screens
        }}
      >
        <TextField
          label="Search by Test Name"
          value={filters.testName}
          onChange={(e) => {
            if (e) handleFilterChange("testName", e.target.value);
          }}
        />
        <TextField
          label="Create Date"
          value={filters.createDate}
          onChange={(e: Event) => {
            if (e) handleFilterChange("createDate", e.target.value);
          }}
        />
        <TextField
          label="Schedule Period"
          value={filters.schedulePeriod}
          onChange={(e: Event) => {
            if (e) handleFilterChange("schedulePeriod", e.target.value);
          }}
        />
        <TextField
          label="Participants"
          value={filters.participants}
          onChange={(e: Event) => {
            if (e) handleFilterChange("participants", e.target.value);
          }}
        />
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="department-filter-label">Department</InputLabel>
          <Select
            id="department-filter"
            value={filters.department}
            onChange={(e: Event) => {
              if (e) handleFilterChange("department", e.target.value);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Marketing">Marketing</MenuItem>
            <MenuItem value="Finance">Finance</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Product Development">Product Development</MenuItem>
            <MenuItem value="Human Resources">Human Resources</MenuItem>
            <MenuItem value="IT">IT</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            id="status-filter"
            value={filters.status}
            onChange={(e: Event) => {
              if (e) handleFilterChange("status", e.target.value);
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Scheduled">Scheduled</MenuItem>
            <MenuItem value="Completed">Completed</MenuItem>
          </Select>
        </FormControl>

        {/* TODO: View Column Icon Button. */}
        {/* <IconButton
          id="column-visibility-button"
          color="primary"
          aria-controls={open ? "column-visibility-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          onClick={handleClick}
          size="sm"
          sx={{ ml: "auto" }}
        >
          {/* Add an icon for column visibility (e.g., three vertical dots) */}
        {/* <ViewColumnIcon /> */}
        {/* </IconButton> */}
      </div>

      {/* Table */}
      <div style={{ overflowX: "auto" }}>
        {/* Add horizontal scroll for the table */}
        <TableContainer component={Paper}>
          <Table ref={tableRef} stickyHeader>
            {/* Make header sticky */}
            <TableHead>
              {/* <TableRow> */}
              {/* <TableCell> */}

              {/* <Menu
                id="column-visibility-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
              >
                {columnOrder.map((column) => (
                  <MenuItem
                    key={column}
                    onClick={() => toggleColumnVisibility(column)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={
                          visibleColumns[column as keyof typeof visibleColumns]
                        }
                      />
                    </ListItemIcon>
                    <ListItemText
                      primary={column.replace(/([A-Z])/g, " $1").toUpperCase()}
                    />
                  </MenuItem>
                ))}
              </Menu> */}
              {/* </TableCell> */}
              <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="columns" direction="horizontal">
                  {(provided) => (
                    <TableRow
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      {columnOrder
                        .filter(
                          (column) =>
                            visibleColumns[
                              column as keyof typeof visibleColumns
                            ],
                        )
                        .map((column, index) => (
                          <Draggable
                            key={column}
                            draggableId={column}
                            index={index}
                          >
                            {(provided) => (
                              <TableCell
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                ref={provided.innerRef}
                                onClick={() =>
                                  handleSort(column as keyof TestDataV2)
                                }
                                sx={{
                                  width: columnWidths[column] || "auto", // Apply column width
                                  whiteSpace: "nowrap", // Prevent cell content from wrapping
                                  overflow: "hidden", // Hide content that overflows
                                  textOverflow: "ellipsis", // Add ellipsis to overflowing text
                                }}
                              >
                                {/* <ResizeObserver
                                    onResize={({ width }) =>
                                      handleResize(column, width!)
                                    }
                                  > */}
                                <span>
                                  {column
                                    .replace(/([A-Z])/g, " $1")
                                    .toUpperCase()}
                                </span>
                                {/* </ResizeObserver> */}
                              </TableCell>
                            )}
                          </Draggable>
                        ))}
                      {provided.placeholder}
                    </TableRow>
                  )}
                </Droppable>
              </DragDropContext>
              {/* </TableRow> */}
            </TableHead>
            <TableBody>
              {tableData.map((row) => (
                <TableRow key={row.testName}>
                  {columnOrder
                    .filter(
                      (column) =>
                        visibleColumns[column as keyof typeof visibleColumns],
                    )
                    .map((column) => (
                      <TableCell key={column}>
                        {column === "actions" ? (
                          // Render buttons in the actions column
                          row.status === "Completed" ? (
                            <Button
                              variant="outlined"
                              // color="neutral"
                              size="sm"
                            >
                              View Result
                            </Button>
                          ) : (
                            <Button
                              variant="outlined"
                              color="primary"
                              size="sm"
                            >
                              Edit
                            </Button>
                          )
                        ) : (
                          // Render other cell data
                          row[column as keyof TestDataV2]
                        )}
                      </TableCell>
                    ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {/* Pagination and Data Export Controls */}
      <Stack
        spacing={2}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        sx={{ padding: 2 }}
      >
        <Typography>
          Showing {tableData.length === 0 ? 0 : (page - 1) * rowsPerPage + 1}-
          {Math.min(page * rowsPerPage, totalDataCount)} of {totalDataCount}{" "}
          results
        </Typography>
        <Stack direction="row" spacing={2}>
          <CSVLink data={csvData} filename={"test_data.csv"}>
            <Button variant="outlined" color="primary">
              Export CSV
            </Button>
          </CSVLink>
          <Pagination
            count={Math.ceil(totalDataCount / rowsPerPage)}
            page={page}
            onChange={handleChangePage}
            color="primary"
            showFirstButton
            showLastButton
          />
          <FormControl sx={{ minWidth: 80 }}>
            <span id="rows-per-page-label">Rows per page</span>
            <Select
              id="rows-per-page"
              value={rowsPerPage}
              onChange={handleChangeRowsPerPage}
            >
              {[5, 10, 25].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Container>
  );
};

const testDataV2: TestDataV2 = [
  {
    campaign_id: 2,
    organization_id: 7,
    name: "Phishing Campaign",
    description: "Simulated phishing attack against Target Corp",
    start_date: "2024-07-20",
    end_date: "2024-07-31",
    status: "completed",
    created_at: "2024-10-05T11:40:30.916945+00:00",
    updated_at: "2024-10-05T11:40:30.916945+00:00",
    user_id: "cad61e02-2c7f-4d68-aa61-228621429cf9",
    deleted_at: null,
  },
  {
    campaign_id: 3,
    organization_id: 7,
    name: "Baiting Campaign",
    description: "Simulated baiting attack against SmallBiz Inc",
    start_date: "2024-08-01",
    end_date: "2024-08-15",
    status: "in progress",
    created_at: "2024-10-05T11:40:30.916945+00:00",
    updated_at: "2024-10-05T11:40:30.916945+00:00",
    user_id: "cad61e02-2c7f-4d68-aa61-228621429cf9",
    deleted_at: null,
  },
];

// Sample data for the table
const testDataV1: TestData[] = [
  {
    testName: "IT announcement scam test",
    createDate: "20 Aug 2024",
    schedulePeriod: "21 Aug 2024 - 24 Aug 2024 9:00am - 4:00 pm",
    participants: 20,
    department: "Marketing",
    status: "Scheduled",
  },
  {
    testName: "New Product Launch Survey",
    createDate: "15 Jul 2024",
    schedulePeriod: "28 Aug 2024 - 30 Aug 2024 10:00am - 2:00 pm",
    participants: 50,
    department: "Product Development",
    status: "Scheduled",
  },
  {
    testName: "Financial Literacy Training Assessment",
    createDate: "10 Aug 2024",
    schedulePeriod: "1 Sep 2024 - 1 Sep 2024 1:00pm - 4:00 pm",
    participants: 100,
    department: "Finance",
    status: "Completed",
  },
  {
    testName: "Sales Team Role Play Evaluation",
    createDate: "5 Aug 2024",
    schedulePeriod: "22 Aug 2024 - 24 Aug 2024 9:00am - 12:00 pm",
    participants: 30,
    department: "Sales",
    status: "Completed",
  },
  {
    testName: "Onboarding Process Feedback Survey",
    createDate: "1 Aug 2024",
    schedulePeriod: "15 Aug 2024 - 20 Aug 2024  9:00am - 5:00 pm",
    participants: 15,
    department: "Human Resources",
    status: "Scheduled",
  },
  {
    testName: "IT Security Awareness Training",
    createDate: "25 Jul 2024",
    schedulePeriod: "29 Aug 2024 - 31 Aug 2024 10:00am - 1:00 pm",
    participants: 200,
    department: "IT",
    status: "Scheduled",
  },
];
