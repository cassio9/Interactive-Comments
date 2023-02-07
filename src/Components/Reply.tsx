import ReplyIcon from "../assets/images/icon-reply.svg";
import Minus from "../assets/images/icon-minus.svg";
import Plus from "../assets/images/icon-plus.svg";
import SendMessages from "./SendMessages";
import { useState } from "react";

export interface Replying {
	id: number;
	content: string;
	createdAt: string;
	replyingTo: string;
	score: number;
	setMessagesData: React.Dispatch<any>;
	user: { image: { png: string; webp: string }; username: string };
}

const Reply = ({ id, content, createdAt, replyingTo, score, setMessagesData, user }: Replying) => {
	const [openReply, setOpenReply] = useState(false);
	return (
		<div>
			<div className="flex flex-col bg-white p-4 pb-2 rounded-lg mb-4">
				<div className="flex items-center gap-4">
					<img src={user.image.webp} className="w-8" alt="avatar" />
					<p className="text-DarkBlue font-bold">{user.username}</p>
					<p className="text-GrayishBlue">{createdAt}</p>
				</div>
				<p className="text-GrayishBlue py-2">
					<span className="text-ModerateBlue font-bold cursor-pointer">@{replyingTo} </span>
					{content}
				</p>
				<div className="flex justify-between items-center py-4">
					<div className="flex gap-4 bg-LightGray py-2  px-4 rounded-lg ">
						<button className="text-xl text-LightGrayishBlue">
							<img src={Plus} alt="Plus Icon" />
						</button>
						<p className="font-bold text-ModerateBlue text-xl">{score}</p>
						<button className="text-xl text-LightGrayishBlue">
							<img src={Minus} alt="Minus Icon" />
						</button>
					</div>
					<button
						className="text-ModerateBlue font-bold text-xl flex items-center gap-2"
						onClick={() => setOpenReply((prev) => !prev)}>
						<img src={ReplyIcon} alt="" />
						Reply
					</button>
				</div>
			</div>
			{openReply && <div className="my-4"></div>}
		</div>
	);
};

export default Reply;
