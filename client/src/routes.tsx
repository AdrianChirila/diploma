import { Route, Navigate } from "react-router-dom";
import { PostsList } from "./pages/Posts";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { CreatePost } from "./pages/CreatePost";
import { ViewPost } from "./pages/ViewPost";
import { EditPost } from "./pages/EditPost";
import { Playground } from "./pages/Playground";
import { UserType } from "./types";

export type Props =
  | {
      isAuthenticated: true;
      userType: UserType;
    }
  | { isAuthenticated: false };

export const useRoutes = (props: Props) => {
  if (props.isAuthenticated) {
    switch (props.userType) {
      case UserType.Admin: {
        return (
          <>
            <Route path="/posts/create" element={<CreatePost />} />
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:id" element={<ViewPost />} />
            <Route path="/posts/edit/:id" element={<EditPost />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="*" element={<Navigate to="/posts" />} />
          </>
        );
      }
      case UserType.Student: {
        return (
          <>
            <Route path="/posts" element={<PostsList />} />
            <Route path="/posts/:id" element={<ViewPost />} />
            <Route path="/playground" element={<Playground />} />
            <Route path="*" element={<Navigate to="/posts" />} />
          </>
        );
      }
    }
  }

  return (
    <>
      <Route path="/sign-in" element={<SignIn />} />
      <Route path="/sign-up" element={<SignUp />} />

      <Route path="*" element={<Navigate to="/sign-in" />} />
    </>
  );
};
