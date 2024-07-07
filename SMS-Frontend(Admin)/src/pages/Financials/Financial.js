import React from "react";
import Header from "../../components/Finances/Header/Header";
import TableFinance from "../../components/Finances/TableFinances/TableFinance";

const Financial = () => {
  return (
    <>
      <div
        style={{
          margin: 15,
        }}
      >
        <Header></Header>
        <TableFinance />
      </div>
    </>
  );
};

export default Financial;
