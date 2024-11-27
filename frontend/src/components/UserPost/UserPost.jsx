import React, { useEffect, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserPostPaginated } from "../../services/post.services";
import { PostPaginated } from "../../types/post.types";
import PostListElement from "../PostListElement/PostListElement";
import PostSkeleton from "../PostSkeleton/PostSkeleton";
import styles from "./UserPost.module.css";
import { BACKEND_API_URL } from "../../services/serverConfig";
import axios from "axios";
function UserPost() {
  const { id } = useParams();
  const [post, setPost] = useState([]);

  const authToken = localStorage.getItem("accessToken");
  const getPost = async () => {
    const url = `http://127.0.0.1:8000/posts/user/all/${id}/`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json", // Optional, in case you need to set the content type
        Authorization: `Bearer ${authToken}`, // Include Bearer token in the Authorization header
        Accept: "application/json"
      },
      withCredentials: true // Ensure cookies or credentials are sent
    });
    return response.data;
  };

  useEffect(() => {
    // The URL of the API you're calling
    // console.log(getPost())
    const fetchPost = async () => {
      try {
        const postData = await getPost(); // Get post data using getPost
        console.log(postData);
        setPost(postData);
      } catch (err) {}
    };

    fetchPost();
    // Fetch the data with authentication token
  }, []); // If authToken changes, re-run the effect

  // // prettier-ignore
  // const {
  //   data,
  //   isLoading,
  //   hasNextPage,
  //   fetchNextPage,
  //   isFetchingNextPage,
  // } = useInfiniteQuery({
  //   queryKey: ['user-post', id],
  //   getNextPageParam: (prevData) => prevData.page.nextPage,
  //   queryFn: ({ pageParam = 1 }) => getUserPostPaginated(id, pageParam, 10),
  // });

  // let scrollFooterElement = <p>Nothing More to Load</p>;
  // if (isFetchingNextPage || isLoading) {
  //   const skeletonPost = [];
  //   for (let i = 0; i < 5; i += 1) {
  //     skeletonPost.push(i);
  //   }
  //   scrollFooterElement = (
  //     <div>
  //       {skeletonPost.map((i) => (
  //         <PostSkeleton key={i} />
  //       ))}
  //     </div>
  //   );
  // }

  // useEffect(() => {
  //   let fetching = false;
  //   const onScroll = async (event) => {
  //     if (!event.target) return;

  //     const target = event.target;
  //     const scrollElement = target.scrollingElement;
  //     if (!scrollElement) return;
  //     const { scrollHeight, scrollTop, clientHeight } = scrollElement;
  //     const scrollHeightRemaining = scrollHeight - scrollTop;

  //     if (!fetching && scrollHeightRemaining <= clientHeight * 1.5) {
  //       fetching = true;
  //       if (hasNextPage) await fetchNextPage();
  //       fetching = false;
  //     }
  //   };

  //   // console.log(document.addEventListener('scroll', onScroll));
  //   document.addEventListener("scroll", onScroll);

  //   return () => document.removeEventListener("scroll", onScroll);
  // }, [fetchNextPage, hasNextPage]);

  const isEmpty = post;
  return (
    <div className={styles.UserPost}>
      {post?.length==0 ? <p>No User Post</p> : null}
      {post?.length>0 ? (
        <>
          {post?.map((post) => (
            <PostListElement post={post} key={post.id} />
          ))}
          {/* <div className={styles.scrollFooter}>{scrollFooterElement}</div> */}
        </>
      ) : null}
    </div>
  );
}

export default UserPost;
