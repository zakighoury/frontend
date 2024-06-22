import React, { useEffect, useState } from "react";
import axios from "axios";
import { Collapse, Button, Modal } from "antd";
import OrderForm from "../OrderCheck/OrderCheck";
import "./PaymentList.scss";
const { Panel } = Collapse;

const PaymentList = () => {
  const [payments, setPayments] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5002/payment-intents"
        );
        const paymentsData = response.data.paymentIntents || [];
        setPayments(paymentsData);
      } catch (error) {
        console.error("Error fetching payment intents:", error);
        setPayments([]); // Ensure payments is an array even if the fetch fails
      }
    };

    const fetchCartItems = async () => {
      try {
        const response = await axios.post("http://localhost:5002/cartitems");
        const cartItemsData = response.data.cartItems || [];
        setCartItems(cartItemsData);
        console.log(cartItemsData);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        setCartItems([]);
      }
    };

    fetchPayments();
    fetchCartItems();
  }, []);


  const showModal = (url) => {
    const width = 800;
    const height = 600;
    const left = window.innerWidth / 2 - width / 2;
    const top = window.innerHeight / 2 - height / 2;
    window.open(
      url,
      "Receipt",
      `width=${width},height=${height},top=${top},left=${left}`
    );
  };

  const handleUpdatePayment = async (values) => {
    if (selectedPayment) {
      const { amount, currency, ...updateValues } = values; // Exclude amount and currency

      try {
        const response = await axios.put(
          `http://localhost:5002/payment-intents/${selectedPayment.id}`,
          updateValues
        );
        if (response.status === 200) {
          setPayments((prevPayments) =>
            prevPayments.map((payment) =>
              payment.id === selectedPayment.id
                ? { ...payment, ...updateValues }
                : payment
            )
          );
          setSelectedPayment(null);
          setIsModalVisible(false);
        }
      } catch (error) {
        console.error("Error updating payment intent:", error);
      }
    }
  };

  return (
    <div className="payment-list">
      <h1>Payment Intents</h1>
      <ul>
        {payments.length > 0 ? (
          payments.map((payment) => {
            const paymentMethodDetails =
              payment.payment_method_details?.card || {};
            return (
              <Collapse key={payment.id}>
                <Panel
                  header={`Payment Method ID: ${payment.payment_method || "N/A"
                    }`}
                >
                  <strong>Amount:</strong> {payment.amount / 100} <br />
                  <strong>Currency:</strong> {payment.currency} <br />
                  <strong>Status:</strong> {payment.status} <br />
                  <strong>Succeeded:</strong>{" "}
                  {payment.status === "succeeded" ? "Yes" : "No"} <br />
                  <strong>Number:</strong>{" "}
                  {paymentMethodDetails.last4
                    ? `•••• ${paymentMethodDetails.last4}`
                    : "N/A"}{" "}
                  <br />
                  <strong>Fingerprint:</strong>{" "}
                  {paymentMethodDetails.fingerprint || "N/A"} <br />
                  <strong>Expires:</strong>{" "}
                  {paymentMethodDetails.exp_month &&
                    paymentMethodDetails.exp_year
                    ? `${paymentMethodDetails.exp_month} / ${paymentMethodDetails.exp_year}`
                    : "N/A"}{" "}
                  <br />
                  <strong>Type:</strong> {paymentMethodDetails.brand || "N/A"}{" "}
                  <br />
                  <strong>Date and Time:</strong>{" "}
                  {new Date(payment.created * 1000).toLocaleString()} <br />
                  <strong>Receipt URL:</strong>{" "}
                  <a onClick={() => showModal(payment.receipt_url)}>
                    View Receipt
                  </a>
                  <br />
                  {cartItems.length > 0 ? (
                    cartItems.map((item, index) => (
                      <li key={index}>
                        Product Name: {item.product.name}, Quantity:{" "}
                        {item.quantity}
                      </li>
                    ))
                  ) : (
                    <li>No cart items found.</li>
                  )}
                  <Button
                    onClick={() => {
                      setSelectedPayment(payment);
                      setIsModalVisible(true);
                    }}
                  >
                    Create Order
                  </Button>
                </Panel>
              </Collapse>
            );
          })
        ) : (
          <li>No payment intents found.</li>
        )}
      </ul>
      <Modal
        title="Create Order"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedPayment && <OrderForm payment={selectedPayment} />}
      </Modal>
    </div>
  );
};

export default PaymentList;
