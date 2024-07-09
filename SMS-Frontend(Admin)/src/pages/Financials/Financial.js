import React, {useEffect, useState} from "react";
import Header from "../../components/Finances/Header/Header";
import TableFinance from "../../components/Finances/TableFinances/TableFinance";
import axios from "axios";

const Financial = () => {

  const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/financial/total-amount");
        setTotalAmount(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
    }, []);

  return (
    <>
      <div
        style={{
          margin: 15,
        }}
      >
        <Header total={totalAmount}></Header>
        <TableFinance />
      </div>
    </>
  );
};

export default Financial;
