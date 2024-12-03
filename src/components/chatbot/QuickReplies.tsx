interface QuickRepliesProps {
    onReply: (message: string) => void;
  }
  
  const QuickReplies: React.FC<QuickRepliesProps> = ({ onReply }) => {
    const replies = ["¿Qué stock tienen?", "¿Cuál es el precio?", "¿Me recomiendas algo?"];
    return (
      <div className="flex space-x-2 p-2">
        {replies.map((reply, index) => (
          <button
            key={index}
            onClick={() => onReply(reply)}
            className="bg-primary text-white px-4 py-1 rounded-lg hover:bg-purple-700"
          >
            {reply}
          </button>
        ))}
      </div>
    );
  };
  
  export default QuickReplies;