type DotProps = {
    className?: string;
}

const Dot = ( { className }: DotProps ) => (
  <div className={`w-2 h-2 bg-gray-900 rounded self-start animate-pulse ${className}`}/>
);

const TypingIndicator = () => {
  return (
    <div className="flex gap-0.5 items-center px-4 py-3 rounded-2xl bg-gray-100 self-start">
        <Dot/>
        <Dot className='[animation-delay:0.2s]'/>
        <Dot className='[animation-delay:0.4s]'/>
    </div>
  )
}

export default TypingIndicator
