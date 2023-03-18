import { useMemo } from "react";
import { EditButton, DeleteButton, Stack } from "@pankod/refine-mui";
import { Typography, useDataGrid, DataGrid, List } from "@pankod/refine-mui";

export default function CompList() {
  const columns = useMemo(
    () => [
      { field: "title", headerName: "Title", flex: 1, minWidth: 300 },
      { field: "content", headerName: "Content", flex: 1, minWidth: 200 },
      {
        headerName: "Actions",
        field: "actions",
        minWidth: 50,
        renderCell: function render(params) {
          return (
            <Stack direction="row" spacing={1}>
              <EditButton hideText recordItemId={params.row.id} />
              <DeleteButton hideText recordItemId={params.row.id} />
            </Stack>
          );
        },
      },
    ],
    []
  );

  const { dataGridProps, sortingMode, sortModel, onSortModelChange } =
    useDataGrid();

  return (
    <List
      resource="resource"
      createButtonProps={{ size: "small" }}
      cardHeaderProps={{
        title: <Typography variant="h5">Resource</Typography>,
      }}
    >
      <DataGrid
        {...dataGridProps}
        columns={columns}
        sortingMode={sortingMode}
        sortModel={sortModel}
        onSortModelChange={onSortModelChange}
        autoHeight
      />
    </List>
  );
}
