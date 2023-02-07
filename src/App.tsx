import "./App.css";
import axios from "axios";
import Messages from "./Components/Messages";
import { useEffect, useState } from "react";
import AddPost from "./Components/AddPost";

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

function App() {
	const [messagesData, setMessagesData] = useState<Data>({
		currentUser: { image: { png: "", webp: "" }, username: "" },
		comments: [],
	});

	const Fetch = async () => {
		try {
			const response = await axios.get("data.json");
			console.log(response.data);
			setMessagesData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		Fetch();
	}, []);

	const messHTML =
		messagesData.comments &&
		messagesData.comments.map((messages: Comments) => {
			return <Messages key={messages.id} {...messages} setMessagesData={setMessagesData} />;
		});

	return (
		<main className="bg-LightGray min-h-screen max-h-fit p-4">
			{messHTML}
			<AddPost setMessagesData={setMessagesData} />
		</main>
	);
}

export default App;
