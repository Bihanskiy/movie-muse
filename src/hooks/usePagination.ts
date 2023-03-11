import React, { useEffect } from "react";

import { useRouter } from "next/router";


export const usePagination = () => {
  const router = useRouter();
  const page = router.query?.page;

  const initialPaginationRequest = async ({ request }: { request: (...args: any) => Promise<any> }) => {
    const response = await request();

    if (page) {
      router.push(
        {
          query: {}
        },
        undefined,
        { shallow: true }
      );
    }

    return response;
  }

  const paginationRequest = async ({ request, page }: { request: (...args: any) => Promise<any>, page: number | string }) => {
    router.push(
      {
        query: +page === 1 ? {} : {
          page,
        }
      },
      undefined,
      { shallow: true }
    );

    const response = await request();
    return response;
  }

  return {
    initialPaginationRequest,
    paginationRequest,
  }
}