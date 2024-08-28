import React, { useEffect } from "react";
import { Modal, Form, Input } from "antd";

const DriverModal = ({ visible, onCancel, onSubmit, initialValues }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      onSubmit(values);
      form.resetFields();
    });
  };

  return (
    <Modal
      visible={visible}
      title={initialValues ? "Edit Driver" : "Create New Driver"}
      okText={initialValues ? "Update" : "Create"}
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleSubmit}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="name"
          label="Driver Name"
          rules={[{ required: true, message: "Please enter driver name" }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default DriverModal;
