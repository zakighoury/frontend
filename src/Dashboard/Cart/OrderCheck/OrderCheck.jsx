// import React from "react";
// import { Form, Input, Button } from "antd";
// import axios from "axios";

// const OrderForm = ({ payment }) => {
//   const onFinish = async (values) => {
//     const orderData = {
//       paymentId: payment.id,
//       ...values,
//     };

//     try {
//       const response = await axios.post("http://localhost:5002/orders", orderData);
//       if (response.status === 200) {
//         console.log("Order created successfully");
//       }
//     } catch (error) {
//       console.error("Error creating order:", error);
//     }
//   };

//   return (
//     <Form onFinish={onFinish}>
//       <Form.Item
//         label="Customer Name"
//         name="customerName"
//         rules={[{ required: true, message: "Please input your name!" }]}
//       >
//         <Input />
//       </Form.Item>
//       <Form.Item
//         label="Product Name"
//         name="productName"
//         initialValue={payment.product_data?.name || ""}
//       >
//         <Input disabled />
//       </Form.Item>
//       <Form.Item
//         label="Product Description"
//         name="productDescription"
//         initialValue={payment.product_data?.description || ""}
//       >
//         <Input disabled />
//       </Form.Item>
//       <Form.Item
//         label="Product Price"
//         name="productPrice"
//         initialValue={(payment.product_data?.unit_amount / 100).toFixed(2) || ""}
//       >
//         <Input disabled />
//       </Form.Item>
//       <Form.Item>
//         <Button type="primary" htmlType="submit">
//           Create Order
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// };

// export default OrderForm;
