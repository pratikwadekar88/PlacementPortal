export const User = {
  username: "",
  about: "",
  password: "",
  isAdmin: false,
  email: "",
  designation: "",
  branch: "",
  passingYear: 0,
  github: null,
  leetcode: null,
  linkedin: null,
};

export const UserStateData = {
  userId: "",
  username: "",
  about: "",
  email: "",
  isAdmin: false,
  designation: "",
  branch: "",
  passingYear: 0,
  github: null,
  leetcode: null,
  linkedin: null,
};

export const UserReduxState = {
  isLoading: false,
  isLoggedIn: false,
  user: null,
};

export const ProfileStats = {
  username: "",
  email: "",
  branch: "",
  passingYear: "",
  designation: "",
  about: "",
  github: "",
  leetcode: "",
  linkedin: "",
  postData: [
    {
      viewCount: 0,
      postCount: 0,
      upVoteCount: 0,
      downVoteCount: 0,
    },
  ],
};

export const UserUpdate = {
  username: "",
  about: "",
  designation: "",
  branch: "",
  passingYear: 0,
  github: null,
  leetcode: null,
  linkedin: null,
};
