import React, { useEffect, useState } from "react";
import axios from "axios";
import { Collapse } from "antd";
import "./PaymentList.scss";
const { Panel } = Collapse;

const PaymentList = () => {
  const [payments, setPayments] = useState([]);

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

    fetchPayments();
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
                </Panel>
              </Collapse>
            );
          })
        ) : (
          <li>No payment intents found.</li>
        )}
      </ul>
    </div>
  );
};

export default PaymentList;
