import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addPost } from '../../features/post/postSlice';

import { MdInsertPhoto, MdVideocam, MdEventNote } from 'react-icons/md';
import { TfiWrite } from 'react-icons/tfi';

import DefPic from '../../media/images/defpic.jpg';
import './AddPost.css';

const AddPost = () => {
	const user = useSelector((state) => state.auth.user.user);
	const [postcontent, setPostcontent] = useState('');
	const dispatch = useDispatch();
	const submitPost = (e) => {
		e.preventDefault();

		if (postcontent == '') {
			return alert('Enter a post');
		}

		console.log('textcontet of post', postcontent);

		const post = {
			author: user._id,
			textContent: postcontent,
			likes: [],
			comments: [],
			mediaContentURL: '',
		};
		console.log('sending post ', post);
		dispatch(addPost(post));
		setPostcontent('');
		console.log('post submitted');
	};
	return (
		<form className="add__post" onSubmit={(e) => submitPost(e)}>
			<div className="main__content">
				<div className="profile__img">
					<img src={DefPic} alt={`${user.username}`} />
				</div>
				<textarea
					name="postcontent"
					id="postcontent"
					cols="50"
					rows="2"
					style={{ maxWidth: '100%' }}
					value={postcontent}
					onChange={(e) => {
						console.log(e);
						setPostcontent(e.target.value);
					}}
				></textarea>
				<button className="postBtn btn" type="submit">
					Post
				</button>
			</div>
			<ul className="multimedia__selector">
				<li>
					<img src="" alt="" />
					<span>
						<MdInsertPhoto /> Photo
					</span>
				</li>
				<li>
					<img src="" alt="" />
					<span>
						<MdVideocam /> Video
					</span>
				</li>
				<li>
					<img src="" alt="" />
					<span>
						<MdEventNote />
						Event
					</span>
				</li>
				<li>
					<img src="" alt="" />
					<span>
						<TfiWrite /> Write Article
					</span>
				</li>
			</ul>
		</form>
	);
};

export default AddPost;
