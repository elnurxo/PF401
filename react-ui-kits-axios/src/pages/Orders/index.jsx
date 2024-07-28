import { useState } from "react";
import Container from "../../components/Container";
import { useEffect } from "react";
import { getAll, getOne, patchOne } from "../../services/api/api";
import { endpoints } from "../../config/constants";
import { Select, Table } from "antd";
import moment from "moment/moment";
import Swal from "sweetalert2";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  useEffect(()=>{
    getAll(endpoints.users).then((res)=>setUsers([...res.data]));
  },[])
  const columns = [
    {
      title: "Ordered User",
      render: (values) => {
        const currentUser = users.find((x)=>x.id==values.userId);
        return <span>{currentUser.username}</span>;
      },
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "createdAt",
      dataIndex: "createdAt",
      render: (values) => {
        return <span>{moment(values).format("MMMM Do YY, h:mm")}</span>;
      },
    },
    {
      title: "total Price",
      dataIndex: "totalPrice",
    },
    {
      title: "Change Status",
      render: (values) => {
        return (
          <Select
            defaultValue={values.status}
            style={{
              width: 120,
            }}
            onChange={(e) => {
              patchOne(endpoints.orders, values.id, {
                status: e,
              });
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "order status has been changed",
                showConfirmButton: false,
                timer: 1500,
              });
            }}
            options={[
              {
                value: "pending",
                label: "pending",
              },
              {
                value: "accepted",
                label: "accepted",
              },
              {
                value: "on courier",
                label: "on courier",
              },
              {
                value: "rejected",
                label: "rejected",
              },
            ]}
          />
        );
      },
    },
  ];
  useEffect(() => {
    getAll(endpoints.orders).then((res) => {
      setOrders([...res.data]);
    });
  }, []);

  //antd table
  return (
    <Container>
      <Table
        style={{ marginTop: "20px" }}
        columns={columns}
        dataSource={orders}
      />
    </Container>
  );
};

export default Orders;
