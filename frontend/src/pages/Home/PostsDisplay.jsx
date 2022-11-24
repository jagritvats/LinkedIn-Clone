import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../features/post/postSlice';
import PostCard from './PostCard';

const PostsDisplay = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(getPosts());
	}, []);
	const posts = useSelector((state) => state.post);
	const user = useSelector((state) => state.auth.user.user);
	console.log(posts);
	if (!posts) {
		return <>No Posts</>;
	}
	return (
		<div className="posts__container">
			{posts.isLoading ? (
				'Loading'
			) : (
				<>
					<>
						{posts.posts.map((post) => {
							return <PostCard post={post} key={post._id} />;
						})}
					</>
				</>
			)}
		</div>
	);
};

export default PostsDisplay;
