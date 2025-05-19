import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  Select,
  message,
  Space,
  Popconfirm
} from 'antd';

const { Option } = Select;

const ClassManagement = () => {
  const [classes, setClasses] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingId, setEditingId] = useState(null);

  // Mock data for academic years (in real app, this might come from API)
  const academicYears = [
    '2023-2024',
    '2024-2025',
    '2025-2026'
  ];

  useEffect(() => {
    // TODO: Fetch classes from API
    // For now, using mock data
    setClasses([
      {
        class_id: 1,
        class_name: '1st',
        academic_year: '2023-2024',
        class_teacher_id: null,
        created_at: '2024-03-10',
        updated_at: '2024-03-10'
      }
    ]);
  }, []);

  const columns = [
    {
      title: 'Class Name',
      dataIndex: 'class_name',
      key: 'class_name',
    },
    {
      title: 'Academic Year',
      dataIndex: 'academic_year',
      key: 'academic_year',
    },
    {
      title: 'Class Teacher',
      dataIndex: 'class_teacher_id',
      key: 'class_teacher_id',
      render: (teacherId) => teacherId || 'Not Assigned'
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => (
        <Space>
          <Button type="primary" onClick={() => handleEdit(record)}>
            Edit
          </Button>
          <Popconfirm
            title="Delete class"
            description="Are you sure you want to delete this class?"
            onConfirm={() => handleDelete(record.class_id)}
            okText="Yes"
            cancelText="No"
          >
            <Button type="primary" danger>
              Delete
            </Button>
          </Popconfirm>
          <Button onClick={() => handleManageSections(record)}>
            Manage Sections
          </Button>
        </Space>
      ),
    },
  ];

  const handleAdd = () => {
    setEditingId(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleEdit = (record) => {
    setEditingId(record.class_id);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };

  const handleDelete = async (classId) => {
    try {
      // TODO: Implement API call to delete class
      setClasses(classes.filter(c => c.class_id !== classId));
      message.success('Class deleted successfully');
    } catch (error) {
      message.error('Failed to delete class');
    }
  };

  const handleManageSections = (record) => {
    // TODO: Implement section management
    message.info('Section management will be implemented soon');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingId) {
        // TODO: Implement API call to update class
        setClasses(classes.map(c =>
          c.class_id === editingId
            ? { ...c, ...values, updated_at: new Date().toISOString() }
            : c
        ));
        message.success('Class updated successfully');
      } else {
        // TODO: Implement API call to create class
        const newClass = {
          ...values,
          class_id: Math.max(...classes.map(c => c.class_id)) + 1,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };
        setClasses([...classes, newClass]);
        message.success('Class created successfully');
      }
      setIsModalVisible(false);
    } catch (error) {
      message.error('Please fill all required fields');
    }
  };

  return (
    <div style={{ padding: '24px' }}>
      <div style={{ marginBottom: '16px' }}>
        <Button type="primary" onClick={handleAdd}>
          Add New Class
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={classes}
        rowKey="class_id"
      />

      <Modal
        title={editingId ? 'Edit Class' : 'Add New Class'}
        open={isModalVisible}
        onOk={handleModalOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            name="class_name"
            label="Class Name"
            rules={[{ required: true, message: 'Please input class name!' }]}
          >
            <Input placeholder="e.g., 1st, 2nd, 3rd" />
          </Form.Item>

          <Form.Item
            name="academic_year"
            label="Academic Year"
            rules={[{ required: true, message: 'Please select academic year!' }]}
          >
            <Select placeholder="Select academic year">
              {academicYears.map(year => (
                <Option key={year} value={year}>{year}</Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ClassManagement;