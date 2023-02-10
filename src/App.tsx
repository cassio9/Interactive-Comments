import "./App.css";
import axios from "axios";
import Posts from "./Components/Posts";
import { ReactElement, useEffect, useState } from "react";
import AddPost from "./Components/AddPost";
import { Comments, Data } from "./Components/interface/interfaces";
import { compare } from "./Components/utils/utils";

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

	const messHTML = messagesData.comments
		.map((messages: Comments) => {
			return (
				<Posts
					key={messages.id}
					{...messages}
					setMessagesData={setMessagesData}
					parentId={messages.id}
					currentUser={messagesData.currentUser.username}
				/>
			);
		})
		.sort(compare);

	return (
		<main className="bg-LightGray min-h-screen max-h-fit p-4">
			<div className="md:max-w-2xl mx-auto">
				{messHTML}
				<AddPost setMessagesData={setMessagesData} />
			</div>
		</main>
	);
}

export default App;
