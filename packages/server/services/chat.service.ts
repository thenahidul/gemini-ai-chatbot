import { GoogleGenAI, Chat } from '@google/genai';

const ai = new GoogleGenAI( {
	apiKey: process.env.GEMINI_API_KEY
} );

type ChatResponse = {
	id: string;
	message: string;
}

const chatSessions = new Map<string, Chat>();

export const chatService = {
	async sendMessage( prompt: string, id: string ): Promise<ChatResponse> {
		let chat = chatSessions.get( id );

		// If no session exists, create a new one
		if ( ! chat ) {
			chat = ai.chats.create( {
				model: 'gemini-2.5-flash',
				config: {
					temperature: 0.2,
					maxOutputTokens: 1024,
					systemInstruction: "You are a helpful and concise assistant." // Optional: Set a persona or instructions
				},
			} );
			chatSessions.set( id, chat );
		}

		// Use chat.sendMessage, it automatically manages history!
		const response = await chat.sendMessage( { message: prompt } );

		const botMessage = response.text || '';

		return {
			id,
			message: botMessage,
		};
	},

	// Clear specific conversation (and its memory)
	clearHistory( id: string ): void {
		chatSessions.delete( id );
	},

	// Get the current conversation history
	async getHistory( id: string ) {
		const chat = chatSessions.get( id );
		return chat ? await chat.getHistory() : [];
	}
};
