import React, { useEffect, useState } from 'react';
import BackButton from '../components/BackButton';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Spinner from '../components/Spinner';


const ShowBook = () => {

    const [book, setBook] = useState();
    const [loading, setLoading] = useState(false)
    const { id } = useParams();
    console.log(id)

    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5555/books/${id}`)
            .then((res) => {
                console.log(res)
                setBook(res?.data);
                setLoading(false)
            })
            .catch((err) => {
                setLoading(false)
                return err;
            })

    }, [])

    return (
        <div className='p-4'>
            <BackButton />

            {loading ?
                (
                    <Spinner />
                ) : (
                    <div className='flex flex-col w-fit'>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Id -</span>
                            <span>{book?._id}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Title -</span>
                            <span>{book?.title}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Author -</span>
                            <span>{book?.author}</span>
                        </div>
                        <div className='my-4'>
                            <span className='text-xl mr-4 text-gray-500'>Publish Year -</span>
                            <span>{book?.publishYear}</span>
                        </div>

                    </div>
                )}
        </div>
    )
}

export default ShowBook