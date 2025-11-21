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
import { Chip, Rating } from "@mui/material";

export default function ReviewList() {
  const { dataGridProps } = useDataGrid({ resource: "get-all-reviews" });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "Name",
        headerName: "Name",
        type: "number",
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
            <EditButton hideText size="small" recordItemId={row.id} />
            <ShowButton hideText size="small" recordItemId={row.id} />
            <DeleteButton hideText size="small" recordItemId={row.id} />
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
