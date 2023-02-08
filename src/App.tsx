import "./App.css";
import axios from "axios";
import Posts from "./Components/Posts";
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

	const messHTML = messagesData.comments.map((messages: Comments) => {
		return (
			<Posts
				key={messages.id}
				{...messages}
				setMessagesData={setMessagesData}
				parentId={messages.id}
				currentUser={messagesData.currentUser.username}
			/>
		);
	});

	console.log(messagesData);

	return (
		<main className="bg-LightGray min-h-screen max-h-fit p-4">
			{messHTML}
			<AddPost setMessagesData={setMessagesData} />
		</main>
	);
}

export default App;
