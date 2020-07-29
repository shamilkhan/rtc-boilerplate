import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { AppStore } from '../index';

type SliceName = 'auth';

type Props = {
    sliceName: SliceName
};

const useData = (sliceName: SliceName) => {
    const { 
        data, 
        retry, 
        expecting, 
    } = useSelector((store: AppStore) => store[sliceName]);

    useEffect(() => {
        console.log('just use as mounted');   
    }, []);

    return {data};
};


export {
    useData
};