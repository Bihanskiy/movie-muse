import React, { useEffect } from 'react';
import Pagination from '@mui/material/Pagination';
import { useRouter } from "next/router";

interface IPaginationProps {
  count: number;
  onChange: (e: React.ChangeEvent<unknown>, page: number) => void;
}


const AppPagination = ({
  count,
  onChange,
}: IPaginationProps): React.ReactElement => {
  
  const router = useRouter();
  const page = parseInt(router.query?.page as string || "1", 10);

  return (
    <Pagination
      count={count}
      variant='outlined'
      color='secondary'
      className='pagination'
      page={page}
      onChange={onChange}
    />
  );
};

export default AppPagination;