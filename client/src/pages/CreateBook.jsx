import React, { useState } from 'react';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    publishYear: ''
  });
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5555/books', formValues);
      console.log('Response:', response.data);
      setFormValues({ title: '', author: '', publishYear: '' });
      message.success("Saved Successfully")
      navigate("/")
    } catch (error) {
      message.error('Error:', error);
    }
  };

  return (
    <div className='p-4'>
      <BackButton />
      <br />
      <h1 className='text-2xl '>Create a Book</h1> <br />
      <form onSubmit={handleSubmit} className='flex flex-col w-80 gap-2 '>
        <label>Title :</label>
        <input 
          className='border-2 border-sky-500 p-2 rounded-lg' 
          type='text' 
          name='title' 
          value={formValues?.title}
          onChange={handleChange}
          required
        />
        <label>Author :</label>
        <input 
          className='border-2 border-sky-500 p-2 rounded-lg' 
          type='text' 
          name='author' 
          value={formValues?.author}
          onChange={handleChange}
          required
        />
        <label>Publish Year :</label>
        <input 
          className='border-2 border-sky-500 p-2 rounded-lg' 
          type='number' 
          name='publishYear' 
          value={formValues?.publishYear}
          onChange={handleChange}
          required
        />
        <button  type="submit" className='bg-gray-300 p-2 rounded-lg'>Save</button>
      </form>
    </div>
  );
}

export default CreateBook;
