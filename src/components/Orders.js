import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import Order from "./Order";
import { useSelector } from "react-redux";
import styled from "styled-components";

function Orders() {
  const user = useSelector((state) => state.users.user);
  const [orders, setOrders] = useState([]);

  console.log(orders);
  useEffect(() => {
    setTimeout(() => {}, []);
    if (user) {
      db.collection("users")
        .doc(user?.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) =>
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          )
        );
    } else {
      setOrders([]);
    }
  }, [user]);
  return (
    <OrdersBody>
      <h1>Your Orders</h1>
      <div className="orders__order">
        {orders?.map((order) => {
          return <Order key={order.id} order={order} />;
        })}
      </div>
    </OrdersBody>
  );
}

export default Orders;

const OrdersBody = styled.div`
  padding: 0 5rem;
`;
