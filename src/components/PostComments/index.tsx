import { FormEvent, useState } from 'react';
import styles from './PostComments.module.css';

import Comment from '../../models/Comment';

const Post = () => {
    const [comments, setComments] = useState<Comment[]>([]);
    const [tempComment, setTempComment] = useState<string>('');

    function handleAddComment(event: { preventDefault: () => void; }) {
        event.preventDefault();
        const trimmedComment = tempComment.trim();

        if (trimmedComment) {
            const newComment = new Comment(comments.length, trimmedComment);
            setTempComment('');
            setComments([...comments, newComment]);
        }
    }

    return (
        <div>
            <ul className={styles['post-comments']} data-testid="comments-list">
                {comments.length === 0 ? (
                    <p data-testid="no-comments-message">Nenhum comentário ainda.</p>
                ) : (
                    comments.map(({ comment, id }) => (
                        <li className={styles['post-comment']} key={id} data-testid={`comment-item-${id}`}>
                            <p className={styles['post-comment-content']}>
                                {comment}
                            </p>
                        </li>
                    ))
                )}
            </ul>
            <form onSubmit={handleAddComment} className={styles['post-comments-form']}>
                <textarea
                    value={tempComment}
                    onChange={e => setTempComment(e.target.value)}
                    required
                    className={styles['post-comments-form-textarea']}
                    data-testid="comment-textarea"
                />
                <button
                    type="submit"
                    className={styles['post-comments-form-button']}
                    data-testid="submit-comment-button"
                >
                    Comentar
                </button>
            </form>
        </div>
    );
}

export default Post;