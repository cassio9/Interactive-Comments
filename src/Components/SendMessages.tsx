import UserAvatar from "../assets/images/avatars/image-juliusomo.webp";

const SendMessages = () => {
	return (
		<div className="bg-white mt-4 rounded-lg">
			<textarea
				name="sendMsg"
				id="sendMsg"
				rows={3}
				placeholder="Add a comment..."
				className="p-4 border-LightGrayishBlue border-[1px] w-[93%] resize-none rounded-lg m-4"></textarea>
			<div className="p-4 pt-0 flex justify-between items-center">
				<img src={UserAvatar} className="w-12" alt="avatar" />
				<button className="bg-ModerateBlue py-3 px-8 text-xl text-white rounded-lg">Send</button>
			</div>
		</div>
	);
};

export default SendMessages;
