import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import LandingPage from '../components/LandingPage';
import ProfilePage from '../components/Profile/Profile';
import CreatePostForm from '../components/Posts/CreatePostForm/CreatePostForm';
import EditPostForm from '../components/Posts/EditPostForm';
import PostDetails from '../components/Posts/PostDetails';
import AllPosts from '../components/Posts/AllPosts';
import AllLearners from '../components/Explore';
import Inbox from '../components/Inbox/Inbox';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "explore",
        element: <AllLearners />
      },
      {
        path: "posts",
        element: <AllPosts />
      },
      {
        path: "inbox",
        element: <Inbox />
      },
      {
        path: "profile",
        element:<ProfilePage />
      },
      {
        path: "profile/friends",
        element:<ProfilePage profileState={'friends'} />
      },
      {
        path: "profile/posts",
        element:<ProfilePage profileState={'posts'} />
      },
      {
        path: "posts/new",
        element:<CreatePostForm />
      },
      {
        path: "posts/:postId",
        element:<PostDetails />
      },
      {
        path: "posts/:postId/edit",
        element:<EditPostForm />
      },
    ],
  },
]);