import React from 'react';
import RegisterForm from '../components/RegisterForm';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Register = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex-grow flex items-center justify-center px-4 py-8">
        <RegisterForm />
      </div>
      <Footer />
    </div>
  );
};

export default Register;
