import React from "react";
import { Data } from "../App";
import { ReplyInterface } from "./interface/interfaces";

interface Props {
	setMessagesData: React.Dispatch<React.SetStateAction<Data>>;
	setDeleteModal: React.Dispatch<React.SetStateAction<boolean>>;
	id: number;
	from: string;
}

const DeleteModal = ({ setMessagesData, setDeleteModal, id, from }: Props) => {
	const deleteReplyComment = (id: number) => {
		setDeleteModal(false);
		setTimeout(() => {
			setMessagesData((prevState) => {
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
		}, 10);
	};

	const deletePostComment = (id: number) => {
		setDeleteModal(false);
		setTimeout(() => {
			setMessagesData((prevState) => {
				return {
					...prevState,
					comments: prevState.comments.filter((comments) => comments.id !== id),
				};
			});
		}, 10);
	};

	return (
		<div className="bg-black fixed inset-0 flex justify-center items-center p-4 bg-opacity-30 z-50">
			<div className="bg-white rounded-xl p-6 max-w-sm ">
				<h1 className="font-bold text-DarkBlue text-lg">Delete comment</h1>
				<p className="py-4 text-GrayishBlue">
					Are you sure you want to delete this comment? This will remove the comment and can't be
					undone
				</p>
				<div className="flex w-full justify-between">
					<button
						onClick={() => setDeleteModal(false)}
						className="uppercase text-white p-2 w-full rounded-md bg-GrayishBlue ">
						No, Cancel
					</button>
					<button
						onClick={() => {
							from === "post" ? deletePostComment(id) : deleteReplyComment(id);
						}}
						className="uppercase text-white p-2 w-full bg-SoftRed rounded-md ml-2">
						Yes, Delete
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
