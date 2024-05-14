import { ExpandedState, flexRender, getCoreRowModel, getExpandedRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

const columns = [
  {
    accessorKey: "name",
    header: "name",
    cell: ({ row, getValue }: any) => {
      return (
        <div
          className="expander"
          style={{
            paddingLeft: `${row.depth * 2}rem`,
          }}
        >
          {row.getCanExpand() && (
            <button
              className="toggle-expanded"
              {...{
                onClick: row.getToggleExpandedHandler(),
                style: { cursor: "pointer" },
              }}
            >
              {row.getIsExpanded() ? "👇" : "👉"}
            </button>
          )}
          {getValue()}
        </div>
      );
    },
  },
  // {
  //   accessorKey: "Total",
  //   header: "Total",
  //   cell: props => <p>{props.getValue()?.name}</p>,
  // },
  {
    accessorKey: "numberOfAnnotations",
    header: "Annotated",
    cell: props => <p>{props.getValue()}</p>,
  },
  // {
  //   accessorKey: "Review",
  //   header: "Review",
  //   cell: props => <p>{props.getValue()}</p>,
  // },
  // {
  //   accessorKey: "Members",
  //   header: "Members",
  //   cell: props => <p>{props.getValue()}</p>,
  // },
];

export const Table: React.FC = ({ data }: any) => {
  const [expanded, setExpanded] = useState<ExpandedState>({});
  //  useReactTable
  const table = useReactTable({
    data,
    columns,
    state: {
      expanded,
    },
    onExpandedChange: setExpanded,
    getSubRows: (row: any) => {
      return row.subRows;
    },
    getCoreRowModel: getCoreRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <table style={{ width: `${table.getTotalSize()}px` }}>
      <thead className="h-[50px]">
        {/* Table 헤더 */}
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id} colSpan={header.colSpan}>
                {flexRender(header.column.columnDef.header, header.getContext())}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td
                key={cell.id}
                style={{
                  // cell의 column의 size를 가져와서 width를 조정해준다.
                  width: `${cell.column.getSize()}px`,
                  textAlign: "center",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
