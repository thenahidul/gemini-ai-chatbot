import { useEffect, useRef } from "react";
import Markdown from "react-markdown";
import TypingIndicator from "@/components/chat/TypingIndicator";
import type { ChatMessage } from "@/components/chat/ChatBot";

type Props = {
    messages: ChatMessage[],
    isBotTyping: boolean,
    error: string
}

const ChatMessages = ( { messages, isBotTyping, error }: Props ) => {
    const messageRef = useRef<HTMLDivElement | null>( null );

    const handleCopyMessage = ( e: React.ClipboardEvent ) => {
        const selection = window.getSelection()?.toString().trim();
        if ( selection ) {
            e.preventDefault();
            e.clipboardData.setData( 'text/plain', selection );
        }
    };

    useEffect( () => {
        if ( messageRef.current ) {
            messageRef.current.scrollIntoView( { behavior: 'smooth' } );
        }
    }, [ messages ] );

    return (
        <div className="flex flex-col flex-1 gap-4 mb-10 py-5 overflow-y-auto">
            { messages.map( ( message, index ) => (
                <div
                    key={ index }
                    onCopy={ handleCopyMessage }
                    ref={ index === messages.length - 1 ? messageRef : null }
                    className={ `px-4 py-3 rounded-2xl ${ message.sender === 'user' ? 'text-white bg-amber-600 self-end' : 'text-black bg-gray-100 self-start' }` }>
                    <Markdown>
                        { message.content || "Try again" }
                    </Markdown>
                </div>
            ) ) }

            { isBotTyping && <TypingIndicator/> }

            { error && (
                <div className="px-4 py-3 rounded-2xl bg-red-100 text-red-700 self-start">
                    { error }
                </div>
            ) }
        </div>
    );
}

export default ChatMessages;