import ReplyIcon from "../assets/images/icon-reply.svg";
import MinusIcon from "../assets/images/icon-minus.svg";
import PlusIcon from "../assets/images/icon-plus.svg";
import DeleteIcon from "../assets/images/icon-delete.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import ReplyReplies from "./ReplyReplies";
import { useState } from "react";
import { Data } from "../App";

export interface Replying {
	id: number;
	parentId: number;
	content: string;
	createdAt: string;
	replyingTo: string;
	score: number;
	setMessagesData: React.Dispatch<React.SetStateAction<Data>>;
	currentUser: string;
	user: { image: { png: string; webp: string }; username: string };
}

const Reply = ({
	parentId,
	content,
	createdAt,
	replyingTo,
	score,
	setMessagesData,
	user,
	currentUser,
}: Replying) => {
	const [openReply, setOpenReply] = useState(false);

	return (
		<div>
			<div className="flex flex-col bg-white p-4 pb-2 rounded-lg mb-4 relative">
				<div className="flex items-center gap-4">
					<img src={user.image.webp} className="w-8" alt="avatar" />
					<p className="text-DarkBlue font-bold">{user.username}</p>
					<p className="text-GrayishBlue">{createdAt}</p>
					{user.username === currentUser && (
						<div className="flex gap-4 ml-auto absolute bottom-8 right-4 md:static">
							<button
								className="text-SoftRed font-bold text-xl flex items-center gap-2 "
								onClick={() => setOpenReply((prev) => !prev)}>
								<img src={DeleteIcon} alt="" />
								Delete
							</button>
							<button
								className="text-ModerateBlue font-bold text-xl flex items-center gap-2 ml-auto"
								onClick={() => setOpenReply((prev) => !prev)}>
								<img src={EditIcon} alt="" />
								Edit
							</button>
						</div>
					)}
				</div>
				<p className="text-GrayishBlue py-2">
					<span className="text-ModerateBlue font-bold cursor-pointer">@{replyingTo} </span>
					{content}
				</p>
				<div className="flex justify-between items-center py-4">
					<div className="flex gap-4 bg-LightGray py-2  px-4 rounded-lg ">
						<button className="text-xl text-LightGrayishBlue">
							<img src={PlusIcon} alt="Plus Icon" />
						</button>
						<p className="font-bold text-ModerateBlue text-xl">{score}</p>
						<button className="text-xl text-LightGrayishBlue">
							<img src={MinusIcon} alt="Minus Icon" />
						</button>
					</div>
					{user.username !== currentUser && (
						<button
							className="text-ModerateBlue font-bold text-xl flex items-center gap-2"
							onClick={() => setOpenReply((prev) => !prev)}>
							<img src={ReplyIcon} alt="" />
							Reply
						</button>
					)}
				</div>
			</div>
			{openReply && (
				<div className="my-4">
					<ReplyReplies
						setOpenReply={setOpenReply}
						setMessagesData={setMessagesData}
						username={user.username}
						parentId={parentId}
					/>
				</div>
			)}
		</div>
	);
};

export default Reply;
