import { useForm } from "react-hook-form";
import { ArrowUp} from "lucide-react";
import { Button} from "@/components/ui/button";
import type { ChatInput } from "@/components/chat/ChatBot";

type Props = {
    onSubmit: ( data: ChatInput  ) => void
}

const ChatForm = ( { onSubmit }: Props ) => {
    const { register, handleSubmit, reset, formState } = useForm<ChatInput>();

    const handleFormSubmit = handleSubmit( data => {
        onSubmit( data );
        reset( { prompt: '' } );
    } );

    const handleKeyDown = ( e: React.KeyboardEvent<HTMLTextAreaElement> ) => {
        if ( e.key === "Enter" && ! e.shiftKey ) {
            e.preventDefault();
            handleFormSubmit();
        }
    }

    return (
        <form
            onSubmit={ handleFormSubmit }
            className="flex flex-col gap-2 p-4 border-2 border-amber-500 rounded-2xl">
            <textarea
                { ...register( "prompt", { required: true, validate: ( data) => data.trim().length > 0 } ) }
                onKeyDown={ handleKeyDown }
                autoFocus
                className="w-full h-30 border-0 focus:outline-0 resize-none"
                placeholder="Tell me a joke..."
                maxLength={ 1024 }
            />
            <Button
                disabled={ ! formState.isValid || formState.isSubmitting }
                className="self-end rounded-full w-12 h-12 bg-amber-500 hover:bg-amber-700">
                <ArrowUp/>
            </Button>
        </form>
    );
}

export default ChatForm;