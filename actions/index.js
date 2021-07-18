import useSWR from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());

export const getBlogs = (url) => {
  return fetcher(url);
};

/**
 * Reference : https://www.npmjs.com/package/swr
 * the third parameter of useSWR
 * options: (optional) an object of options for this SWR hook
 * initialData is one of the options
 * initialData: initial data to be returned
 */

export const useGetBlogs = ({ offset, filter }, initialData) => {
  return useSWR(
    `
    /api/blogs?offset=${offset || 0}&date=desc`,
    fetcher,
    { initialData },
  );
};
