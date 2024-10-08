import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Alert, Space } from 'antd';
import { SmileOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { setSignupData } from '../redux/signupSlice';
import '../styles/signup.scss';
import icon from "../assets/logo.png"

const { Title, Text } = Typography;

const Signup: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate
  const [alertMessage, setAlertMessage] = useState<string | null>(null); // State for alert message

  const handleFinish = (values: any) => {
    console.log('Form values:', values);
    dispatch(setSignupData(values));
    localStorage.setItem('userData', JSON.stringify(values)); //if locally stored data will same then only valid for the login
    setAlertMessage('Signup successful...! Login with your account');
    setTimeout(() => {
      navigate('/login');
    }, 2000); // Redirect after 2 seconds
  };

  // Custom password validation
  const validatePassword = (_: any, value: string) => {
    if (!value) {
      return Promise.reject('Please enter your password');
    }
    if (value.length < 8) {
      return Promise.reject('Password must be at least 8 characters long');
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) {
      return Promise.reject('Password must contain at least one special character');
    }
    if (/(\w)\1/.test(value)) {
      return Promise.reject('Password cannot contain repetitive characters');
    }
    if (/\s/.test(value)) {
      return Promise.reject('Password cannot contain spaces');
    }
    return Promise.resolve();
  };

  return (
    
    <div className='main_content'>
     {/* navbar */}
     <div className='logo'>
        <img src={icon} alt="#Logo"/>
      </div>
    <div className="container-2">

     

      {alertMessage && (
        <div className="alert-container">
          <Alert
            message={
              <Space>
                <SmileOutlined />
                {alertMessage}
              </Space>
            }
            type="success"
            showIcon
            className="alert-message"
          />
        </div>
      )}
      <Form
        layout="vertical"
        onFinish={handleFinish}
        className="signup-form"
      >
        <div className='signup_text'>
        <div className="head">
          <Title>Sign up</Title>
        </div>

        <div className="refresh">
          <Text>
          <a href="/login" className="link">  Already have an account? </a>
          </Text>
        </div>
        </div>


      <div className='username-main'>
        <div className='username-first'>
        <Form.Item
          label="First Name*"
          name="firstName"
          rules={[{ required: true, message: 'Please enter your first name' }]}
        >
          <Input placeholder="John" />
        </Form.Item>
        </div>
        <div>
        <Form.Item
          label="Last Name*"
          name="lastName"
          rules={[{ required: true, message: 'Please enter your last name' }]}
        >
          <Input placeholder="Doe" />
        </Form.Item>
        </div>
      </div>
        

        

        <Form.Item
          label="Company"
          name="company"
        >
          <Input placeholder="Demo Inc." />
        </Form.Item>

        <Form.Item
          label="Email Address*"
          name="email"
          rules={[{ required: true, type: 'email', message: 'Please enter a valid email address' }]}
        >
          <Input placeholder="demo@company.com" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, validator: validatePassword }]}
        >
          <Input.Password placeholder="******" />
        </Form.Item>

       
        <p className='TandC'>
        By Signing up, you agree to our <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
        </p>
          
    

        <Form.Item>
          <Button type="primary" htmlType="submit" className="btn">
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </div>
    </div>
  );
};

export default Signup;
