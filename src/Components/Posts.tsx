import ReplyIcon from "../assets/images/icon-reply.svg";
import Minus from "../assets/images/icon-minus.svg";
import Plus from "../assets/images/icon-plus.svg";
import Reply, { Replying } from "./Reply";
import PostReply from "./PostReply";
import { useState } from "react";
import { Comments, Data } from "../App";

interface Props extends Comments {
	setMessagesData: React.Dispatch<React.SetStateAction<Data>>;
	parentId: number;
	currentUser: string;
}

const Posts = ({
	content,
	id,
	parentId,
	createdAt,
	replies,
	score,
	currentUser,
	user,
	setMessagesData,
}: Props) => {
	const [openReply, setOpenReply] = useState(false);

	return (
		<div>
			<div className="flex flex-col bg-white p-4 pb-2 rounded-lg mb-4">
				<div className="flex items-center gap-4">
					<img src={user.image.webp} className="w-8" alt="avatar" />
					<p className="text-DarkBlue font-bold">{user.username}</p>
					<p className="text-GrayishBlue">{createdAt}</p>
				</div>
				<p className="text-GrayishBlue py-2">{content}</p>
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
			<div className="pl-5 ml-auto border-l-LightGrayishBlue border-y-0 border-[1px]">
				{openReply && (
					<div className="mb-4">
						<PostReply
							setMessagesData={setMessagesData}
							id={id}
							setOpenReply={setOpenReply}
							currentUser={currentUser}
						/>
					</div>
				)}
				{replies &&
					replies.map((reply: Replying) => {
						return (
							<Reply
								key={reply.id}
								{...reply}
								setMessagesData={setMessagesData}
								parentId={parentId}
								currentUser={currentUser}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default Posts;
