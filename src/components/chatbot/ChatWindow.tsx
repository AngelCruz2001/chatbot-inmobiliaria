import React, { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import ProductCarousel from "./ProductCarousel";
import { Product } from "../../types/Product";
import BotThinking from "./BotThinking";
import QuickReplies from "./QuickReplies";


const NO_REAL_PRODUCTS = {
    "products": [
        {
            "id": "1",
            "name": "Escritorio",
            "description": "Un escritorio ideal para oficinas compactas.",
            "price": "$2,999.00",
            "imageUrl": "https://img.uline.com/is/image/uline/H-9780?$LargeHD$",
            actions: ["Comprar"]
        },
        {
            "id": "2",
            "name": "Silla Ejecutiva",
            "description": "Silla ergonómica con soporte lumbar.",
            "price": "$1,599.00",
            "imageUrl": "https://img.uline.com/is/image/uline/H-2753?$LargeHD$",
            actions: ["Detalles"]
        }
    ]
}

const ChatWindow: React.FC = () => {
    const [messages, setMessages] = useState<
        { user: string; text: string; products?: Product[] }[]
    >([]);

    const [isThinking, setIsThinking] = useState(false);
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    const handleSendMessage = async (message: string) => {
        setMessages([...messages, { user: "You", text: message }]);
        setIsThinking(true);
        try {
            const response = await fetch(
                "https://rag-muebleria-production.up.railway.app/chat",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ message }),
                }
            );
            const data = await response.json();
            const newMessage = {
                user: "Bot",
                text: data.response,
                // products: data.products, // TODO: Modificar el backend para que mande la lista real. Por ahora, usamos la lista de prueba.
                products: NO_REAL_PRODUCTS.products,
            };
            setMessages((prev) => [...prev, newMessage]);
        } catch (error) {
            setMessages((prev) => [
                ...prev,
                { user: "Bot", text: "Lo siento, algo salió mal." },
            ]);
        } finally {
            setIsThinking(false); // Ocultar indicador de carga
        }
    }

    const handleAction = (action: string, product: Product) => {
        if (action === "Comprar") {
            alert(`Has seleccionado comprar el producto: ${product.name}`);
        } else if (action === "Detalles") {
            alert(`Detalles del producto: ${product.description}`);
        }
    };

    useEffect(() => {
        if (lastMessageRef.current) {
            lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages, isThinking]);

    return (
        <div className="fixed bottom-20 right-10 w-96 min-h-96 max-h-[800px] bg-secondary shadow-lg rounded-lg flex flex-col">
            <div className="bg-primary text-white p-4 text-center rounded-t-lg">
                Chatbot
            </div>
            <div className="flex-1 p-4 overflow-y-scroll space-y-2">
                {messages.map((msg, index) => (
                    <div key={index}>
                        <MessageBubble user={msg.user} text={msg.text} />
                        {msg.products && (
                            <ProductCarousel
                                products={msg.products}
                                onAction={handleAction}
                            />
                        )}
                    </div>
                ))}

                {isThinking && (
                    <div className="flex justify-start">
                        <BotThinking />
                    </div>
                )}

                <div ref={lastMessageRef} />
            </div>
            <ChatInput onSendMessage={handleSendMessage} isDisabled={isThinking} />

            {!isThinking && <QuickReplies onReply={handleSendMessage} />}

        </div>
    );
};

export default ChatWindow;
