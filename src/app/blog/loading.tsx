import React from 'react';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

interface loadingTypes {
    count: number
}

export default function Loading({count}:loadingTypes){
    return (
        <Skeleton count={count}></Skeleton>
    )
}