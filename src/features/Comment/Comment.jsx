import moment from 'moment';
import ReactMarkdown from 'react-markdown';
import './Comment.css';
import Avatar from '../Avatar/Avatar';

const Comment = (props) => {
    const { comment } = props;

    return (
        <div className='comment-item'>
            <div className='comment-metadata'>
                <Avatar name={comment.author} />
                <p className='comment-author'>{comment.author}</p>
                <p className='comment-timeAgo'>
                    {moment.unix(comment.created_utc).fromNow()}
                </p>
            </div>
            <ReactMarkdown className='comment-body'>{comment.body}</ReactMarkdown>
        </div>
    );
};

export default Comment;