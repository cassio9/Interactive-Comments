import ReplyIcon from "../assets/images/icon-reply.svg";
import MinusIcon from "../assets/images/icon-minus.svg";
import PlusIcon from "../assets/images/icon-plus.svg";
import DeleteIcon from "../assets/images/icon-delete.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import ReplyReplies from "./ReplyReplies";
import { useRef, useState } from "react";
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

interface ReplyInterface {
	id: number;
	content: string;
	createdAt: string;
	replyingTo: string;
	score: number;
	user: { image: { png: string; webp: string }; username: string };
}

const Reply = ({
	id,
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
	const [deleteModal, setDeleteModal] = useState(false);
	const ref = useRef<HTMLInputElement>(null);

	const deleteComment = (id: number) => {
		setMessagesData((prevState) => {
			console.log(prevState);
			return {
				...prevState,
				comments: prevState.comments.map((comments) => {
					return {
						...comments,
						replies: comments.replies.filter((reply: ReplyInterface) => reply.id !== id),
					};
				}),
			};
		});
	};

	const editComment = () => {
		if (ref.current) {
			ref.current.setAttribute("contenteditable", "true");
			ref.current.focus();
		}
	};

	const changeReply = (id: number, e: React.FormEvent<HTMLParagraphElement>) => {
		if (ref.current) {
			ref.current.setAttribute("contenteditable", "false");
			const input = e.target as HTMLElement;
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
											content: input.innerText,
									  }
									: reply;
							}),
						};
					}),
				};
			});
		}
	};

	const BlurOnEnterKey = (e: React.KeyboardEvent<HTMLParagraphElement>) => {
		if (e.key === "Enter") {
			if (ref.current) {
				ref.current.blur();
			}
		}
	};

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
								onClick={() => setDeleteModal(true)}>
								<img src={DeleteIcon} alt="" />
								Delete
							</button>
							<button
								className="text-ModerateBlue font-bold text-xl flex items-center gap-2 ml-auto"
								onClick={editComment}>
								<img src={EditIcon} alt="" />
								Edit
							</button>
						</div>
					)}
				</div>
				<div className="pt-2">
					<span className="text-ModerateBlue font-bold cursor-pointer" contentEditable={false}>
						@{replyingTo}{" "}
					</span>
					<p
						className="text-GrayishBlue py-2 caret-SoftRed inline focus:outline-SoftRed focus:outline-dashed focus:outline-offset-2"
						ref={ref}
						onBlur={(e) => changeReply(id, e)}
						onKeyDown={(e) => BlurOnEnterKey(e)}>
						{content}
					</p>
				</div>
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
			{deleteModal && (
				<div className="bg-black fixed inset-0 flex justify-center items-center p-4 bg-opacity-30">
					<div className="bg-white rounded-xl p-6 max-w-sm ">
						<h1 className="font-bold text-DarkBlue text-lg">Delete comment</h1>
						<p className="py-4 text-GrayishBlue">
							Are you sure you want to delete this comment? This will remove the comment and can't
							be undone
						</p>
						<div className="flex w-full justify-between">
							<button
								onClick={() => setDeleteModal(false)}
								className="uppercase text-white p-2 w-full rounded-md bg-GrayishBlue ">
								No, Cancel
							</button>
							<button
								onClick={() => deleteComment(id)}
								className="uppercase text-white p-2 w-full bg-SoftRed rounded-md ml-2">
								Yes, Delete
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default Reply;
