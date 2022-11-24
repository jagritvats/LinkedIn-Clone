import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authService } from '../../features/auth/authService';
import {
	deletePost,
	editPost,
	likePost,
	unlikePost,
} from '../../features/post/postSlice';
import { MdDelete, MdDoneAll } from 'react-icons/md';
import { BiLike } from 'react-icons/bi';
import { CiEdit } from 'react-icons/ci';
import DefPic from '../../media/images/defpic.jpg';
import './PostCard.css';

const PostCard = ({ post }) => {
	const user = useSelector((state) => state.auth.user.user);
	const [author, setAuthor] = useState('');
	const dispatch = useDispatch();
	const getUser = authService.getUser;
	const [posttext, setPosttext] = useState(post.textContent);
	useEffect(() => {
		(async () => {
			const userdata = await getUser(post.author);
			// console.log('ud', userdata);
			setAuthor(userdata.user);
		})();
	}, []);

	const deleteThisPost = () => {
		console.log('deleting');
		dispatch(deletePost(post._id));
	};

	const submitEdit = () => {
		if (posttext == '') {
			return alert('Enter post text');
		}
		const editedpost = {
			postId: post._id,
			userId: post.author,
			textContent: posttext,
		};
		dispatch(editPost(editedpost));
		setEditmode((prev) => !prev);
	};

	const [editmode, setEditmode] = useState(false);
	// console.log('a', author);
	return (
		<div className="post">
			<div className="profileSummary">
				<div className="profile__img">
					<img src={DefPic} alt={`${user.username}`} />
				</div>

				<div className="post_profile_sum">
					<h3>{author?.fname}</h3>
					<p>0 followers </p>
					<p>{new Date(post.createdAt).toUTCString()}</p>
				</div>
			</div>
			<div className="post__content__txt">
				{editmode ? (
					<>
						<input
							type="text"
							value={posttext}
							onChange={(e) => {
								setPosttext(e.target.value);
							}}
						/>
						<button
							onClick={() => {
								submitEdit();
							}}
						>
							<MdDoneAll />
						</button>
					</>
				) : (
					<>
						<p>{post.textContent}</p>
						{user._id == post.author ? (
							<button
								onClick={() => {
									setEditmode((prev) => !prev);
								}}
							>
								<CiEdit />
							</button>
						) : (
							''
						)}
					</>
				)}{' '}
			</div>

			<div className="post__actions">
				<button
					className="likeBtn"
					onClick={() => {
						console.log(post.likes, user._id);

						if (post.likes.includes(String(user._id))) {
							console.log('unlike');
							dispatch(unlikePost(post._id, user._id));
						} else if (post.likes) {
							console.log('like');
							dispatch(
								likePost({
									postId: post._id,
									userId: user._id,
								})
							);
						} else {
							//tmp
						}
					}}
				>
					<BiLike />{' '}
					{post.likes.includes(String(user._id)) ? 'Liked' : 'Like'}{' '}
					{post.likes.length}
				</button>
				{user._id == post.author ? (
					<button
						onClick={() => {
							deleteThisPost();
						}}
						className="deleteBtn"
					>
						<MdDelete /> Delete
					</button>
				) : (
					''
				)}
			</div>
		</div>
	);
};

export default PostCard;
