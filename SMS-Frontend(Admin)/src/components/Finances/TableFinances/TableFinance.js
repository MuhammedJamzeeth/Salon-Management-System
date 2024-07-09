import React, { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { TextField } from "@mui/material";

const columns = [
  { id: "orderID", label: "Order ID", minWidth: 170 },
  { id: "email", label: "Customer Email", minWidth: 100 },
  {
    id: "paymentMethod",
    label: "Payment Method",
    minWidth: 170,
    align: "right",
  },
  {
    id: "paymentStatus",
    label: "Payment Status",
    minWidth: 170,
    align: "right",
  },
  {
    id: "amount",
    label: "Amount",
    minWidth: 170,
    align: "right",
    format: (value) => value.toFixed(2),
  },
  {
    id: "moneyReceived",
    label: "Money Received",
    minWidth: 170,
    align: "right",
  },
];

const TableFinance = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [rows, setRows] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/financial");
        setRows(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleGenerateReport = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/financial/report", {
        responseType: "blob",
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "financial_report.pdf");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error("Error generating report:", error);
    }
  };

  const handleToggleMoneyReceived = async (row) => {
    try {
      const updatedRow = {
        ...row,
        moneyReceived: !row.moneyReceived,
        paymentStatus: !row.moneyReceived ? "PENDING" : "PAID",
      };
      await axios.put(`http://localhost:8080/api/financial/${row.id}`, updatedRow);
      // Assuming successful update, update the local state with the updated row
      const updatedRows = rows.map((r) => (r.id === row.id ? updatedRow : r));
      setRows(updatedRows);
    } catch (error) {
      console.error("Error toggling money received:", error);
    }
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const filteredRows = rows.filter((row) =>
      row.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{maxHeight: 440}}>
          <TextField
              id="search"
              label="Customer Email"
              style={{
                marginBottom: 10,
              }}
              color="error"
              variant="outlined"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
              style={{
                backgroundColor: "blue",
                color: "white",
                border: "none",
                padding: "5px 10px",
                marginLeft: 10,
                cursor: "pointer",
                marginBottom: 10,
                borderRadius: 5,
              }}
              onClick={handleGenerateReport}
          >
            Generate Financial Report
          </button>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                    <TableCell key={column.id} align={column.align} style={{minWidth: column.minWidth}}>
                      {column.label}
                    </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                      <TableRow hover role="checkbox" tabIndex={-1} key={row.orderID}>
                        {columns.map((column) => (
                            <TableCell key={column.id} align={column.align}>
                              {column.id === "moneyReceived" ? (
                                  <button
                                      style={{
                                        backgroundColor: row.moneyReceived ? "green" : "red",
                                        color: "white",
                                        border: "none",
                                        padding: "5px 10px",
                                        cursor: "pointer",
                                      }}
                                      onClick={() => handleToggleMoneyReceived(row)}
                                  >
                                    {row.moneyReceived ? "Received" : "Not Received"}
                                  </button>
                              ) : column.format && typeof row[column.id] === "number" ? (
                                  column.format(row[column.id])
                              ) : (
                                  row[column.id]
                              )}
                            </TableCell>
                        ))}
                      </TableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={filteredRows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
  );
};

export default TableFinance;
