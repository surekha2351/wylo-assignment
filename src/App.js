import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostsDisplay from './components/PostsDisplay';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  const handleSavePost = (newPost) => {
    setPosts((prevPosts) => [...prevPosts, newPost]);
  };

  const handleEditPost = (updatedPost) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) => (post.id === updatedPost.id ? updatedPost : post))
    );
    setEditingPost(null);
  };

  const handleDeletePost = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
  };

  const startEditingPost = (post) => {
    setEditingPost(post);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <PostsDisplay
              posts={posts}
              onEdit={startEditingPost}
              onDelete={handleDeletePost}
            />
          }
        />
        <Route
          path="/create"
          element={<CreatePost onSave={handleSavePost} />}
        />
        <Route
          path="/edit/:id"
          element={
            <EditPost
              post={editingPost}
              onSave={handleEditPost}
            />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
