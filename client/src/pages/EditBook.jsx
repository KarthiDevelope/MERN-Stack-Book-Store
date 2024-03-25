import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import BackButton from '../components/BackButton';
import { message } from 'antd';
import Spinner from '../components/Spinner';

const EditBook = () => {
  const { id } = useParams(); // Assuming you're using id parameter for book ID
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [formValues, setFormValues] = useState({
    title: '',
    author: '',
    publishYear: ''
  });

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5555/books/${id}`)
      .then(res => {
        const { title, author, publishYear } = res?.data;
        setFormValues({ title, author, publishYear });
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching book details:', error);
        setLoading(false)
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send updated book details to API
    axios.put(`http://localhost:5555/books/${id}`, formValues)
      .then(() => {
        console.log('Book updated successfully');
        message.success("Books Updated Successfully")
        navigate(`/`);
      })
      .catch(error => {
        message.error(error)
        console.error('Error updating book:', error);
      });
  };

  return (
    <div className='p-4'>
      <BackButton />
      <br />
      <h1 className='text-2xl'>Edit Book</h1>
      {loading ? (<Spinner />) :
        (
          <form onSubmit={handleSubmit} className='flex flex-col w-80 gap-2 '>
            <label>Title :</label>
            <input
              className='border-2 border-sky-500 p-2 rounded-lg'
              type='text'
              name='title'
              value={formValues.title}
              onChange={handleChange}
              required
            />
            <label>Author :</label>
            <input
              className='border-2 border-sky-500 p-2 rounded-lg'
              type='text'
              name='author'
              value={formValues.author}
              onChange={handleChange}
              required
            />
            <label>Publish Year :</label>
            <input
              className='border-2 border-sky-500 p-2 rounded-lg'
              type='number'
              name='publishYear'
              value={formValues.publishYear}
              onChange={handleChange}
              required
            />
            <button type="submit" className='bg-gray-300 p-2 rounded-lg'>Save</button>
          </form>
        )
      }

    </div>
  );
}

export default EditBook;
