import Minus from "../assets/images/icon-minus.svg";
import Plus from "../assets/images/icon-plus.svg";
import { Data, ReplyingInterface } from "./interface/interfaces";

interface Props {
	score: number;
	setMessagesData: React.Dispatch<React.SetStateAction<Data>>;
	id: number;
	from: string;
}

const Score = ({ score, setMessagesData, id, from }: Props) => {
	const changeScorePost = (id: number, operator: string) => {
		setMessagesData((prevState: Data) => {
			return {
				...prevState,
				comments: prevState.comments.map((comment) => {
					return comment.id === id
						? {
								...comment,
								score:
									operator === "plus"
										? comment.score + 1
										: comment.score < 1
										? comment.score
										: comment.score - 1,
						  }
						: comment;
				}),
			};
		});
	};

	const changeScoreReply = (id: number, operator: string) => {
		setMessagesData((prevState) => {
			return {
				...prevState,
				comments: prevState.comments.map((comment) => {
					return {
						...comment,
						replies: comment.replies.map((reply: ReplyingInterface) => {
							return reply.id === id
								? {
										...reply,
										score:
											operator === "plus"
												? reply.score + 1
												: reply.score < 1
												? reply.score
												: reply.score - 1,
								  }
								: reply;
						}),
					};
				}),
			};
		});
	};

	return (
		<div className="flex gap-4 bg-LightGray py-2  px-4 md:w-[2.5rem] md:py-4  rounded-lg md:flex-col items-center justify-center">
			<button
				className="text-xl text-LightGrayishBlue  py-4 -my-4"
				onClick={() =>
					from === "Posts" ? changeScorePost(id, "plus") : changeScoreReply(id, "plus")
				}>
				<img src={Plus} alt="Plus Icon" />
			</button>
			<p className="font-bold text-ModerateBlue text-xl">{score}</p>
			<button
				className="text-xl text-LightGrayishBlue py-4 -my-4"
				onClick={() =>
					from === "Posts" ? changeScorePost(id, "minus") : changeScoreReply(id, "minus")
				}>
				<img src={Minus} alt="Minus Icon" />
			</button>
		</div>
	);
};

export default Score;
