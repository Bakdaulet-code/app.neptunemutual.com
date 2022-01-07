import {
  Table,
  TablePagination,
  TableWrapper,
  TBody,
  THead,
} from "@/components/UI/organisms/Table";
import { classNames } from "@/utils/classnames";
import { getAvailableClaim } from "@/src/_mocks/policy/claim";

const renderHeader = (col) => (
  <th
    scope="col"
    className={classNames(
      `px-6 py-6 font-bold text-sm uppercase`,
      col.align === "right" ? "text-right" : "text-left"
    )}
  >
    {col.name}
  </th>
);

const renderAddress = (row) => (
  <td className="px-6 py-6 text-404040">{row.address}</td>
);

const renderClaimBefore = (row) => (
  <td className="px-6 py-6">
    <span className="text-left whitespace-nowrap text-black">
      {row.claimBefore}
    </span>
  </td>
);

const renderAmount = (row) => (
  <td className="px-6 py-6 text-right">
    <span className="text-black">
      {row.amount} {row.unit}
    </span>
  </td>
);

const renderActions = (_row) => (
  <td className="px-6 py-6" style={{ minWidth: "120px" }}>
    <span className="text-4E7DD9 hover:underline cursor-pointer">Claim</span>
  </td>
);

const columns = [
  {
    name: "address",
    align: "left",
    renderHeader,
    renderData: renderAddress,
  },
  {
    name: "claim before",
    align: "left",
    renderHeader,
    renderData: renderClaimBefore,
  },
  {
    name: "amount",
    align: "right",
    renderHeader,
    renderData: renderAmount,
  },
  {
    name: "",
    align: "right",
    renderHeader,
    renderData: renderActions,
  },
];

export const MyPoliciesClaimTable = () => {
  const claimData = getAvailableClaim();

  return (
    <>
      <TableWrapper>
        <Table>
          <THead columns={columns}></THead>
          <TBody columns={columns} data={claimData}></TBody>
        </Table>
        <TablePagination />
      </TableWrapper>
    </>
  );
};