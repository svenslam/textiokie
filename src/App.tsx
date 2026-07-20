import React, { useState, useEffect } from "react";
import { 
  Music, 
  Trophy, 
  Play, 
  Check, 
  X, 
  RotateCcw, 
  Plus, 
  Trash2, 
  UserPlus, 
  Sparkles, 
  ExternalLink, 
  Flame, 
  Users, 
  Mic2, 
  Star, 
  Disc, 
  Volume2 
} from "lucide-react";

// Structure of a Song object
interface Song {
  id: number;
  lyrics: string[]; // array of 2 lines
  title: string;
  artist: string;
}

// Structure of a Player object
interface Player {
  id: string;
  name: string; // 3 initials
  score: number;
  streak: number;
}

// Static list of 22 super-popular karaoke songs (Dutch hits & international classics)
const SONGS_DATABASE: Song[] = [
  {
    id: 1,
    lyrics: ["Niets is mooier dan met jou het land door te kruisen", "Op de fiets of in de auto, we horen de zee ruisen"],
    title: "Zoutelande",
    artist: "BLØF ft. Geike Arnaert"
  },
  {
    id: 2,
    lyrics: ["Leef, alsof het je laatste dag is", "Leef, alsof de morgen niet bestaat"],
    title: "Leef",
    artist: "André Hazes Jr."
  },
  {
    id: 3,
    lyrics: ["Het is een nacht, die je normaal alleen in films ziet", "Het is een nacht, die wordt bezongen in het mooiste lied"],
    title: "Het Is Een Nacht",
    artist: "Guus Meeuwis & Vagant"
  },
  {
    id: 4,
    lyrics: ["Welkom in Europa, blijf hier tot ik doodga", "Euro-pa-pa, Euro-pa-pa"],
    title: "Europapa",
    artist: "Joost Klein"
  },
  {
    id: 5,
    lyrics: ["En we dansen, want het is een noodgeval", "Er is geen redden meer aan, we gaan eraf"],
    title: "Noodgeval",
    artist: "Goldband"
  },
  {
    id: 6,
    lyrics: ["Liever snel naar de hel met jou dan langzaam naar de hemel", "Want ik weet dat jij het ook zo voelt"],
    title: "Liever Snel Naar De Hel",
    artist: "Roxy Dekker"
  },
  {
    id: 7,
    lyrics: ["Laat me terug in de tijd, terug naar het begin", "Waar alles nog zo simpel was, met jou had alles zin"],
    title: "Terug In De Tijd",
    artist: "Yves Berendse"
  },
  {
    id: 8,
    lyrics: ["Ik wil je stiekem, als m'n vrienden het niet zien", "Ik wil je stiekem, op de achterbank misschien"],
    title: "Stiekem",
    artist: "Maan & Goldband"
  },
  {
    id: 9,
    lyrics: ["En dan denk ik aan Brabant, want daar brandt nog licht", "En dan denk ik aan Brabant, want daar brandt nog licht"],
    title: "Brabant",
    artist: "Guus Meeuwis"
  },
  {
    id: 10,
    lyrics: ["15 miljoen mensen op dat hele kleine stukje aarde", "Die schrijf je niet de wetten voor, die laat je in hun waarde"],
    title: "15 Miljoen Mensen",
    artist: "Fluitsma & Van Tijn"
  },
  {
    id: 11,
    lyrics: ["Want je bent smoorverliefd op haar", "Maar zij ziet jou niet staan, da's raar"],
    title: "Smoorverliefd",
    artist: "Snelle"
  },
  {
    id: 12,
    lyrics: ["Is this the real life? Is this just fantasy?", "Caught in a landslide, no escape from reality"],
    title: "Bohemian Rhapsody",
    artist: "Queen"
  },
  {
    id: 13,
    lyrics: ["You can dance, you can jive", "Having the time of your life"],
    title: "Dancing Queen",
    artist: "ABBA"
  },
  {
    id: 14,
    lyrics: ["Sweet Caroline", "Good times never seemed so good"],
    title: "Sweet Caroline",
    artist: "Neil Diamond"
  },
  {
    id: 15,
    lyrics: ["Tell me why, ain't nothin' but a heartache", "Tell me why, ain't nothin' but a mistake"],
    title: "I Want It That Way",
    artist: "Backstreet Boys"
  },
  {
    id: 16,
    lyrics: ["If you want my future, forget my past", "If you wanna get with me, better make it fast"],
    title: "Wannabe",
    artist: "Spice Girls"
  },
  {
    id: 17,
    lyrics: ["And through it all she offers me protection", "A lot of love and affection, whether I'm right or wrong"],
    title: "Angels",
    artist: "Robbie Williams"
  },
  {
    id: 18,
    lyrics: ["Kleine jongen, je bent nog zo klein", "En je weet nog niks van verdriet of van pijn"],
    title: "Kleine Jongen",
    artist: "André Hazes"
  },
  {
    id: 19,
    lyrics: ["Ik neem je mee, op reis", "Naar een heel ander paradijs"],
    title: "Ik Neem Je Mee",
    artist: "Gers Pardoel"
  },
  {
    id: 20,
    lyrics: ["I'm in love with the shape of you", "We push and pull like a magnet do"],
    title: "Shape of You",
    artist: "Ed Sheeran"
  },
  {
    id: 21,
    lyrics: ["Oerend hard kwamen zij daar aangescheurd", "Want dat vonden zij een heel spektakel, dat was een hele gebeurt"],
    title: "Oerend Hard",
    artist: "Normaal"
  },
  {
    id: 22,
    lyrics: ["Zij gelooft in mij", "Zij ziet toekomst in ons allebei"],
    title: "Zij Gelooft In Mij",
    artist: "André Hazes"
  }
];

