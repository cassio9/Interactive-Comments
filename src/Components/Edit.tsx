import { useState } from "react";
import UserAvatar from "../assets/images/avatars/image-juliusomo.webp";
import { Data, ReplyInterface } from "./interface/interfaces";

interface Props {
	setMessagesData: React.Dispatch<React.SetStateAction<Data>>;
	id: number;
	setOpenEdit: React.Dispatch<boolean>;
	content: string;
	from: string;
}

const Edit = ({ setMessagesData, id, setOpenEdit, content, from }: Props) => {
	const [newPost, setNewPost] = useState("");

	const today = new Date();
	const hours = today.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	const EditReply = (id: number) => {
		if (newPost) {
			setMessagesData((prevState) => {
				return {
					...prevState,
					comments: prevState.comments.map((comments) => {
						return {
							...comments,
							replies: comments.replies.map((reply: ReplyInterface) => {
								return reply.id == id
									? {
											...reply,
											content: newPost,
											createdAt: hours + " edited ",
									  }
									: reply;
							}),
						};
					}),
				};
			});
		}
		setOpenEdit(false);
	};

	const EditPost = (id: number) => {
		if (newPost) {
			setMessagesData((prevState) => {
				return {
					...prevState,
					comments: prevState.comments.map((comments) => {
						return comments.id == id
							? {
									...comments,
									createdAt: hours + " edited ",
									content: newPost,
							  }
							: comments;
					}),
				};
			});
		}
		setOpenEdit(false);
	};

	return (
		<div className="bg-white mt-4 rounded-lg">
			<textarea
				name="sendMsg"
				id="sendMsg"
				defaultValue={content}
				onChange={(e) => setNewPost(e.target.value)}
				rows={3}
				className="p-4 border-LightGrayishBlue border-[1px] w-[93%] resize-none rounded-lg m-4 text-GrayishBlue"></textarea>
			<div className="p-4 pt-0 flex justify-between items-center">
				<img src={UserAvatar} className="w-12" alt="avatar" />
				<button
					className="bg-ModerateBlue py-3 px-8 text-xl text-white rounded-lg hover:opacity-70"
					onClick={() => (from == "Post" ? EditPost(id) : EditReply(id))}>
					Update
				</button>
			</div>
		</div>
	);
};

export default Edit;
