'use client';

import React, { useState, useEffect, useRef } from 'react';

const SUGGESTED_QUESTIONS = [
  { text: '¿Qué es el Nuevo RUS?', reply: 'El Nuevo Régimen Único Simplificado (NRUS) es un régimen tributario creado para pequeños comerciantes y productores. Te permite pagar una cuota mensual fija (S/ 20 o S/ 50) en lugar de declarar IGV y Renta.' },
  { text: '¿Cómo calculo mi cuota?', reply: 'El cálculo depende de tus topes mensuales de ventas y compras: \n• Si ambas son menores o iguales a S/ 5,000, pagas S/ 20 (Categoría 1).\n• Si alguna está entre S/ 5,001 y S/ 8,000, pagas S/ 50 (Categoría 2).\n• Si excedes S/ 8,000, recibirás una alerta crítica porque superas los límites permitidos.' },
  { text: '¿Qué es un gasto deducible?', reply: 'Para el NRUS, las compras de mercadería que registras sirven como sustento legal ante posibles decomisos y para asegurarte de no pasar el tope de S/ 8,000 al mes. ¡Es tu escudo legal!' },
  { text: '¿Cómo obtengo mi Clave SOL?', reply: 'La Clave SOL es tu contraseña secreta de la SUNAT. Puedes obtenerla gratis por internet descargando la app "Personas SUNAT" en tu celular con tu DNI, o yendo a cualquier oficina de SUNAT.' },
];

export default function AiAssistantDrawer() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: '¡Hola! Soy tu asistente de Formalia. Noto que estás revisando tu estado fiscal. ¿Te gustaría saber cómo deducir tus compras o tienes alguna duda sobre el Nuevo RUS?',
      time: 'Justo ahora',
      isJargonExplanation: true,
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSend = (textToSend) => {
    if (!textToSend.trim()) return;

    // Add user message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: textToSend,
      time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      let replyText = 'Entiendo tu consulta sobre temas tributarios. Como asistente de Formalia, te recomiendo vigilar tus registros diarios y cumplir con tu Roadmap de formalización para evitar sanciones.';
      
      // Match predefined questions
      const matchingQuestion = SUGGESTED_QUESTIONS.find(
        (q) => textToSend.toLowerCase().includes(q.text.toLowerCase()) || 
               q.text.toLowerCase().includes(textToSend.toLowerCase())
      );
      if (matchingQuestion) {
        replyText = matchingQuestion.reply;
      } else if (textToSend.toLowerCase().includes('sol') || textToSend.toLowerCase().includes('clave')) {
        replyText = SUGGESTED_QUESTIONS[3].reply;
      } else if (textToSend.toLowerCase().includes('cuota') || textToSend.toLowerCase().includes('pagar')) {
        replyText = SUGGESTED_QUESTIONS[1].reply;
      } else if (textToSend.toLowerCase().includes('gasto') || textToSend.toLowerCase().includes('compras')) {
        replyText = SUGGESTED_QUESTIONS[2].reply;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'bot',
          text: replyText,
          time: new Date().toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit' }),
        }
      ]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <>
      {/* Floating Action Button (FAB) */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 right-4 md:bottom-6 md:right-6 z-50 w-14 h-14 bg-gradient-to-tr from-primary to-secondary text-white rounded-full flex items-center justify-center shadow-xl cursor-pointer hover:scale-105 active:scale-95 transition-all node-pulse"
        aria-label="Asistente IA"
      >
        <span className="material-symbols-outlined text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
          smart_toy
        </span>
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-on-surface/40 backdrop-blur-[2px] z-50 transition-opacity flex justify-end items-end md:items-center md:p-6">
          <div className="absolute inset-0" onClick={() => setIsOpen(false)} />
          
          {/* Chat Panel */}
          <div className="relative w-full md:w-[420px] md:h-[620px] h-[85vh] bg-surface-container-lowest md:rounded-[32px] rounded-t-[32px] shadow-2xl flex flex-col overflow-hidden border border-outline-variant/20 animate-toast">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-lg text-on-primary flex items-center justify-between shadow-md">
              <div className="flex items-center gap-md">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center">
                  <span className="material-symbols-outlined text-on-secondary-container text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    smart_toy
                  </span>
                </div>
                <div>
                  <h2 className="font-headline-md text-headline-md leading-tight text-white">Asistente Formalia</h2>
                  <span className="font-label-sm text-label-sm text-white/80 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-secondary-fixed animate-pulse"></span> Siempre en línea
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-full text-white transition-colors cursor-pointer"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-grow p-lg space-y-lg overflow-y-auto bg-surface-bright custom-scrollbar flex flex-col gap-4">
              <div className="text-center my-2">
                <span className="bg-surface-container-high px-md py-xs rounded-full font-label-sm text-label-sm text-on-surface-variant">
                  Hoy
                </span>
              </div>

              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-xs max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div
                    className={`p-md rounded-2xl font-body-md text-body-md shadow-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-gradient-to-tr from-primary to-secondary text-on-primary rounded-tr-none shadow-md'
                        : 'bg-surface-container text-on-surface rounded-tl-none border border-outline-variant/20'
                    }`}
                  >
                    {msg.isJargonExplanation && (
                      <div className="flex items-center gap-xs mb-2 text-secondary font-bold font-label-md">
                        <span className="material-symbols-outlined text-[18px]">lightbulb</span>
                        Consejo Formalia
                      </div>
                    )}
                    {msg.text}
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant px-2">
                    {msg.sender === 'user' ? 'Tú' : 'Formalia AI'} • {msg.time}
                  </span>
                </div>
              ))}

              {isTyping && (
                <div className="flex flex-col gap-xs max-w-[85%] self-start items-start">
                  <div className="bg-surface-container text-on-surface p-md rounded-2xl rounded-tl-none font-body-md text-body-md shadow-sm flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce"></span>
                    <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                    <span className="w-2 h-2 bg-on-surface-variant/40 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions Suggestions */}
            <div className="px-lg py-2 bg-surface-bright flex gap-sm overflow-x-auto whitespace-nowrap scrollbar-none border-t border-outline-variant/10">
              {SUGGESTED_QUESTIONS.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => handleSend(q.text)}
                  className="px-md py-1.5 border border-outline-variant hover:border-primary rounded-full font-label-sm text-label-sm bg-surface-container-lowest hover:bg-primary-fixed text-primary transition-all active:scale-95 cursor-pointer"
                >
                  {q.text}
                </button>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-md bg-surface-container-lowest border-t border-outline-variant/30 flex gap-2 items-center">
              <input
                type="text"
                placeholder="Escribe tu duda aquí..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend(inputVal);
                }}
                className="flex-grow h-12 px-md border border-outline-variant focus:border-primary focus:ring-1 focus:ring-primary rounded-xl font-body-md text-body-md outline-none bg-surface-bright"
              />
              <button
                onClick={() => handleSend(inputVal)}
                className="w-12 h-12 bg-primary text-on-primary rounded-xl flex items-center justify-center shadow hover:opacity-90 active:scale-95 transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-white">send</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </>
  );
}