export default function App() {
  const [players, setPlayers] = useState<Player[]>([
    { id: "1", name: "SVE", score: 0, streak: 0 },
    { id: "2", name: "KIM", score: 0, streak: 0 },
    { id: "3", name: "TIM", score: 0, streak: 0 }
  ]);
  const [newPlayerName, setNewPlayerName] = useState("");
  const [shuffledSongs, setShuffledSongs] = useState<Song[]>([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameEnded, setGameEnded] = useState(false);
  const [solutionRevealed, setSolutionRevealed] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  // Helper to trigger brief alerts/toasts
  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => {
      setToast(null);
    }, 3000);
  };

  // Fisher-Yates Shuffle
  const shuffleSongs = (songsList: Song[]) => {
    const arr = [...songsList];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  };

  // Add a player
  const handleAddPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = newPlayerName.trim().toUpperCase();
    
    if (!cleanName) {
      showToast("Voer a.u.b. initialen in.");
      return;
    }
    if (cleanName.length > 3) {
      showToast("Initialen mogen maximaal 3 letters zijn.");
      return;
    }
    if (players.some(p => p.name === cleanName)) {
      showToast("Deze speler bestaat al!");
      return;
    }

    const newPlayer: Player = {
      id: Date.now().toString(),
      name: cleanName,
      score: 0,
      streak: 0
    };

    setPlayers([...players, newPlayer]);
    setNewPlayerName("");
    showToast(`Speler ${cleanName} toegevoegd!`);
  };

  // Remove a player (only allowed before starting)
  const handleRemovePlayer = (id: string) => {
    setPlayers(players.filter(p => p.id !== id));
  };

  // Start the game
  const handleStartGame = () => {
    if (players.length === 0) {
      showToast("Voeg minimaal 1 speler toe om te starten!");
      return;
    }
    
    // Shuffle the database songs
    const randomized = shuffleSongs(SONGS_DATABASE);
    setShuffledSongs(randomized);
    setCurrentSongIndex(0);
    setCurrentPlayerIndex(0);
    setSolutionRevealed(false);
    setGameStarted(true);
    setGameEnded(false);
    
    // Reset scores for a fresh start
    setPlayers(players.map(p => ({ ...p, score: 0, streak: 0 })));
    showToast("Laat het zingen beginnen! 🎤");
  };

  // Reveal title & Spotify link
  const handleRevealSolution = () => {
    setSolutionRevealed(true);
  };

  // Handle scoring and move to next turn
  const handleAnswer = (isCorrect: boolean) => {
    // 1. Update scores
    const activePlayer = players[currentPlayerIndex];
    const updatedPlayers = players.map((p, idx) => {
      if (idx === currentPlayerIndex) {
        if (isCorrect) {
          const newStreak = p.streak + 1;
          return {
            ...p,
            score: p.score + 1,
            streak: newStreak
          };
        } else {
          return {
            ...p,
            streak: 0
          };
        }
      }
      return p;
    });

    setPlayers(updatedPlayers);

    // 2. Determine if streak bonus message should be shown
    if (isCorrect) {
      const nextStreak = activePlayer.streak + 1;
      if (nextStreak >= 3) {
        showToast(`🔥 ${activePlayer.name} is ON FIRE! ${nextStreak} goede antwoorden op rij!`);
      } else {
        showToast(`Lekker gezongen, ${activePlayer.name}! +1 punt`);
      }
    } else {
      showToast(`Helaas! Volgende keer beter, ${activePlayer.name}.`);
    }

    // 3. Move to next turn / next song
    const nextSongIndex = currentSongIndex + 1;
    if (nextSongIndex >= shuffledSongs.length) {
      // Out of songs! End game
      setGameEnded(true);
    } else {
      setCurrentSongIndex(nextSongIndex);
      setSolutionRevealed(false);
      // Rotate active player index
      setCurrentPlayerIndex((currentPlayerIndex + 1) % players.length);
    }
  };

  // Restart/Reset to setup
  const handleResetGame = () => {
    setGameStarted(false);
    setGameEnded(false);
    setSolutionRevealed(false);
    setCurrentSongIndex(0);
    setCurrentPlayerIndex(0);
  };

  // Get active song and player
  const currentSong = shuffledSongs[currentSongIndex];
  const activePlayer = players[currentPlayerIndex];

  // Sorted scoreboard players for ranking display
  const sortedPlayersByRank = [...players].sort((a, b) => {
    if (b.score !== a.score) {
      return b.score - a.score;
    }
    return b.streak - a.streak; // tiebreaker: higher streak
  });

  const leader = sortedPlayersByRank[0];

  return (
    <div id="app-root" className="min-h-screen bg-neutral-950 text-stone-100 font-sans selection:bg-emerald-500 selection:text-black flex flex-col antialiased">
      
      {/* Toast Alert Popup */}
      {toast && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 bg-emerald-500 text-black px-6 py-3 rounded-full font-bold shadow-2xl flex items-center gap-2 animate-bounce border-2 border-white/20">
          <Sparkles className="h-5 w-5 animate-pulse" />
          <span>{toast}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8 justify-center items-stretch">
        
        {/* LEFT COLUMN: Main Game / Setup Workspace */}
        <div className="flex-1 flex flex-col justify-between bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-6 md:p-10 shadow-2xl relative overflow-hidden backdrop-blur-md">
          
          {/* Subtle decorative glow in top left corner */}
          <div className="absolute -top-24 -left-24 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* HEADER */}
          <div className="flex items-center justify-between border-b border-zinc-800/60 pb-6 mb-6">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-black shadow-lg shadow-emerald-500/20">
                <Music className="h-6 w-6 animate-pulse" />
              </div>
              <div>
                <h1 className="text-2xl md:text-3xl font-extrabold tracking-tight font-display text-white">
                  Muziek <span className="text-emerald-500">Karaoke</span> Quiz
                </h1>
                <p className="text-xs text-zinc-400">Spotify-stijl meezingfeestje</p>
              </div>
            </div>
            {gameStarted && !gameEnded && (
              <button 
                onClick={handleResetGame}
                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-lg text-xs font-semibold transition-all border border-zinc-700/50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Stop Spel
              </button>
            )}
          </div>

          {/* SCREEN 1: Setup / Startscherm */}
          {!gameStarted && (
            <div className="flex-1 flex flex-col justify-center py-6">
              <div className="max-w-xl mx-auto w-full space-y-8">
                <div className="text-center space-y-3">
                  <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
                    Spelregels
                  </span>
                  <h2 className="text-3xl font-extrabold font-display text-white">Wie durft de microfoon te pakken?</h2>
                  <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
                    Voeg alle spelers toe met hun initialen (max. 3 letters). Zing om de beurt de getoonde songtekst en verdien punten!
                  </p>
                </div>

                {/* Player Add Form */}
                <form onSubmit={handleAddPlayer} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4 shadow-xl">
                  <label className="block text-sm font-semibold text-zinc-300">Nieuwe speler initialen</label>
                  <div className="flex gap-3">
                    <input 
                      type="text"
                      maxLength={3}
                      value={newPlayerName}
                      onChange={(e) => setNewPlayerName(e.target.value)}
                      placeholder="bijv. SVE"
                      className="flex-1 bg-zinc-950 border border-zinc-800 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3.5 text-white font-mono uppercase text-lg tracking-widest placeholder:text-zinc-600 focus:outline-none transition-all"
                    />
                    <button 
                      type="submit"
                      className="px-6 bg-emerald-500 hover:bg-emerald-400 text-black font-bold rounded-xl transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 active:scale-95"
                    >
                      <UserPlus className="h-5 w-5" />
                      <span className="hidden sm:inline">Toevoegen</span>
                    </button>
                  </div>
                  <p className="text-xs text-zinc-500">Druk op Enter of klik Toevoegen. Maximaal 3 letters.</p>
                </form>

                {/* Setup Player List */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                      <Users className="h-4 w-4 text-emerald-500" />
                      Deelnemers ({players.length})
                    </span>
                    {players.length > 0 && (
                      <button 
                        onClick={() => setPlayers([])}
                        className="text-xs text-zinc-500 hover:text-red-400 transition-colors"
                      >
                        Alles wissen
                      </button>
                    )}
                  </div>

                  {players.length === 0 ? (
                    <div className="bg-zinc-900/30 border border-zinc-800/50 rounded-2xl p-8 text-center text-zinc-500 text-sm italic">
                      Nog geen spelers toegevoegd. Voeg spelers toe om de strijd te starten!
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {players.map((player) => (
                        <div 
                          key={player.id} 
                          className="bg-zinc-900 border border-zinc-800 hover:border-zinc-700 rounded-xl p-3 flex justify-between items-center group transition-all"
                        >
                          <div className="flex items-center gap-2">
                            <div className="h-7 w-7 rounded-full bg-zinc-800 text-emerald-400 font-mono text-xs font-bold flex items-center justify-center">
                              {player.name}
                            </div>
                            <span className="text-sm font-semibold text-white">{player.name}</span>
                          </div>
                          <button 
                            onClick={() => handleRemovePlayer(player.id)}
                            className="text-zinc-500 hover:text-red-400 transition-colors opacity-80 group-hover:opacity-100 p-1"
                            title="Speler verwijderen"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Big Start Button */}
                <button 
                  onClick={handleStartGame}
                  className="w-full bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold text-lg py-4 px-8 rounded-2xl shadow-xl shadow-emerald-500/10 hover:shadow-emerald-500/25 transition-all flex items-center justify-center gap-3 group active:scale-98"
                >
                  <Play className="h-6 w-6 fill-current group-hover:scale-110 transition-transform" />
                  START SPEL ({players.length} Spelers)
                </button>
              </div>
            </div>
          )}

          {/* SCREEN 2: Active Quiz / Spelscherm */}
          {gameStarted && !gameEnded && currentSong && (
            <div className="flex-1 flex flex-col justify-between py-2 space-y-8">
              
              {/* Turn Banner */}
              <div className="bg-gradient-to-r from-emerald-500/20 to-transparent border-l-4 border-emerald-500 rounded-r-xl p-4 flex items-center justify-between shadow-md">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 bg-emerald-500 text-black rounded-full flex items-center justify-center font-bold text-lg shadow-inner animate-pulse">
                    <Mic2 className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="text-zinc-400 text-xs font-semibold uppercase tracking-wider block">Nu aan de beurt:</span>
                    <span className="text-white text-xl font-bold font-display flex items-center gap-2">
                      {activePlayer?.name} 
                      {activePlayer?.streak >= 2 && (
                        <span className="flex items-center text-orange-500 text-xs font-semibold bg-orange-500/10 px-2 py-0.5 rounded-full">
                          <Flame className="h-3.5 w-3.5 fill-current mr-0.5" /> {activePlayer.streak} streak!
                        </span>
                      )}
                    </span>
                  </div>
                </div>
                
                <div className="text-right">
                  <span className="text-zinc-400 text-xs font-semibold uppercase block">Volgende beurt:</span>
                  <span className="text-zinc-300 font-medium">
                    {players[(currentPlayerIndex + 1) % players.length]?.name || "-"}
                  </span>
                </div>
              </div>

              {/* LYRICS PRESENTATION (The Karaoke Screen) */}
              <div className="flex-1 flex flex-col justify-center items-center">
                <div className="w-full bg-gradient-to-b from-zinc-900 to-zinc-950 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center relative shadow-2xl overflow-hidden min-h-[220px] flex flex-col justify-center">
                  
                  {/* Subtle music note backdrop */}
                  <Disc className="absolute -right-16 -bottom-16 w-48 h-48 text-zinc-800/10 animate-spin-slow pointer-events-none" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-1.5 text-zinc-600 font-mono text-xs">
                    <Volume2 className="h-4 w-4" />
                    <span>KARAOKE LYRICS</span>
                  </div>

                  <div className="absolute top-4 right-4 bg-zinc-800 text-zinc-400 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full uppercase">
                    Song {currentSongIndex + 1} / {shuffledSongs.length}
                  </div>

                  {/* The actual song lines */}
                  <div className="space-y-6 md:space-y-8 my-6 relative z-10">
                    <p className="text-xl md:text-3xl lg:text-4xl font-extrabold text-white leading-snug tracking-tight font-display drop-shadow-md">
                      "{currentSong.lyrics[0]}"
                    </p>
                    <p className="text-xl md:text-3xl lg:text-4xl font-extrabold text-emerald-400 leading-snug tracking-tight font-display drop-shadow-md">
                      "{currentSong.lyrics[1]}"
                    </p>
                  </div>
                </div>
              </div>

              {/* ACTION CENTER */}
              <div className="space-y-4">
                
                {/* Reveal & Spotify Row */}
                {!solutionRevealed ? (
                  <button
                    onClick={handleRevealSolution}
                    className="w-full py-4 px-6 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl tracking-wide transition-all duration-200 shadow-lg hover:shadow-zinc-800/20 active:scale-98 border border-zinc-700/60 text-base md:text-lg flex items-center justify-center gap-2 group"
                  >
                    <span>Toon Oplossing & Spotify Link</span>
                    <Sparkles className="h-5 w-5 text-emerald-400 group-hover:animate-spin" />
                  </button>
                ) : (
                  <div className="space-y-5 animate-fade-in">
                    
                    {/* Solution Details & Spotify Redirect */}
                    <div className="bg-zinc-900 border-2 border-emerald-500/40 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xl">
                      <div className="text-center md:text-left">
                        <span className="text-emerald-500 text-xs font-bold uppercase tracking-widest block mb-1">
                          Het juiste antwoord is:
                        </span>
                        <h3 className="text-xl md:text-2xl font-extrabold text-white leading-tight">
                          {currentSong.title}
                        </h3>
                        <p className="text-zinc-400 text-sm md:text-base">
                          {currentSong.artist}
                        </p>
                      </div>

                      {/* Official Spotify search structure */}
                      <a 
                        href={`https://open.spotify.com/search/${encodeURIComponent(currentSong.artist + ' ' + currentSong.title)}`}
                        target="_blank" 
                        rel="noreferrer noopener"
                        className="bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold px-6 py-3 rounded-full shadow-lg shadow-emerald-500/20 flex items-center gap-2 text-sm transition-all duration-200 active:scale-95 whitespace-nowrap"
                      >
                        {/* Custom Spotify Circle SVG */}
                        <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424c-.18.295-.565.387-.86.207-2.377-1.454-5.37-1.783-8.893-.98-.336.075-.668-.135-.745-.47-.077-.337.135-.668.47-.745 3.856-.88 7.15-.5 9.822 1.137.294.18.385.565.206.86zm1.224-2.723c-.226.367-.707.487-1.074.26-2.72-1.672-6.87-2.157-10.082-1.182-.413.125-.85-.107-.975-.52-.125-.413.107-.85.52-.975 3.673-1.114 8.243-.574 11.35 1.34.368.226.49.707.262 1.075zm.107-2.835C14.392 8.71 8.41 8.51 4.963 9.557c-.53.16-1.09-.14-1.25-.67-.16-.53.14-1.09.67-1.25 3.974-1.206 10.56-.974 14.61 1.432.477.283.633.9.35 1.378-.283.478-.9.634-1.378.352z"/>
                        </svg>
                        Luister op Spotify
                        <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>

                    {/* GOED / FOUT Buttons */}
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={() => handleAnswer(false)}
                        className="py-4 bg-zinc-800 hover:bg-red-500/20 hover:text-red-400 text-zinc-300 font-bold rounded-2xl transition-all duration-200 border border-zinc-700/50 hover:border-red-500/30 flex items-center justify-center gap-2 active:scale-95"
                      >
                        <X className="h-5 w-5 text-red-500" />
                        FOUT
                      </button>

                      <button
                        onClick={() => handleAnswer(true)}
                        className="py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/25 flex items-center justify-center gap-2 active:scale-95"
                      >
                        <Check className="h-5 w-5 stroke-[3px]" />
                        GOED (+1 pt)
                      </button>
                    </div>

                  </div>
                )}
              </div>

            </div>
          )}

          {/* SCREEN 3: End Scoreboard & Podium / Game Over */}
          {gameStarted && gameEnded && (
            <div className="flex-1 flex flex-col justify-center items-center py-6 space-y-8 animate-fade-in">
              <div className="text-center space-y-3">
                <span className="bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider border border-emerald-500/20">
                  Quiz afgelopen!
                </span>
                <h2 className="text-4xl font-extrabold font-display text-white">Applaus voor de zangers! 👏</h2>
                <p className="text-zinc-400 text-sm max-w-md mx-auto">
                  Alle nummers zijn gespeeld. Hier is de uiteindelijke uitslag van deze karaoke battle!
                </p>
              </div>

              {/* Interactive Podium */}
              <div className="w-full max-w-md bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-xl flex flex-col items-center">
                
                {/* Winner Spotlight */}
                {leader && (
                  <div className="text-center space-y-2 mb-8 animate-bounce">
                    <Trophy className="h-16 w-16 text-yellow-500 mx-auto drop-shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
                    <div>
                      <span className="text-zinc-500 text-xs font-semibold uppercase tracking-widest block">Koning(in) van de Karaoke</span>
                      <h3 className="text-3xl font-extrabold font-display text-white">{leader.name}</h3>
                      <p className="text-emerald-400 font-bold text-lg">{leader.score} Punten</p>
                    </div>
                  </div>
                )}

                {/* All final scores */}
                <div className="w-full space-y-2.5">
                  <h4 className="text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-2 text-left">Eindklassement</h4>
                  {sortedPlayersByRank.map((player, index) => (
                    <div 
                      key={player.id} 
                      className={`flex justify-between items-center px-4 py-3 rounded-xl border ${
                        index === 0 
                          ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" 
                          : "bg-zinc-950/50 border-zinc-800/80 text-zinc-300"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-zinc-500 font-bold">#{index + 1}</span>
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs ${
                          index === 0 ? "bg-emerald-500 text-black" : "bg-zinc-800 text-zinc-400"
                        }`}>
                          {player.name}
                        </div>
                        <span className="font-bold text-white">{player.name}</span>
                      </div>
                      <span className="font-extrabold text-sm text-right">{player.score} pt</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Play Again Button */}
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                <button
                  onClick={handleResetGame}
                  className="flex-1 py-4 bg-zinc-800 hover:bg-zinc-700 text-white font-bold rounded-2xl transition-all duration-200 active:scale-95 border border-zinc-700/50"
                >
                  Nieuwe Spelers
                </button>
                <button
                  onClick={handleStartGame}
                  className="flex-1 py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-extrabold rounded-2xl transition-all duration-200 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 active:scale-95"
                >
                  Nieuwe Ronde!
                </button>
              </div>

            </div>
          )}

        </div>

        {/* RIGHT COLUMN: Sidebar Scoreboard (Continuous visibility) */}
        <div className="w-full lg:w-80 bg-zinc-900/40 rounded-3xl border border-zinc-800/80 p-6 shadow-2xl backdrop-blur-md flex flex-col justify-between">
          <div className="space-y-6">
            
            {/* Title / Header of scoreboard */}
            <div className="flex justify-between items-center border-b border-zinc-800/60 pb-4">
              <span className="text-white font-bold tracking-tight text-lg flex items-center gap-2">
                <Trophy className="h-5 w-5 text-emerald-500" />
                Scoreboard
              </span>
              <span className="text-[10px] bg-zinc-800 text-emerald-400 font-mono px-2 py-0.5 rounded-full font-bold uppercase">
                Live Rank
              </span>
            </div>

            {/* Scoreboard entries */}
            {players.length === 0 ? (
              <div className="py-12 text-center text-zinc-600 text-sm italic">
                Geen spelers actief. Voeg ze links toe!
              </div>
            ) : (
              <div className="space-y-3">
                {sortedPlayersByRank.map((player, index) => {
                  const isActive = gameStarted && !gameEnded && players[currentPlayerIndex]?.id === player.id;
                  
                  return (
                    <div 
                      key={player.id}
                      className={`relative overflow-hidden rounded-2xl border p-4 transition-all duration-300 ${
                        isActive 
                          ? "bg-gradient-to-r from-zinc-900 to-zinc-850 border-emerald-500 shadow-md shadow-emerald-500/5" 
                          : "bg-zinc-900/30 border-zinc-800/80 hover:bg-zinc-900/50"
                      }`}
                    >
                      {/* Active indicator bar */}
                      {isActive && (
                        <div className="absolute top-0 left-0 bottom-0 w-1 bg-emerald-500" />
                      )}

                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-3">
                          {/* Rank badge */}
                          <span className={`text-[10px] font-mono font-bold w-4 text-center ${
                            index === 0 ? "text-yellow-500" : index === 1 ? "text-zinc-400" : index === 2 ? "text-amber-600" : "text-zinc-600"
                          }`}>
                            {index + 1}
                          </span>

                          {/* Initials badge */}
                          <div className={`h-8 w-8 rounded-full font-bold font-mono text-xs flex items-center justify-center transition-transform duration-300 ${
                            isActive 
                              ? "bg-emerald-500 text-black scale-105 shadow-md shadow-emerald-500/20" 
                              : "bg-zinc-800 text-zinc-400"
                          }`}>
                            {player.name}
                          </div>

                          <div>
                            <span className="font-bold text-sm block text-white flex items-center gap-1.5">
                              {player.name}
                              {index === 0 && <Star className="h-3.5 w-3.5 text-yellow-500 fill-current" />}
                            </span>
                            {player.streak >= 2 && (
                              <span className="text-[10px] text-orange-500 font-semibold flex items-center gap-0.5 mt-0.5">
                                <Flame className="h-3 w-3 fill-current" /> {player.streak} streak
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Point display */}
                        <div className="text-right">
                          <span className="text-white text-lg font-extrabold tracking-tight block">
                            {player.score}
                          </span>
                          <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                            punten
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Leaderboard footer summary */}
          {players.length > 0 && (
            <div className="border-t border-zinc-800/60 pt-4 mt-6">
              <div className="bg-zinc-900/50 rounded-xl p-3 flex justify-between items-center text-xs">
                <span className="text-zinc-500 font-medium">Koploper:</span>
                <span className="text-emerald-400 font-bold flex items-center gap-1">
                  {leader?.name || "-"} ({leader?.score || 0} pt)
                </span>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Footer */}
      <footer className="py-6 border-t border-zinc-900 text-center text-xs text-zinc-600">
        <p>© 2026 Muziek Karaoke Quiz • Geïnspireerd op Spotify • Zing mee!</p>
      </footer>

    </div>
  );
}
