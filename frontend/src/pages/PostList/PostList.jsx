import React, { useEffect ,useState} from "react";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import { postTypes } from "../../assets/data/post.data";
import postListPageImage from "../../assets/images/pages/post-list.png";
import PostListElement from "../../components/PostListElement/PostListElement";
import PostSkeleton from "../../components/PostSkeleton/PostSkeleton";
import { BACKEND_API_URL } from "../../services/serverConfig";
import {
  getCompanyAndRoleList,
  getPostsPaginated,
} from "../../services/post.services";
// import { PostPaginated } from "../../types/post.types";
import styles from "./PostList.module.css";
import axios from "axios";

function PostList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [post, setPost] = useState([]);
  // localStorage.setItem("accessToken", accessToken);
  const authToken = localStorage.getItem("accessToken")
  const getPost = async () => {
    const url = `${BACKEND_API_URL}/posts/`;
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json', // Optional, in case you need to set the content type
          'Authorization': `Bearer ${authToken}`, // Include Bearer token in the Authorization header
          'Accept': 'application/json',
        },
        withCredentials: true, // Ensure cookies or credentials are sent
      });
      return response.data
  };

  useEffect(() => {
    // The URL of the API you're calling
    // console.log(getPost())
    const fetchPost = async () => {
      try {
        const postData = await getPost(); // Get post data using getPost
       console.log(postData)
       setPost(postData)
      } catch (err) {
        
        
      }
    };

    fetchPost();
    // Fetch the data with authentication token    
    }, []); // If authToken changes, re-run the effect
 
  // value to pass in the react query function
  const filter = {
    search: searchParams.get("search") || "",
    sortBy: searchParams.get("sortBy") || "",
    articleType: searchParams.get("articleType") || "",
    jobRole: searchParams.get("jobRole") || "",
    company: searchParams.get("company") || "",
    rating: searchParams.get("rating") || "",
  };

  // Fetching in Position and Companies
  const companyAndRoleQuery = useQuery({
    queryKey: ["company-role-list"],
    queryFn: () => getCompanyAndRoleList(),
  });

  // prettier-ignore
  const {
    data,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['posts', filter],
    getNextPageParam: (prevData) => prevData.page?.nextPage,
    queryFn: ({ pageParam = 1, signal }) => getPostsPaginated(pageParam, 10, filter, signal),
  });

  let scrollFooterElement = <p>Nothing More to Load</p>;
  if (isFetchingNextPage || isLoading) {
    const skeletonPost = [];
    for (let i = 0; i < 5; i += 1) {
      skeletonPost.push(i);
    }
    scrollFooterElement = (
      <div>
        {skeletonPost.map((i) => (
          <PostSkeleton key={i} />
        ))}
      </div>
    );
  }

  useEffect(() => {
    let fetching = false;
    // console.log(data)
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
      <Helmet>
        <title>Posts | Active Drives</title>
      </Helmet>

      <div className={styles.PostList}>
        <section className={styles.posts} id="recentPosts">
          <div className="container">
            <h2>
              <span>Recent Experiences</span>
            </h2>

            {/* <div className={styles.filter}>
              <div className={styles.searchBar}>
                <input
                  type="text"
                  placeholder="Search..."
                  value={filter.search}
                  onChange={(e) => {
                    setSearchParams({
                      ...Object.fromEntries(
                        Object.entries(filter).filter(
                          ([key, value]) => key && value && value.length > 0
                        )
                      ),
                      search: e.target.value,
                    });
                  }}
                  className={styles.searchBarInput}
                />
              </div>

              <div className={styles.filtersContainer}>
                <div className={styles.filterInput}>
                  <label htmlFor="domain">
                    <select
                      name="domain"
                      className={styles.inputField}
                      value={filter.sortBy}
                      onChange={(e) => {
                        setSearchParams({
                          ...Object.fromEntries(
                            Object.entries(filter).filter(
                              ([key, value]) => key && value && value.length > 0
                            )
                          ),
                          sortBy: e.target.value,
                        });
                      }}
                    >
                      <option value="">Sort By</option>
                      <option value="new">Newest</option>
                      <option value="old">Oldest</option>
                      <option value="views">Most Viewed</option>
                    </select>
                  </label>
                </div>

                <div className={styles.filterInput}>
                  <label htmlFor="type">
                    <select
                      name="type"
                      className={styles.inputField}
                      value={filter.articleType}
                      onChange={(e) => {
                        setSearchParams({
                          ...Object.fromEntries(
                            Object.entries(filter).filter(
                              ([key, value]) => key && value && value.length > 0
                            )
                          ),
                          articleType: e.target.value,
                        });
                      }}
                    >
                      <option value="">Post Type</option>
                      <option value="">All</option>
                      {postTypes.map((type) => (
                        <option value={type} key={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </label>
                </div> 

                 <div className={styles.filterInput}>
                  <label htmlFor="role">
                    <select
                      name="role"
                      className={styles.inputField}
                      value={filter.jobRole}
                      onChange={(e) => {
                        setSearchParams({
                          ...Object.fromEntries(
                            Object.entries(filter).filter(
                              ([key, value]) => key && value && value.length > 0
                            )
                          ),
                          jobRole: e.target.value,
                        });
                      }}
                    >
                      <option value="">Job Role</option>
                      <option value="">All</option>
                      {companyAndRoleQuery.data?.data?.role.map((role) => (
                        <option value={role} key={role}>
                          {role}
                        </option>
                      ))}
                    </select>
                  </label>
                </div> 

                 <div className={styles.filterInput}>
                  <label htmlFor="company">
                    <select
                      name="company"
                      className={styles.inputField}
                      value={filter.company}
                      onChange={(e) => {
                        setSearchParams({
                          ...Object.fromEntries(
                            Object.entries(filter).filter(
                              ([key, value]) => key && value && value.length > 0
                            )
                          ),
                          company: e.target.value,
                        });
                      }}
                    >
                      <option value="">Company</option>
                      <option value="">All</option>
                      {companyAndRoleQuery.data?.data?.company.map((company) => (
                        <option value={company} key={company}>
                          {company}
                        </option>
                      ))}
                    </select>
                  </label>
                </div> 

                <div className={styles.filterInput}>
                  <label htmlFor="rating">
                    <select
                      name="rating"
                      className={styles.inputField}
                      value={filter.rating}
                      onChange={(e) => {
                        setSearchParams({
                          ...Object.fromEntries(
                            Object.entries(filter).filter(
                              ([key, value]) => key && value && value.length > 0
                            )
                          ),
                          rating: e.target.value,
                        });
                      }}
                    >
                      <option value="">Rating</option>
                      <option value="">Any</option>
                      <option value="1">1 Star</option>
                      <option value="2">2 Star</option>
                      <option value="3">3 Star</option>
                      <option value="4">4 Star</option>
                      <option value="5">5 Star</option>
                    </select>
                  </label>
                </div>
              </div>
            </div> */}

            <div className={styles.postList}>
              {post?.map((post) =>
                  <PostListElement post={post} key={post._id} />
                )}
            </div>
            {/* <div className={styles.scrollFooter}>{scrollFooterElement}</div> */}
          </div>
        </section>
      </div>
    </>
  );
}

export default PostList;
