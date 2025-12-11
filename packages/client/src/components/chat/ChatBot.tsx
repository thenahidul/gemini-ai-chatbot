import { useState, useMemo } from "react";
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

// Generate or retrieve a unique ID
const getOrCreateSessionId = (): string => {
	let id = localStorage.getItem( 'genaiChatBotSessionId' );

	if ( ! id ) {
		id = crypto.randomUUID();
		localStorage.setItem( 'genaiChatBotSessionId', id );
	}

	return id;
};

const ChatBot = () => {
	const [messages, setMessages] = useState<ChatMessage[]>( [] );
	const [isBotTyping, setIsBotTyping] = useState( false );
	const [error, setError] = useState( '' );

	const sessionId = useMemo( getOrCreateSessionId, [] );

	const submit = async ( { prompt }: ChatInput ) => {
		try {
			setError( '' );
			setIsBotTyping( true );
			setMessages( prevMessages => [ ...prevMessages, { content: prompt, sender: 'user' } ] );

			const { data } = await axios.post<ChatOutput>( '/api/chat', { prompt, id: sessionId } );

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
