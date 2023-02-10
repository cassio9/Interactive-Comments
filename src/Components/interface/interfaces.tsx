export interface ReplyingInterface extends ReplyInterface {
	parentId: number;
	setMessagesData: React.Dispatch<React.SetStateAction<Data>>;
	currentUser: string;
	replies: any;
}

export interface ReplyInterface {
	id: number;
	content: string;
	createdAt: string;
	replyingTo: string;
	score: number;
	user: { image: { png: string; webp: string }; username: string };
}

export interface Comments {
	content: string;
	id: number;
	createdAt: string;
	replies: any;
	score: number;
	user: { image: { png: string; webp: string }; username: string };
}

export interface Data {
	currentUser: { image: { png: string; webp: string }; username: string };
	comments: Comments[];
}
