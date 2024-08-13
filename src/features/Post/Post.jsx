import React, { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import './Post.css';
import { FaChevronUp, FaChevronDown, FaComment } from "react-icons/fa";
import { FaChevronCircleUp, FaChevronCircleDown } from "react-icons/fa";
import moment from 'moment';
import shortenNumber from '../../utility/shortenNumber';
import Card from '../../components/Card/Card';

const Post = (props) => {
  const [voteValue, setVoteValue] = useState(0);

  const { post, onToggleComments } = props;

  /**
   * @param {number} newValue The new vote value
   */
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
      return <FaChevronCircleUp className="icon-action up-clicked" />;
    }
    return <FaChevronUp className="icon-action up-hover" />;
  };

  const renderDownVote = () => {
    if (voteValue === -1) {
      return <FaChevronCircleDown className="icon-action down-clicked" />;
    }
    return <FaChevronDown className="icon-action down-hover" />;
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

  return (
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
              className={`icon-action-button up-vote ${
                voteValue === 1 && 'active'
              }`}
              onClick={() => onHandleVote(1)}
              aria-label="Up vote"
            >
              {renderUpVote()}
            </button>
            <p className={`post-votes-value ${getVoteType()}`}>
            {shortenNumber(post.ups, 1)}
            </p> 
            <button
              type="button"
              className={`icon-action-button down-vote ${
                voteValue === -1 && 'active'
              }`}
              onClick={() => onHandleVote(-1)}
              aria-label="Down vote"
            >
              {renderDownVote()}
            </button>
          </div>
          <div className='comment'>
            <button className='icon-action-button comment'>
              <FaComment alt='Comments' className='icon-action action-comment' />
            </button>
          </div>
        </div>
      </Card>
    </article>
  );
};

export default Post;