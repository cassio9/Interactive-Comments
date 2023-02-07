import ReplyIcon from "../assets/images/icon-reply.svg";
interface Props {
	content: string;
	id: number;
	createdAt: string;
	replies: [];
	score: number;
	user: { image: { png: string; webp: string }; username: string };
}

interface Replying {
	id: number;
	content: string;
	createdAt: string;
	replyingTo: string;
	score: number;
	user: { image: { png: string; webp: string }; username: string };
}

const Messages = ({ content, id, createdAt, replies, score, user }: Props) => {
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
						<button className="text-xl text-LightGrayishBlue">+</button>
						<p className="font-bold text-ModerateBlue text-xl">{score}</p>
						<button className="text-xl text-LightGrayishBlue">-</button>
					</div>
					<button className="text-ModerateBlue font-bold text-xl flex items-center gap-2">
						<img src={ReplyIcon} alt="" />
						Reply
					</button>
				</div>
			</div>
			<div className="pl-5 ml-auto border-l-LightGrayishBlue border-y-0 border-[1px]">
				{replies &&
					replies.map((reply: Replying) => {
						console.log(reply);
						return (
							<div className="flex flex-col bg-white p-4 pb-2 rounded-lg mb-4">
								<div className="flex items-center gap-4">
									<img src={reply.user.image.webp} className="w-8" alt="avatar" />
									<p className="text-DarkBlue font-bold">{reply.user.username}</p>
									<p className="text-GrayishBlue">{reply.createdAt}</p>
								</div>
								<p className="text-GrayishBlue py-2">{reply.content}</p>
								<div className="flex justify-between items-center py-4">
									<div className="flex gap-4 bg-LightGray py-2  px-4 rounded-lg ">
										<button className="text-xl text-LightGrayishBlue">+</button>
										<p className="font-bold text-ModerateBlue text-xl">{reply.score}</p>
										<button className="text-xl text-LightGrayishBlue">-</button>
									</div>
									<button className="text-ModerateBlue font-bold text-xl flex items-center gap-2">
										<img src={ReplyIcon} alt="" />
										Reply
									</button>
								</div>
							</div>
						);
					})}
			</div>
		</div>
	);
};

export default Messages;
