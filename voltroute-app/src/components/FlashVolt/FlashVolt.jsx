import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { processQuery } from './engine';

// Expose a global open trigger for external buttons (e.g. Landing page voice button)
let _globalOpen = null;
export function openFlashVolt() { if (_globalOpen) _globalOpen(); }

export default function FlashVolt() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: "Hey! I'm **FlashVolt** ⚡ — your AI EV travel companion.\n\n• 🗺️ Plan trips\n• ⚡ Find stations\n• 💰 Calculate costs\n• 🧭 Navigate the app\n• 🎤 Use voice commands!\n\nType or speak your question below!" }
  ]);
  const [input, setInput] = useState('');
  const [isListening, setIsListening] = useState(false);
  const msgsRef = useRef(null);
  const inputRef = useRef(null);
  const recognitionRef = useRef(null);
  const navigate = useNavigate();

  // Register global opener
  useEffect(() => {
    _globalOpen = () => setOpen(true);
    return () => { _globalOpen = null; };
  }, []);

  useEffect(() => { if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight; }, [messages]);
  useEffect(() => { if (open && inputRef.current) inputRef.current.focus(); }, [open]);

  // Initialize Web Speech API
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-IN';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(transcript);
        setIsListening(false);
        // Auto-send after a short delay so user can see what was captured
        setTimeout(() => {
          if (transcript.trim()) {
            setMessages(m => [...m, { role: 'user', text: transcript.trim() }]);
            setInput('');
            setTimeout(() => {
              const result = processQuery(transcript.trim());
              setMessages(m => [...m, { role: 'assistant', text: result.text }]);
              if (result.action?.type === 'navigate') navigate(result.action.path);
            }, 400);
          }
        }, 300);
      };

      recognition.onerror = () => setIsListening(false);
      recognition.onend = () => setIsListening(false);
      recognitionRef.current = recognition;
    }
  }, [navigate]);

  const toggleVoice = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const send = useCallback(() => {
    const q = input.trim();
    if (!q) return;
    setMessages(m => [...m, { role: 'user', text: q }]);
    setInput('');
    setTimeout(() => {
      const result = processQuery(q);
      setMessages(m => [...m, { role: 'assistant', text: result.text }]);
      if (result.action?.type === 'navigate') navigate(result.action.path);
    }, 400);
  }, [input, navigate]);

  const formatMsg = (text) => text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');

  return (
    <>
      {open && <div className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-sm" onClick={() => setOpen(false)} />}

      {/* Panel */}
      <div className={`fixed bottom-24 right-5 z-[9999] w-[370px] max-w-[calc(100vw-40px)] max-h-[480px] rounded-3xl shadow-2xl overflow-hidden flex flex-col transition-all duration-300 ${open ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : 'opacity-0 translate-y-4 scale-95 pointer-events-none'}`}
        style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(30px)' }}>
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 bg-gradient-to-r from-primary to-primary-container text-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{background:'rgba(255,255,0,0.25)'}}>
              <span className="material-symbols-outlined text-[#FFD600]" style={{fontSize:18,fontVariationSettings:"'FILL' 1"}}>bolt</span>
            </div>
            <div>
              <div className="text-sm font-extrabold font-headline tracking-tight">FlashVolt</div>
              <div className="text-[10px] opacity-70 font-semibold uppercase tracking-wider">AI Travel Companion</div>
            </div>
          </div>
          <button onClick={() => setOpen(false)} className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>

        {/* Messages */}
        <div ref={msgsRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
          {messages.map((m, i) => (
            <div key={i} className={`max-w-[85%] px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed fade-in-up ${
              m.role === 'user'
                ? 'ml-auto bg-gradient-to-r from-primary to-primary-container text-white rounded-br-sm'
                : 'bg-surface-container-low text-on-surface rounded-bl-sm'
            }`} dangerouslySetInnerHTML={{ __html: formatMsg(m.text) }} />
          ))}
          {isListening && (
            <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-2xl bg-error/10 text-error text-[13px] font-bold fade-in-up">
              <span className="w-2.5 h-2.5 bg-error rounded-full animate-pulse" />
              Listening...
            </div>
          )}
        </div>

        {/* Input */}
        <div className="flex items-center gap-2 px-3.5 py-3 border-t border-surface-container-high bg-white/60">
          <button onClick={toggleVoice}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${isListening ? 'bg-error text-white animate-pulse' : 'bg-surface-container-low text-on-surface-variant hover:bg-primary/10 hover:text-primary'}`}
            title="Voice input">
            <span className="material-symbols-outlined" style={{fontSize:18,fontVariationSettings: isListening ? "'FILL' 1" : "'FILL' 0"}}>mic</span>
          </button>
          <input ref={inputRef} value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && send()}
            className="flex-1 bg-surface-container-low rounded-xl px-3.5 py-2.5 text-[13px] border-none focus:ring-0"
            placeholder={isListening ? 'Speak now...' : 'Ask FlashVolt anything...'} />
          <button onClick={send} className="w-9 h-9 rounded-xl bg-gradient-to-r from-primary to-primary-container text-white flex items-center justify-center hover:opacity-90 transition-opacity">
            <span className="material-symbols-outlined" style={{fontSize:18}}>send</span>
          </button>
        </div>
      </div>

      {/* Orb */}
      <button onClick={() => setOpen(o => !o)}
        className="fixed bottom-6 right-6 z-[9999] w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
        style={{
          background: open ? 'linear-gradient(135deg,#ba1a1a,#ff6b6b)' : 'linear-gradient(135deg,#1a1a2e,#16213e)',
          border: `2.5px solid ${open ? '#ff6b6b' : '#FFD600'}`,
          color: open ? 'white' : '#FFD600',
          boxShadow: open ? '0 4px 20px rgba(186,26,26,0.35)' : '0 4px 20px rgba(255,214,0,0.35)',
        }}>
        <span className="material-symbols-outlined text-[28px]" style={{fontVariationSettings:"'FILL' 1"}}>
          {open ? 'close' : 'bolt'}
        </span>
      </button>
    </>
  );
}
