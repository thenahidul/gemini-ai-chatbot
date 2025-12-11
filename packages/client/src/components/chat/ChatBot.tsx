import { useState } from "react";
import axios from "axios";
import ChatMessages from "@/components/chat/ChatMessages";
import ChatForm from "@/components/chat/ChatForm";

export type ChatInput = {
	prompt: string;
}

type ChatOutput = {
	message: string;
}

export type ChatMessage = {
	sender: 'user' | 'bot';
	content: string;
}

const ChatBot = () => {
	const [messages, setMessages] = useState<ChatMessage[]>( [] );
	const [isBotTyping, setIsBotTyping] = useState( false );
	const [error, setError] = useState( '' );

	const submit = async ( { prompt }: ChatInput ) => {
		try {
			setError( '' );
			setIsBotTyping( true );
			setMessages( prevMessages => [ ...prevMessages, { content: prompt, sender: 'user' } ] );

			const { data } = await axios.post<ChatOutput>( '/api/chat', { prompt, id: 'test-id' } );

			setMessages( prevMessages => [ ...prevMessages, { content: data.message, sender: 'bot' } ] );
		} catch ( err ) {
			setError( 'Something went wrong. Please try again.' );
			console.error( err );
		} finally {
			setIsBotTyping( false );
		}
	}

	return (
		<div className="flex flex-col h-full">
			<ChatMessages messages={ messages } isBotTyping={ isBotTyping } error={ error }/>
			<ChatForm onSubmit={ submit }/>
		</div>
	)
}

export default ChatBot
