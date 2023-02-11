import "./App.css";
import axios from "axios";
import Posts from "./Components/Posts";
import { useEffect, useState } from "react";
import AddPost from "./Components/AddPost";
import { Comments, Data } from "./Components/interface/interfaces";
import { compare } from "./Components/utils/utils";
import { InitialData } from "../data";

function App() {
	const value = localStorage.getItem("interactive");

	const [messagesData, setMessagesData] = useState<Data>(
		typeof value === "string" ? JSON.parse(value) : InitialData
	);

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
				<AddPost messagesData={messagesData} setMessagesData={setMessagesData} />
			</div>
		</main>
	);
}

export default App;
