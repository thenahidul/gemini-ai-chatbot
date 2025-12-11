import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI( { 
	 apiKey: process.env.GEMINI_API_KEY 
} );

type ChatResponse = {
    id: string;
    message: string;
}

export const chatService = {
    async sendMessage( prompt: string, id: string ): Promise<ChatResponse> {
        const response = await ai.models.generateContent( {
			model: 'gemini-2.5-flash-lite',
			contents: prompt,
			config: { 
				temperature: 0.2,
				maxOutputTokens: 1024,
			},
		} );

        return {
            id: '', // unused for now
            message: response?.text || '',
        }
    }
}