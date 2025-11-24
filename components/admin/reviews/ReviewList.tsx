"use client";
import React, { Suspense } from "react";
import {
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Avatar, Chip, Rating } from "@mui/material";

export default function ReviewList() {
  const { dataGridProps } = useDataGrid({ resource: "get-all-reviews" });

  const columns = React.useMemo<GridColDef[]>(
    () => [
       {
        field: "Avatar",
        headerName: "Avatar",
        type: "string",
        minWidth: 100,
        align: "left",
        width: 50,
        renderCell: ({ row }) => <Avatar src={row.user?.image} alt={row.user?.name} />,
        flex: 1,
      },
      {
        field: "Name",
        headerName: "Name",
        type: "string",
        minWidth: 100,
        align: "left",
        width: 50,
        renderCell: ({ row }) => row.user?.name ?? "",
        flex: 1,
      },
      {
        field: "rating",
        headerName: "Rating",
        minWidth: 100,
        flex: 1,
        renderCell: ({ row }) => (
          <Rating
            value={row?.rating ?? 0}
            precision={0.5}
            readOnly
            size="large"
          />
        ),
      },
      { field: "reviewText", headerName: "Review", minWidth: 100, flex: 1 },
      {
        field: "approved",
        headerName: "Status",
        minWidth: 120,
        flex: 1,
        headerAlign: "center",
        align: "center",
        renderCell: ({ row }) => (
          <Chip
            label={row.approved ? "Approved" : "Pending"}
            color={row.approved ? "success" : "warning"}
            size="small"
            variant="outlined"
            sx={{
              minWidth: 90,
              fontWeight: 600,
            }}
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        renderCell: ({ row }) => (
          <div>
            <EditButton resource="get-all-reviews" hideText size="small" recordItemId={row.id} />
            <ShowButton resource="get-all-reviews" hideText size="small" recordItemId={row.id} />
            <DeleteButton resource="get-all-reviews" hideText size="small" recordItemId={row.id} />
          </div>
        ),
        align: "center",
        headerAlign: "center",
        flex: 1,
      },
    ],
    []
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
}
