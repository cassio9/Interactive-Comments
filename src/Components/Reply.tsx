import ReplyIcon from "../assets/images/icon-reply.svg";
import DeleteIcon from "../assets/images/icon-delete.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import ReplyReplies from "./ReplyReplies";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "./DeleteModal";
import { Replying, ReplyInterface } from "./interface/interfaces";
import { BlurOnEnterKey, editComment } from "./utils/utils";
import Score from "./Score";

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
	const ref = useRef<HTMLInputElement>(null);
	const [deleteModal, setDeleteModal] = useState(false);

	//stop scrolling when modal is open
	useEffect(() => {
		deleteModal
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "auto");
	}, [deleteModal]);

	// update data after text gets blur
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

	return (
		<div>
			<div className="flex flex-col bg-white p-4 pb-2 rounded-lg mb-4 relative md:flex-row md:justify-between md:items-start md:gap-4">
				<div className="md:order-2 md:pb-2 md:w-full">
					<div className="flex items-center gap-4 ">
						<img src={user.image.webp} className="w-8" alt="avatar" />
						<p className="text-DarkBlue font-bold">{user.username}</p>
						{user.username === currentUser && (
							<span className="text-white bg-ModerateBlue text-sm  px-2 rounded-sm">you</span>
						)}
						<p className="text-GrayishBlue">{createdAt}</p>
						{user.username === currentUser && (
							<div className="flex gap-4 ml-auto absolute bottom-8 right-4 md:relative md:top-0 md:right-0">
								<button
									className="text-SoftRed font-bold text-xl flex items-center gap-2 "
									onClick={() => setDeleteModal(true)}>
									<img src={DeleteIcon} alt="" />
									Delete
								</button>
								<button
									className="text-ModerateBlue font-bold text-xl flex items-center gap-2 ml-auto"
									onClick={() => editComment(ref)}>
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
							onKeyDown={(e) => BlurOnEnterKey(e, ref)}>
							{content}
						</p>
					</div>
				</div>
				<div className="flex justify-between items-center py-4 md:py-0 md:order-0">
					<Score score={score} setMessagesData={setMessagesData} id={id} from={"Reply"} />
					{user.username !== currentUser && (
						<button
							className="text-ModerateBlue font-bold text-xl flex items-center gap-2 md:absolute top-4 right-4"
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
				<DeleteModal
					setDeleteModal={setDeleteModal}
					setMessagesData={setMessagesData}
					id={id}
					from={"reply"}
				/>
			)}
		</div>
	);
};

export default Reply;
