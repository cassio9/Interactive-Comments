import "./App.css";
import axios from "axios";
import Messages from "./Components/Messages";
import SendMessages from "./Components/SendMessages";
import { useEffect, useState } from "react";

function App() {
	const [messagesData, setMessagesData] = useState<any>("");

	const Fetch = async () => {
		try {
			const response = await axios.get("data.json");
			setMessagesData(response.data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		Fetch();
	}, []);

	console.log(messagesData);

	const messHTML =
		messagesData.comments &&
		messagesData.comments.map((messages: any) => {
			return <Messages key={messages.id} {...messages} />;
		});

	return (
		<div className="bg-LightGray min-h-screen max-h-fit p-4">
			{messagesData.comments && messHTML}
			<SendMessages />
		</div>
	);
}

export default App;
