import React, { useEffect } from 'react'
import { Icon } from '@iconify/react';
import { useJobDetailQuery } from '../services/api';
import Navbar from "../components/Navbar"
import { Link, useParams } from 'react-router-dom';
import './custom.css'

const JobDetailPage = () => {
    const { id } = useParams();
    const { data: job, isSuccess, isLoading, isError, error, refetch } = useJobDetailQuery(id);

    useEffect(() => {
        if (isError) {
            console.error("Error fetching job:", error);
        }
    }, [job, isSuccess, isError, error]);
    if (job) {
        return (
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <div className="grow bg-slate-100 mb-4">
                    <Link to="/">
                        <div className='mt-6 px-1 flex items-center'>
                            <i className='mr-1'>
                                <Icon icon="foundation:arrow-up" width='20' height='20' className='text-neutral-300' rotate={3} />
                            </i>
                            <h1 className='font-bold text-lg text-blue-500'>Back</h1>
                        </div>
                    </Link>
                    <div className="mt-4 mx-1 p-[6px] bg-gradient-to-b from-neutral-200 to-transparent">
                        <div className="bg-white px-5 py-6">
                            <h2 className='text-neutral-500'>{job.type} / {job.location}</h2>
                            <h1 className="text-neutral-700 font-bold text-3xl mb-5">{job.title}</h1>
                            <div className='border-t-[2px] border-t-slate-200 py-3 flex items-start justify-between'>
                                <div className='grow custom-description' dangerouslySetInnerHTML={{ __html: job.description }}>
                                </div>
                                <div className='min-w-[360px]'>
                                    <div className='rounded bg-neutral-200 p-[6px]'>
                                        <div className='bg-white rounded border border-slate-300'>
                                            <div className='border-b border-b-slate-300 px-2 py-1 flex items-start justify-between'>
                                                <span className='font-bold text-neutral-800'>{job.company}</span>
                                                <div className='p-1 bg-neutral-200 rounded text-sm font-bold text-sky-600 min-w-[81px]'>1 other job</div>
                                            </div>
                                            <div className='p-2'>
                                                <div className='w-full h-[160px] bg-slate-100'>
                                                    {
                                                        job.company_logo && (
                                                            <img src={job.company_logo} alt='' className='w-full h-full' />
                                                        )
                                                    }
                                                </div>
                                                <h2 className='mt-2 text-sky-700 underline'><Link to={job.company_url}>{job.company_url}</Link></h2>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rounded bg-neutral-200 p-[6px] mt-2 relative'>
                                        <div className='top-0 left-0 absolute bg-yellow-200 w-full h-full z-10 bg-opacity-20' style={{ pointerEvents: 'none' }}></div>
                                        <div className='bg-white rounded border border-slate-300 relative'>
                                            <div className='border-b border-b-slate-300 px-2 py-1'>
                                                <span className='font-bold text-neutral-800'>How to apply</span>
                                            </div>
                                            <div className='px-2 py-4 custom-it overflow-hidden' dangerouslySetInnerHTML={{ __html: job.how_to_apply }}>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            'not found'
        )
    }
}

export default JobDetailPage