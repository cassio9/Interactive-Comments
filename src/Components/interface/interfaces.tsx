import { Data } from "../../App";

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

export interface ReplyInterface {
	id: number;
	content: string;
	createdAt: string;
	replyingTo: string;
	score: number;
	user: { image: { png: string; webp: string }; username: string };
}
