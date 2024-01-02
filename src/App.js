import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts, selectPosts, selectStatus, selectError } from './redux/postSlice';
import PostDetail from '../src/postDetail';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <Router>
      <div>
        <input
          type="text"
          placeholder="Filter by title"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        {status === 'loading' && <p>Loading ...</p>}
        {status === 'failed' && <p>Error Loading Posts: {error}</p>}
        {status === 'succeeded' && filteredPosts.length > 0 ? (
          <ul>
            {filteredPosts.map((post) => (
              <li key={post.id}>
                <Link to={`/post/${post.id}`}>{post.title}</Link>
              </li>
            ))}
          </ul>
        ) : (
          <p>No matching posts found.</p>
        )}

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post/:postId" element={<PostDetail />} />
        </Routes>
      </div>
    </Router>
  );
};

const Home = () => {
  return <p>Welcome to the home page!</p>;
};

export default App;
