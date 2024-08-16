import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import './Post.css';
import { FaChevronUp, FaChevronDown, FaComment } from "react-icons/fa";
import { FaChevronCircleUp, FaChevronCircleDown, FaRegWindowClose } from "react-icons/fa";
import moment from 'moment';
import shortenNumber from '../../utility/shortenNumber';
import Card from '../../components/Card/Card';
import Comment from '../Comment/Comment';
import Avatar from '../Avatar/Avatar';

const Post = (props) => {
  const [voteValue, setVoteValue] = useState(0);
  const [commentsVisible, setCommentsVisible] = useState(false);

  const { post, onToggleComments } = props;

  const onHandleVote = (newValue) => {
    if (newValue === voteValue) {
      setVoteValue(0);
    } else if (newValue === 1) {
      setVoteValue(1);
    } else {
      setVoteValue(-1);
    }
  };

  const renderUpVote = () => {
    if (voteValue === 1) {
      return <FaChevronCircleUp className="up-clicked" />;
    }
    return <FaChevronUp className="up-vote" />;
  };

  const renderDownVote = () => {
    if (voteValue === -1) {
      return <FaChevronCircleDown className="down-clicked" />;
    }
    return <FaChevronDown className="down-vote" />;
  };

  const getVoteType = () => {
    if (voteValue === 1) {
      return 'up-vote';
    }
    if (voteValue === -1) {
      return 'down-vote';
    }
    return '';
  };

  const renderComments = () => {
    if (post.errorComments) {
      return (
        <div className='error-message'>
          <h3>Error loading comments</h3>
        </div>
      );
    }

    if (post.loadingComments) {
      return (
        <div>
          <Skeleton />
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      );
    }

    if (post.comments) {
      return (
        <div className='comment-container'>
          {post.comments.map((comment) => (
            <Comment comment={comment} key={comment.id} />
          ))}
        </div>
      );
    }

    return null;
  };

  const toggleCommentsVisibility = () => {
    setCommentsVisible(!commentsVisible);
    onToggleComments(post.permalink);
  };

  const closeComments = () => {
    setCommentsVisible(false);
    document.body.classList.remove('comments-visible');
  };

  return (
    <>
      <div className={commentsVisible ? 'overlay' : ''}></div>
      
      <article key={post.id}>
        <Card className='card'>
          <div className='post-header'>
            <div className='header-info'>
              <div className='info-details'>
                <p className='author'>{post.author}</p>
                <p className='subreddit'>r/{post.subreddit}</p>
              </div>
              <p className='timeAgo'>{moment.unix(post.created_utc).fromNow()}</p>
              <h3 className='title'>{post.title}</h3>
            </div>
          </div>
          <div className='content'>
            <img src={post.url} alt='' className='post-image' />
          </div>
          <div className='footer'>
            <div className='voting'>
              <button
                type="button"
                className={`up-vote-button ${
                  voteValue === 1 && 'active'
                }`}
                onClick={() => onHandleVote(1)}
                aria-label="Up vote"
              >
                {renderUpVote()}
              </button>
              <p className={`votes-value ${getVoteType()}`}>
              {shortenNumber(post.ups, 1)}
              </p> 
              <button
                type="button"
                className={`down-vote-button ${
                  voteValue === -1 && 'active'
                }`}
                onClick={() => onHandleVote(-1)}
                aria-label="Down vote"
              >
                {renderDownVote()}
              </button>
            </div>
            <div className='comment'>
              <button 
                type='button'
                className={`comment-button ${
                  commentsVisible && 'showing-comments'
                }`}
                onClick={toggleCommentsVisibility}
                aria-label='Show comments'
              >
                <FaComment alt='Comments' className='comment-icon' />
                {shortenNumber(post.num_comments, 1)}
              </button>
            </div>
          </div>
        </Card>
      </article>

      {commentsVisible && (
        <Card className='comment-card'>
          <button className='close-button' onClick={closeComments}>
            <FaRegWindowClose className='window-close'/>
          </button>
          <div className='post-header'>
            <div className='comment-header-info'>
              <div className='info-details'>
                <p className='author'>{post.author}</p>
                <p className='subreddit'>r/{post.subreddit}</p>
              </div>
              <p className='timeAgo'>{moment.unix(post.created_utc).fromNow()}</p>
              <h3 className='title'>{post.title}</h3>
            </div>
          </div>
          <div className='comment-content'>
            <img src={post.url} alt='' className='post-image' />
          </div>
          <div className='comments-section'>
            {renderComments()}
          </div>
        </Card>
      )}
    </>
  );
};

export default Post;
