import ReplyIcon from "../assets/images/icon-reply.svg";
import DeleteIcon from "../assets/images/icon-delete.svg";
import EditIcon from "../assets/images/icon-edit.svg";
import Reply from "./Reply";
import PostReply from "./PostReply";
import { useEffect, useRef, useState } from "react";
import DeleteModal from "./DeleteModal";
import { ReplyingInterface, Comments, Data } from "./interface/interfaces";
import { BlurOnEnterKey, compare, editComment } from "./utils/utils";
import Score from "./Score";

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
	const [deleteModal, setDeleteModal] = useState(false);
	const ref = useRef<HTMLInputElement>(null);

	const today = new Date();
	const hours = today.toLocaleString("en-US", {
		hour: "numeric",
		minute: "numeric",
		hour12: true,
	});

	useEffect(() => {
		deleteModal
			? (document.body.style.overflow = "hidden")
			: (document.body.style.overflow = "auto");
	}, [deleteModal]);

	const changePost = (id: number, e: React.FormEvent<HTMLParagraphElement>) => {
		if (ref.current) {
			ref.current.setAttribute("contenteditable", "false");
			const input = e.target as HTMLElement;
			setMessagesData((prevState) => {
				return {
					...prevState,
					comments: prevState.comments.map((comments) => {
						return comments.id == id
							? {
									...comments,
									createdAt: hours,
									content: input.innerText,
							  }
							: comments;
					}),
				};
			});
		}
	};

	return (
		<div>
			<div className="flex flex-col bg-white p-4 pb-2 rounded-lg mb-4 relative md:flex-row md:justify-between md:items-start md:gap-4">
				<div className="md:order-2 md:w-full">
					<div className="flex items-center gap-4 w-full">
						<img src={user.image.webp} className="w-8" alt="avatar" />
						<p className="text-DarkBlue font-bold">{user.username}</p>
						{user.username === currentUser && (
							<span className="text-white bg-ModerateBlue text-sm  px-2 rounded-sm">you</span>
						)}
						<p className="text-GrayishBlue">{createdAt}</p>
						{user.username === currentUser && (
							<div className="flex gap-4 ml-auto absolute bottom-8 right-4 md:static md:ml-auto">
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
					<p
						className="text-GrayishBlue py-2"
						ref={ref}
						onBlur={(e) => changePost(id, e)}
						onKeyDown={(e) => BlurOnEnterKey(e, ref)}>
						{content}
					</p>
				</div>
				<div className="flex justify-between items-center py-4 md:py-0 md:order-0">
					<Score score={score} setMessagesData={setMessagesData} id={id} from={"Posts"} />
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
			<div className="pl-5 border-l-LightGrayishBlue border-l-[1px] md:ml-5 md:pl-10">
				{openReply && (
					<div className="mb-4">
						<PostReply setMessagesData={setMessagesData} id={id} setOpenReply={setOpenReply} />
					</div>
				)}
				{deleteModal && (
					<DeleteModal
						setDeleteModal={setDeleteModal}
						setMessagesData={setMessagesData}
						id={id}
						from={"Post"}
					/>
				)}
				{replies &&
					replies
						.map((reply: ReplyingInterface) => {
							return (
								<Reply
									key={reply.id}
									{...reply}
									setMessagesData={setMessagesData}
									parentId={parentId}
									currentUser={currentUser}
								/>
							);
						})
						.sort(compare)}
			</div>
		</div>
	);
};

export default Posts;
