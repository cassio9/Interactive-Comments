import { useState } from "react";
import { Comments, Data } from "../App";
import UserAvatar from "../assets/images/avatars/image-juliusomo.webp";

interface Props {
	setMessagesData: React.Dispatch<any>;
}

const AddPost = ({ setMessagesData }: Props) => {
	const [newPost, setNewPost] = useState("");

	const sendData = () => {
		setMessagesData((prevState: Data) => {
			return {
				...prevState,
				comments: [
					...prevState.comments,
					{
						content: newPost,
						id: prevState.comments.length + 1,
						createdAt: "now",
						replies: [],
						score: 0,
						user: {
							image: {
								png: prevState.currentUser.image.png,
								webp: prevState.currentUser.image.webp,
							},
							username: prevState.currentUser.username,
						},
					},
				],
			};
		});
	};

	return (
		<div className="bg-white mt-4 rounded-lg">
			<textarea
				name="sendMsg"
				id="sendMsg"
				rows={3}
				value={newPost}
				onChange={(e) => setNewPost(e.target.value)}
				placeholder="Add a Post..."
				className="p-4 border-LightGrayishBlue border-[1px] w-[93%] resize-none rounded-lg m-4"></textarea>
			<div className="p-4 pt-0 flex justify-between items-center">
				<img src={UserAvatar} className="w-12" alt="avatar" />
				<button
					className="bg-ModerateBlue py-3 px-8 text-xl text-white rounded-lg"
					onClick={sendData}>
					Send
				</button>
			</div>
		</div>
	);
};

export default AddPost;
