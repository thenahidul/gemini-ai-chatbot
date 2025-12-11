import type { Request, Response } from "express";
import z from "zod";
import { chatService } from "../services/chat.service";

const chatSchema = z.object( {
	prompt: z
		.string()
		.trim()
		.min( 3, 'Min character should be at least 3' )
		.max( 1024, 'Max character must not exceed 100' ),
	id: z
		.string()
		.min( 8, 'Cannot be empty' )
		.max( 36, 'Max character must not exceed 32' )

} );

export const chatController = {
    async sendMessage( req: Request, res: Response ) {
        const parsedResult = chatSchema.safeParse( req.body );

        if ( ! parsedResult.success ) {
            res.status( 400 ).json( parsedResult.error.format() )
            return;
        }

        try {
            const { prompt, id } = req.body;

            const response = await chatService.sendMessage( prompt, id );

            res.json( response )
        } catch ( error ) {
            // res.json({ error } )
            res.status( 500 ).send( { error: 'Failed to return a response.' } )
        }
    }
}