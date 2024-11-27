import React, { useEffect } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getCommentsPaginated } from "../../services/comments.services";
import styles from "./PostComments.module.css";
import { CommentList } from "../../types/comment.types";
import CommentCard from "../CommentCard/CommentCard";
import CommentInput from "../CommentInput/CommentInput";

function PostComments({ postId }) {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: ["comments", postId],
      getNextPageParam: (prevData) => prevData.page.nextPage,
      queryFn: ({ pageParam = 1 }) =>
        getCommentsPaginated(postId, pageParam, 10),
    });

  let scrollFooterElement = <p>Nothing More to Load</p>;
  if (isFetchingNextPage || isLoading) {
    scrollFooterElement = <p>Loading...</p>;
  }
  useEffect(() => {
    let fetching = false;
    const onScroll = async (event) => {
      if (!event.target) return;

      const target = event.target;
      const scrollElement = target.scrollingElement;
      if (!scrollElement) return;
      const { scrollHeight, scrollTop, clientHeight } = scrollElement;
      const scrollHeightRemaining = scrollHeight - scrollTop;

      if (!fetching && scrollHeightRemaining <= clientHeight * 1.5) {
        fetching = true;
        if (hasNextPage) await fetchNextPage();
        fetching = false;
      }
    };

    document.addEventListener("scroll", onScroll);

    return () => document.removeEventListener("scroll", onScroll);
  }, [fetchNextPage, hasNextPage]);

  return (
    <>
      <CommentInput postId={postId} />
      <div className={styles.commentList}>
        <ul>
          {data?.pages
            .flatMap((page) => page.data)
            .map((comment) => (
              <li key={comment._id}>
                <CommentCard postId={postId} comment={comment} />
              </li>
            ))}
        </ul>
        <div className={styles.scrollFooter}>{scrollFooterElement}</div>
      </div>
    </>
  );
}

export default PostComments;
