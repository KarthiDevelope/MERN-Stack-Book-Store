import React, { useEffect, useState } from 'react';
import axios from "axios";
import Spinner from '../components/Spinner';
import { Link, Navigate } from "react-router-dom";
import { MdOutlineAddBox } from "react-icons/md";
import { EditOutlined, DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Table, Popover, message } from "antd";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popDelete, setPopDelete] = useState(false);
  const [id, setId] = useState("")

  useEffect(() => {
    setLoading(true);

    getAllBooks();
  }, []);

  const getAllBooks = () => {
    axios.get("http://localhost:5555/books")
      .then((res) => {
        console.log("res", res);
        setBooks(res?.data?.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.error("Error fetching data:", err);
      });
  }

  const handleDelete = (id) => {
    setPopDelete(true);
    setId(id)
  }

  const handleConfirmDelete = () => {
    axios.delete(`http://localhost:5555/books/${id}`)
      .then((res) => {
        message.success("Deleted Successfully")
        setPopDelete(false);
        getAllBooks();

      })
      .catch((err) => {
        message.error(err)
        setPopDelete(true)
      })

  };

  const handleCancelDelete = () => {
    setPopDelete(false);
  };

  const columns = [
    {
      title: "S no",
      dataIndex: "sno",
      key: "sno"
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title"
    },
    {
      title: "Author",
      dataIndex: "author",
      key: "author"
    },
    {
      title: "Publish Year",
      dataIndex: "publishYear",
      key: "publishYear"
    },
    {
      title: "Actions",
      render: (name) => (

        <div className='flex items-center gap-4'>
          <Link to={`/books/details/${name?.id}`}>
            <EyeOutlined />
          </Link>
          <Link to={`/books/edit/${name?.id}`}>
            <EditOutlined />
          </Link>
          <Link onClick={() => handleDelete(name?.id)}>
            <DeleteOutlined />
          </Link>
        </div>
      )
    }
  ];

  const dataSource = books?.map((item, index) => ({
    key: index,
    sno: index + 1,
    id: item?._id,
    title: item?.title || "",
    author: item?.author || "",
    publishYear: item?.publishYear || "",
  }));

  return (
    <div className='p-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl my-8'>Books List</h1>
        <Link to="/books/create">
          <Button >
            Add Books
          </Button>
        </Link>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <>
          <Table
            columns={columns}
            dataSource={dataSource}
          />

          {popDelete && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
              <div className="bg-white p-6 rounded-lg shadow-xl">
                <h3 className="text-lg font-semibold">Confirm Delete</h3>
                <p className="text-gray-700 mb-4">Are you sure you want to delete?</p>
                <div className="flex justify-end">
                  <Button className="mr-2" onClick={handleCancelDelete}>Cancel</Button>
                  <Button type="primary" danger onClick={handleConfirmDelete}>Confirm</Button>
                </div>
              </div>
            </div>
          )}

        </>
      )}
    </div>
  );
};

export default Home;
