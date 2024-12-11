// src/components/chatbot/ChatWindow.tsx

import React, { useState, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ProductCarousel from "./ProductCarousel";
import { Product } from "../../types/Product";
import BotThinking from "./BotThinking";
import QuickReplies from "./QuickReplies";
import { useWebSocket } from "../../../services/websocket";

const NO_REAL_PRODUCTS = {
    products: [
        {
            id: "1",
            name: "Escritorio",
            description: "Un escritorio ideal para oficinas compactas.",
            price: "$2,999.00",
            imageUrl: "https://img.uline.com/is/image/uline/H-9780?$LargeHD$",
            actions: ["Comprar"],
        },
        {
            id: "2",
            name: "Silla Ejecutiva",
            description: "Silla ergonómica con soporte lumbar.",
            price: "$1,599.00",
            imageUrl: "https://img.uline.com/is/image/uline/H-2753?$LargeHD$",
            actions: ["Detalles"],
        },
    ],
};

type TChatWindowProps = {
    messages: any[];
    isConnected: boolean;
    sendMessage: (message: string) => void;
}

const ChatWindow: React.FC<TChatWindowProps> = ({ messages, isConnected, sendMessage }) => {
    const [userMessages, setUserMessages] = useState<{ user: string; text: string; products?: Product[] }[]>([]);
    const [isThinking, setIsThinking] = useState(false);

    useEffect(() => {
        console.log(isConnected); // Verifica el estado de la conexión
    }, [isConnected]);


    

    const handleSendMessage = async (message: string) => {
        if (!isConnected) {
            console.log("No está conectado al WebSocket.");
            return;
        }

        setUserMessages([...userMessages, { user: "You", text: message }]);
        setIsThinking(true);

        // Enviar mensaje por WebSocket
        sendMessage(message);
    };

    const handleAction = (action: string, product: Product) => {
        if (action === "Comprar") {
            alert(`Has seleccionado comprar el producto: ${product.name}`);
        } else if (action === "Detalles") {
            alert(`Detalles del producto: ${product.description}`);
        }
    };

    useEffect(() => {
        if (messages.length > 0) {
            const newMessage = {
                user: "Bot",
                text: messages[messages.length - 1]?.response || "Lo siento, algo salió mal.",
                products: NO_REAL_PRODUCTS.products,
            };
            setUserMessages((prev) => [...prev, newMessage]);
            setIsThinking(false);
        }
    }, [messages]);

    return (
        <div className="fixed bottom-20 right-10 w-96 min-h-96 max-h-[600px] bg-secondary shadow-lg rounded-lg flex flex-col">
            <div className="bg-primary text-white p-4 text-center rounded-t-lg">Chatbot</div>
            <div className="flex-1 p-4 overflow-y-scroll space-y-2">
                {userMessages.map((msg, index) => (
                    <div key={index}>
                        <MessageBubble user={msg.user} text={msg.text} />
                        {/* {msg.products && <ProductCarousel products={msg.products} onAction={handleAction} />} */}
                    </div>
                ))}

                {isThinking && (
                    <div className="flex justify-start">
                        <BotThinking />
                    </div>
                )}
            </div>
            <ChatInput onSendMessage={handleSendMessage} isDisabled={isThinking} />
            {!isThinking && <QuickReplies onReply={handleSendMessage} />}
        </div>
    );
};

export default ChatWindow;
