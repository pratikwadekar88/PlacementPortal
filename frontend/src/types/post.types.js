export const Post = {
  title: '',
  content: '',
  summary: '',
  company: '',
  role: '',
  postType: '',
  domain: '',
  rating: 0,
  createdAt: '',
  voteCount: 0,
  bookmarkCount: 0,
  views: 0,
  tags: [],
  postAuthorId: '',
  commentCount: 0,
  isBookmarked: false,
  postAuthor: '',
  isDownVoted: false,
  isUpVoted: false,
};

export const PostCard = {
  _id: '',
  title: '',
  content: '',
  summary: '',
  userId: {
    _id: '',
    username: '',
  },
  company: '',
  role: '',
  postType: '',
  domain: '',
  rating: 0,
  status: '',
  createdAt: '',
  votes: 0,
  isUpVoted: false,
  isDownVoted: false,
  isBookmarked: false,
  views: 0,
  tags: [],
};

export const PostCardList = [];

export const PostFormData = {
  title: '',
  role: '',
  company: '',
  domain: '',
  postType: '',
  content: '',
  tags: '',
  rating: 0,
};

export const PostEditFormData = {
  title: '',
  role: '',
  company: '',
  domain: '',
  postType: '',
  content: '',
  summary: '',
  tags: '',
  rating: 0,
};

export const PostPaginated = {
  message: '',
  data: [],
  page: { nextPage: undefined, previousPage: undefined },
};

export const RelatedPost = {
  _id: '',
  title: '',
};
