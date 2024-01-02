import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostById, selectStatus, selectError, selectSelectedPost } from '../src/redux/postSlice';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const status = useSelector(selectStatus);
  const error = useSelector(selectError);
  const selectedPost = useSelector(selectSelectedPost);

  useEffect(() => {
    dispatch(fetchPostById(postId));
  }, [dispatch, postId]);

  return (
    <div>
      {status === 'loading' && <p>Loading ...</p>}
      {status === 'failed' && <p>Error Loading Post: {error}</p>}
      {status === 'succeeded' && selectedPost ? (
        <div>
          <h2>{selectedPost.title}</h2>
          <p>{selectedPost.body}</p>
        </div>
      ) : (
        <p>Post not found.</p>
      )}
    </div>
  );
};

export default PostDetail;
