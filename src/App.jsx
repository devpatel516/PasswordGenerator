
import { useEffect, useCallback, useState, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(6);
  const [numberAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const [btntext, changetxt] = useState('copy');
  const [message,displayMsg]=useState('');
  const passref = useRef(null);
  const copy = () => {
    window.navigator.clipboard.writeText(password);
  //passref.current.select();
    changetxt('copied')
    displayMsg('Password copied to clipboard successfully.')
    setTimeout(()=>displayMsg(''),1500);
    setTimeout(() => changetxt('copy'), 1500);
  }
  const generatePassword = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numberAllowed) {
      str += "0123456789"
    }
    if (charAllowed) {
      str += "!@#$%^&*()_+"
    }
    for (let i = 1; i < length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char);
    }
    setPassword(pass)
  }, [length, numberAllowed, charAllowed]);
  useEffect(() => {
    generatePassword();
  }, [length, numberAllowed, charAllowed])
  return (
  <>
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#f3eacb] via-[#e2d2b9] to-[#cbb89d] p-4">
      <div className="w-full max-w-md bg-[#fef9e7] border border-[#aa8456] shadow-[0_4px_12px_rgba(0,0,0,0.3)] rounded-xl p-6 relative font-serif text-[#3b2f2f]">
        <h1 className="text-center text-2xl font-bold mb-6 text-[#5a3e2b] tracking-wide border-b border-[#a0784c] pb-2">
          🗝️ Password Forge
        </h1>

        <div className="flex rounded overflow-hidden mb-5 border border-[#a0784c] bg-[#fdf6e3]">
          <input
            type="text"
            value={password}
            className="w-full px-4 py-3 bg-transparent text-[#3b2f2f] font-mono tracking-widest placeholder:text-[#b49f87] outline-none"
            placeholder="Your forged password"
            readOnly
            ref={passref}
          />
          <button
            onClick={copy}
            className="bg-[#7c5c3b] text-[#fffaf0] px-4 py-2 text-sm uppercase font-bold hover:bg-[#5e4123] transition"
          >
            {btntext}
          </button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label htmlFor="length" className="text-sm font-semibold">
              Length: <span className="text-[#4b3829]">{length}</span>
            </label>
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
              className="accent-[#a0784c] w-2/3"
            />
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="num"
              checked={numberAllowed}
              onChange={() => setNumAllowed((prev) => !prev)}
              className="accent-[#8b6b45]"
            />
            <label htmlFor="num" className="text-sm font-medium">
              Include Ancient Numerals
            </label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="char"
              checked={charAllowed}
              onChange={() => setCharAllowed((prev) => !prev)}
              className="accent-[#8b6b45]"
            />
            <label htmlFor="char" className="text-sm font-medium">
              Include Sacred Symbols
            </label>
          </div>
        </div>

        {message && (
          <div className="text-center mt-6 text-[#5a3e2b] text-sm italic animate-pulse">
            {message}
          </div>
        )}

        <div className="absolute -top-4 -right-4 bg-[#7c5c3b] text-white text-xs px-3 py-1 rounded-full shadow-lg">
          🏺 Scroll Sealed
        </div>
      </div>
    </div>
  </>
);

}

export default App
