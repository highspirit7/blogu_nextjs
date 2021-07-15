import { useSWRInfinite } from "swr";
import { getBlogs } from "actions";

export const useGetBlogsPages = ({ filter }) => {
  const PAGE_LIMIT = 3;

  const { data, error, size, setSize } = useSWRInfinite(
    (index, previousPageData) => {
      // console.log(`offset : ${offset}`);
      if (index === 0) {
        return `/api/blogs?offset=${index}&date=${
          filter.date.asc ? "asc" : "desc"
        }`;
      }

      if (!previousPageData.length) {
        return null;
      }

      return `/api/blogs?offset=${index * PAGE_LIMIT}&date=${
        filter.date.asc ? "asc" : "desc"
      }`;
    },
    getBlogs,
    { persistSize: true },
  );

  const posts = data ? [].concat(...data) : [];
  const isLoadingInitialData = !data && !error;
  const isLoadingMore =
    isLoadingInitialData ||
    (size > 0 && data && typeof data[size - 1] === "undefined");
  const isEmpty = data?.[0]?.length === 0;
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_LIMIT);

  return { posts, error, isLoadingMore, size, setSize, isReachingEnd };
};
