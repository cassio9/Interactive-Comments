import { useState } from "react";
import UserAvatar from "../assets/images/avatars/image-juliusomo.webp";
import { Data } from "./interface/interfaces";

interface Props {
	setMessagesData: React.Dispatch<React.SetStateAction<Data>>;
}

const AddPost = ({ setMessagesData }: Props) => {
	const [newPost, setNewPost] = useState("");

	const today = new Date();
	const newId = today.getTime();
	const hours = today.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	const sendData = () => {
		if (newPost) {
			setMessagesData((prevState: Data) => {
				return {
					...prevState,
					comments: [
						...prevState.comments,
						{
							content: newPost,
							id: newId,
							createdAt: hours,
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
		}
		setNewPost("");
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
