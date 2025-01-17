import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkCreatePost } from "../../../redux/posts";
import '../Posts.css';

const CreatePostForm = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [body, setBody] = useState('');
	const [level, setLevel] = useState(1);
	const [language, setLanguage] = useState('English');
	const [title, setTitle] = useState('');
	const [privated, setPrivated] = useState(true);

    const handleSubmit = (e) => {
        e.preventDefault();

        const payload = {
            body,
            level,
            language,
            title,
            private: privated
        }

       dispatch(thunkCreatePost(payload))
       navigate('/profile')
    };
   return (
    <>
    <div className="form create-form">
        <h1 className="page-title">Create Post</h1>
			<form onSubmit={handleSubmit}>
				<div className='form-info'>
                    <div className="form-text-input">
						<label>What would you like to share with the class ?</label>
						<input
							type='textarea'
							placeholder='Share your thoughts here...'
                            value={body}
                            // cols="30" rows="10"
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
                                Enlgish
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
				<button>Save</button>
                <button onClick={() => setPrivated(false)}>Post</button>
                </div>
			</div>
		</form>
    </div>
	</>
    )
};

export default CreatePostForm