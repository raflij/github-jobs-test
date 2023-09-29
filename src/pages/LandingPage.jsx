import React, { useEffect, useState } from 'react';
import { isToday, differenceInDays } from 'date-fns';
import { useJobListQuery, useSearchJobQuery } from '../services/api';

import Checkbox from "../components/Checkbox"
import InputField from "../components/InputField"
import Navbar from "../components/Navbar"
import { Link } from 'react-router-dom';

const LandingPage = () => {
    const [jobList, setJobList] = useState([]);
    const [isSearch, setIsSearch] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const [searchParams, setSearchParams] = useState({
        description: '',
        location: '',
        fullTime: false,
    });

    const [params, setParams] = useState({
        description: '',
        location: '',
        fullTime: '',
    })

    const { data: listJobs, isSuccess, isLoading, isError, error, refetch } = useJobListQuery({
        page: currentPage,
    });

    useEffect(() => {
        if (isError) {
            console.error("Error fetching jobs:", error);
        }
        if (isSuccess) {
            setJobList((prevJobList) => {
                const newJobs = listJobs.filter((newJob) => {
                    const hasId = newJob && newJob.id;
                    return (
                        hasId &&
                        !prevJobList.some(
                            (prevJob) => prevJob && prevJob.id && prevJob.id === newJob.id
                        )
                    );
                });
                return [...prevJobList, ...newJobs];
            });

        }
    }, [listJobs, isSuccess, isError, error]);

    const loadMoreJobs = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const today = new Date(); // Current date
        if (isToday(date)) {
            return 'Today';
        } else {
            const daysAgo = differenceInDays(today, date);
            if (daysAgo === 1) {
                return '1 day ago';
            } else {
                return daysAgo + ' days ago';
            }
        }
    }

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setSearchParams((prevParams) => ({
            ...prevParams,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const { data: searchResult } = useSearchJobQuery({
        description: searchParams.description,
        location: searchParams.location,
        fullTime: searchParams.fullTime,
    });

    const handleSearch = () => {
        setIsSearch(true);
        setParams({
            description: searchParams.description,
            location: searchParams.location,
            fullTime: searchParams.fullTime,
        });

        if (searchResult) {
            setJobList([])
            setJobList(searchResult);
        }
    };
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar />
            <div className="grow bg-slate-100 mb-4">
                <div className="mt-6 px-1 flex items-end space-x-8">
                    <div className="grow">
                        <InputField
                            icon='oi:clipboard'
                            label='Job Description'
                            name='description'
                            placeholder='Filter by title, benefits, companies, expertise'
                            value={searchParams.description}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="grow">
                        <InputField
                            icon='vaadin:globe'
                            label='Location'
                            name='location'
                            placeholder='Filter by city, state, zip code or country'
                            value={searchParams.location}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="flex-none flex justify-center items-center">
                        <div className="flex items-center space-x-8">
                            <Checkbox
                                name='fullTime'
                                checked={searchParams.fullTime}
                                onChange={handleInputChange}
                                label='Full Time Only' />
                            <button onClick={handleSearch} className="rounded text-white font-semibold px-5 py-2 bg-slate-400">Search</button>
                        </div>
                    </div>
                </div>
                <div className="mt-4 mx-1 p-[6px] bg-gradient-to-b from-neutral-200 to-transparent">
                    <div className="bg-white px-5 py-6">
                        <h1 className="text-neutral-700 font-bold text-3xl mb-5">Job List</h1>
                        {jobList && jobList.map((hasil, i) =>
                            hasil && (
                                <div key={i} className='border-t-[2px] border-t-slate-200 py-2 flex items-center justify-between'>
                                    <div className=''>
                                        <Link to={`/jobDetail/${hasil.id}`}>
                                            <h1 className='font-bold text-lg text-sky-600'>{hasil.title}</h1>
                                        </Link>
                                        <div className='flex items-center space-x-1'>
                                            <h2 className='text-neutral-400'>{hasil.company}</h2>
                                            <span className='text-neutral-400'>-</span>
                                            <h2 className='text-green-600 font-bold'>{hasil.type}</h2>
                                        </div>
                                    </div>
                                    <div className='flex flex-col items-end'>
                                        <h1 className='text-neutral-600'>{hasil.location}</h1>
                                        <h2 className='text-neutral-400'>{formatDate(hasil.created_at)}</h2>
                                    </div>
                                </div>
                            )
                        )}
                        {!isSearch && (
                            !isError ? (
                                <button onClick={loadMoreJobs} className='w-full py-2 text-white font-bold rounded-md bg-blue-500 flex items-center justify-center'>More Jobs</button>
                            ) : (
                                <div className='w-full py-2 text-white font-bold rounded-md bg-slate-300 flex items-center justify-center'>No More Jobs</div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingPage
