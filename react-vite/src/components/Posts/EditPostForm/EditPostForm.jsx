import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { thunkEditPost, thunkSinglePost } from "../../../redux/posts";
import '../Posts.css';

const EditPostForm = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { postId } = useParams();
    const postData = useSelector(state => state.posts.post)
    const [post, setPost] = useState();

    const [body, setBody] = useState(post?.body);
	const [level, setLevel] = useState(post?.level);
	const [language, setLanguage] = useState(post?.language);
	const [title, setTitle] = useState(post?.title);
	const [privated, setPrivated] = useState(post?.privated);

    useEffect(() => {
        if(postData) setPost(postData[postId])
        setBody(post?.body)
        setTitle(post?.title)
        setLanguage(post?.language)
        setLevel(post?.level)
        setPrivated(post?.privated)
    },[postData])

    useEffect(() => {
        dispatch(thunkSinglePost(postId))
    }, [dispatch, postId])

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            body,
            level,
            language,
            title,
            privated
        }

        dispatch(thunkEditPost(payload, postId))
        console.log(payload.privated, privated)
        if(!privated) navigate(`/posts/${postId}`)

        if(privated) navigate('/profile/posts')

    };

   return (
    <>
    <div className="form create-form">
        <h1 className="page-title">Edit Post</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-info'>
                    <div className="form-text-input">
						<label>What would you like to share with the class ?</label>
						<input
							type='textarea'
							placeholder='Share your thoughts here...'
                            value={body}
							onChange={(e) => setBody(e.target.value)}
						/>
					</div>
                    <div className="details-section">
                    <h2>More Details:</h2>
					<div>
						<label>Title:</label>
						<input
							type='text'
							placeholder='Give your post a descriptive title...'
                            value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
					</div>
					<div>
						<label>Language:</label>
						<select value={language} onChange={(e) => setLanguage(e.target.value)}>
                            <option
                                value="English"
                                required>
                                English
                            </option>
                            <option
                                value="French"
                                required>
                                French
                            </option>
                            <option
                                value="Italian"
                                required>
                                Italian
                            </option>
                            <option
                                value="Japanese"
                                required>
                                Japanese
                            </option>
                            <option
                                value="Portuguese"
                                required>
                                Portuguese
                            </option>
                            <option
                                value="Spanish"
                                required>
                                Spanish
                            </option>
                        </select>
					</div>
					<div>
						<label>Level:</label>
						<select value={level} onChange={(e) => setLevel(e.target.value)}>
                            <option
                                value="1"
                                required>
                                Beginner
                            </option>
                            <option
                                value="2"
                                required>
                                Intermediate
                            </option>
                            <option
                                value="3"
                                required>
                                Expert
                            </option>
                        </select>
					</div>
                    </div>
                <div className="form-buttons">
				<button onClick={() => setPrivated(true)}>Private</button>
                <button onClick={() => setPrivated(false)}>Publish</button>
                </div>
			</div>
		</form>
    </div>
	</>
    )
};

export default EditPostForm