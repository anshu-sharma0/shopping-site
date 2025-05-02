import axios from 'axios';
import '.././App.css';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router';
import { useState } from 'react';

function Products() {
    const url = process.env.REACT_APP_SERVER;
    const token = localStorage.getItem('token');
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const [startPage, setStartPage] = useState(1);

    const fetchProducts = async () => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_start=${startPage - 1}&_limit=${10}`);
        return response?.data;
    };

    const deleteProduct = async (id) => {
        const response = await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
        return response?.data;
    }

    const updateProduct = async (id) => {
        const response = await axios.patch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            title: 'Updated Title',
        });
        return response?.data;
    }

    const { data: products, isLoading, isError, error } = useQuery({
        queryKey: ['products', startPage],
        queryFn: () => fetchProducts(startPage),
        placeholderData: keepPreviousData 
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => deleteProduct(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['products', startPage], (oldData) => {
                return oldData?.filter((item) => item.id !== id);
            }
            );
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
        },
    })

    const updateMutation = useMutation({
        mutationFn: (id) => updateProduct(id),
        onSuccess: (data, id) => {
            queryClient.setQueryData(['products', startPage], (postData) => {
                return postData?.map((item) => {
                    if (item.id === id) {
                        return { ...item, title: data.title };
                    }
                    return item;
                });
            });
        },
        onError: (error) => {
            console.error('Error deleting product:', error);
        },
    })

    const handleToCart = async (item) => {
        const response = await axios.post(url + '/cart', {
            productId: item?.id,
            quantity: 1,
        }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    const handleToProductDetail = (id) => {
        navigate(`/product/${id}`);
    };

    if (isLoading) return <div className="text-center py-10">Loading...</div>;
    if (isError) return <div className="text-center py-10 text-red-600">Error: {error.message}</div>;
    console.log({ products })
    return (
        <main className="min-h-screen bg-gray-50 px-6 py-10">
            <section className="max-w-[100rem] mx-auto">
                <header className="mb-10 text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-800">
                        Discover Our Latest Products
                    </h2>
                    <p className="mt-2 text-gray-500 text-sm sm:text-base">
                        Handpicked just for you - shop the trendiest & best-rated items now.
                    </p>
                </header>

                <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {products?.length > 0 && products?.map((item) => {
                        console.log({ item })
                        return (
                            <div
                                key={item?.id}
                                className="bg-white rounded-2xl shadow-md border hover:shadow-lg transition-all duration-300 flex flex-col"
                            >
                                {/* <div className="h-60 relative overflow-hidden hover:cursor-pointer bg-gray-100 rounded-t-2xl" onClick={() => handleToProductDetail(item?.id)}>
                                    <img
                                        src={item?.image || item?.images[0]}
                                        alt={item?.title}
                                        className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-300"
                                        style={{ mixBlendMode: 'multiply' }}
                                    />
                                    {item?.price < 50 && (
                                        <span className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-sm">
                                            NEW
                                        </span>
                                    )}
                                </div> */}

                                <div className="p-4 flex-grow flex flex-col">
                                    <p className="text-xs text-gray-400 uppercase mb-1">{item?.id}</p>
                                    <h3 className="text-md font-semibold text-gray-800 line-clamp-2">{item?.title}</h3>
                                    <p className="text-sm text-gray-500 mt-1 mb-3 line-clamp-2">{item?.body}</p>

                                    <div className="mt-auto flex justify-between items-center">
                                        {/* <span className="text-lg font-bold text-indigo-600">${item?.price.toFixed(2)}</span> */}
                                    </div>
                                </div>

                                <div className="p-4 pt-0 flex gap-4">
                                    <button
                                        className={`w-1/2 py-2 px-4 rounded-lg font-semibold transition-colors duration-300 bg-blue-600 hover:bg-blue-800 text-white`}
                                        onClick={() => deleteMutation.mutate(item.id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className={`w-1/2 py-2 px-4 rounded-lg font-semibold transition-colors duration-300 bg-blue-600 hover:bg-blue-800 text-white`}
                                        onClick={() => updateMutation.mutate(item.id)}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        );
                    })}


                </div>
                <div className="flex items-center gap-4 mt-4">
                    <button
                        onClick={() => setStartPage((prev) => prev - 10)}
                        disabled={startPage === 1}
                        className={`px-4 py-2 rounded-md text-white font-medium transition ${startPage === 1
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700'
                            }`}
                    >
                        Prev
                    </button>

                    <p className="text-lg font-semibold">{Math.ceil(startPage / 10)}</p>

                    <button
                        onClick={() => setStartPage((prev) => prev + 10)}
                        className="px-4 py-2 rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition"
                    >
                        Next
                    </button>
                </div>

            </section>
        </main>
    );
}

export default Products;
