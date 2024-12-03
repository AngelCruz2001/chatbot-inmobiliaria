import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatButton from "./ChatButton";

const Chatbot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div
                className={`fixed bottom-4 right-4 w-96 bg-secondary shadow-lg rounded-lg flex flex-col ${isOpen ? "animate-fadeIn" : "animate-fadeOut"}`}
            >
                <ChatWindow />
            </div>
            <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
        </div>
    );
};

export default Chatbot;
