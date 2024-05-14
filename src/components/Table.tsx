import { flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { useState } from "react";

const columns = [
  {
    accessorKey: "name",
    header: "name",
    cell: props => <p>{props.getValue()}</p>,
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

export const Table: React.FC = ({ list }: any) => {
  console.log(list);
  const [data, setData] = useState(list);

  //  useReactTable
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table style={{ width: `${table.getTotalSize()}px` }}>
      <thead className="h-[50px]">
        {/* Table 헤더 */}
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                className="bg-[#d6e0ea]"
                key={header.id}
                style={{
                  // header의 column의 size를 가져와서 width를 조정해준다.
                  width: `${header.getSize()}px`,
                }}
              >
                <span className="text-[1rem]">{flexRender(header.column.columnDef.header, header.getContext())}</span>
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
