import React, { useState, useEffect } from "react";
import {
  Gamepad2,
  Sparkles,
  Trophy,
  RotateCcw,
  Volume2,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Zap,
  ArrowRight,
  Flame,
  Star,
  Clock,
  X
} from "lucide-react";
import { soundManager } from "../utils/audioSynthesizer";
import { speechVoice } from "../utils/speechVoice";
import { TRIVIA_QUESTIONS, WORD_PUZZLES, MATH_CHALLENGES } from "../utils/geminiStoryGenerator";
import confetti from "canvas-confetti";

interface GamesPlayroomProps {
  onClose?: () => void;
  isModal?: boolean;
}

export const GamesPlayroom: React.FC<GamesPlayroomProps> = ({ onClose, isModal = false }) => {
  const [selectedGame, setSelectedGame] = useState<"factblast" | "wordwizard" | "mathquest" | "memorymaster">("factblast");

  // Global Player Stats
  const [totalStarsWon, setTotalStarsWon] = useState(0);

  // -------------------------------------------------------------
  // GAME 1: FACTBLAST TRIVIA STATE
  // -------------------------------------------------------------
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaSelectedOption, setTriviaSelectedOption] = useState<number | null>(null);
  const [triviaScore, setTriviaScore] = useState(0);
  const [triviaStreak, setTriviaStreak] = useState(0);
  const [triviaFinished, setTriviaFinished] = useState(false);

  const currentTrivia = TRIVIA_QUESTIONS[triviaIndex];

  const handleSelectTrivia = (idx: number) => {
    if (triviaSelectedOption !== null) return;
    setTriviaSelectedOption(idx);

    if (idx === currentTrivia.correctIndex) {
      soundManager.playSoundEffect("correct");
      setTriviaScore((prev) => prev + 10);
      setTriviaStreak((prev) => prev + 1);
      setTotalStarsWon((prev) => prev + 1);
      confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
    } else {
      soundManager.playSoundEffect("wrong");
      setTriviaStreak(0);
    }
  };

  const handleNextTrivia = () => {
    soundManager.playSoundEffect("click");
    if (triviaIndex < TRIVIA_QUESTIONS.length - 1) {
      setTriviaIndex((prev) => prev + 1);
      setTriviaSelectedOption(null);
    } else {
      soundManager.playSoundEffect("victory");
      setTriviaFinished(true);
      confetti({ particleCount: 80, spread: 90, origin: { y: 0.5 } });
    }
  };

  const handleRestartTrivia = () => {
    soundManager.playSoundEffect("pop");
    setTriviaIndex(0);
    setTriviaSelectedOption(null);
    setTriviaScore(0);
    setTriviaStreak(0);
    setTriviaFinished(false);
  };

  // -------------------------------------------------------------
  // GAME 2: WORD WIZARD SPELLING STATE
  // -------------------------------------------------------------
  const [wordIndex, setWordIndex] = useState(0);
  const currentWordPuzzle = WORD_PUZZLES[wordIndex];
  const [scrambledLetters, setScrambledLetters] = useState<string[]>([]);
  const [userLetters, setUserLetters] = useState<string[]>([]);
  const [wordCompleted, setWordCompleted] = useState(false);

  // Initialize scrambled letters on word change
  useEffect(() => {
    const letters = currentWordPuzzle.word.split("");
    const shuffled = [...letters].sort(() => Math.random() - 0.5);
    setScrambledLetters(shuffled);
    setUserLetters([]);
    setWordCompleted(false);
  }, [wordIndex]);

  const handleTapLetter = (letter: string, indexInScrambled: number) => {
    if (wordCompleted) return;
    soundManager.playSoundEffect("pop");

    const newScrambled = [...scrambledLetters];
    newScrambled.splice(indexInScrambled, 1);
    setScrambledLetters(newScrambled);

    const newUser = [...userLetters, letter];
    setUserLetters(newUser);

    if (newUser.join("") === currentWordPuzzle.word) {
      soundManager.playSoundEffect("victory");
      setWordCompleted(true);
      setTotalStarsWon((prev) => prev + 2);
      speechVoice.speak(`${currentWordPuzzle.word}! Great job! ${currentWordPuzzle.fact}`);
      confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 } });
    }
  };

  const handleRemoveLetter = (indexInUser: number) => {
    if (wordCompleted) return;
    soundManager.playSoundEffect("click");
    const letter = userLetters[indexInUser];
    const newUser = [...userLetters];
    newUser.splice(indexInUser, 1);
    setUserLetters(newUser);
    setScrambledLetters((prev) => [...prev, letter]);
  };

  const handleNextWord = () => {
    soundManager.playSoundEffect("starDing");
    setWordIndex((prev) => (prev + 1) % WORD_PUZZLES.length);
  };

  // -------------------------------------------------------------
  // GAME 3: MATH QUEST STATE
  // -------------------------------------------------------------
  const [mathIndex, setMathIndex] = useState(0);
  const [mathScore, setMathScore] = useState(0);
  const [spaceshipShield, setSpaceshipShield] = useState(100);
  const [mathFeedback, setMathFeedback] = useState<string | null>(null);

  const currentMath = MATH_CHALLENGES[mathIndex];

  const handleSelectMathOption = (selectedVal: number) => {
    if (selectedVal === currentMath.answer) {
      soundManager.playSoundEffect("correct");
      setMathScore((prev) => prev + 15);
      setMathFeedback("🚀 Cosmic Blast! Thrusters powered +15!");
      setTotalStarsWon((prev) => prev + 1);
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });

      setTimeout(() => {
        setMathFeedback(null);
        setMathIndex((prev) => (prev + 1) % MATH_CHALLENGES.length);
      }, 1000);
    } else {
      soundManager.playSoundEffect("wrong");
      setSpaceshipShield((prev) => Math.max(10, prev - 15));
      setMathFeedback("💥 Asteroid Grazed! Shield repaired, try again!");
    }
  };

  // -------------------------------------------------------------
  // GAME 4: MEMORY MASTER STATE
  // -------------------------------------------------------------
  const MEMORY_ICONS = ["🚀", "🪐", "🦖", "🦁", "🐬", "⭐"];
  const [memoryCards, setMemoryCards] = useState<
    Array<{ id: number; icon: string; isFlipped: boolean; isMatched: boolean }>
  >([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [memoryMoves, setMemoryMoves] = useState(0);
  const [memoryMatchedPairs, setMemoryMatchedPairs] = useState(0);

  const initMemoryGame = () => {
    const deck = [...MEMORY_ICONS, ...MEMORY_ICONS]
      .sort(() => Math.random() - 0.5)
      .map((icon, id) => ({ id, icon, isFlipped: false, isMatched: false }));
    setMemoryCards(deck);
    setFlippedCards([]);
    setMemoryMoves(0);
    setMemoryMatchedPairs(0);
  };

  useEffect(() => {
    if (selectedGame === "memorymaster") {
      initMemoryGame();
    }
  }, [selectedGame]);

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return;
    const card = memoryCards.find((c) => c.id === id);
    if (!card || card.isFlipped || card.isMatched) return;

    soundManager.playSoundEffect("cardFlip");
    const updatedDeck = memoryCards.map((c) => (c.id === id ? { ...c, isFlipped: true } : c));
    setMemoryCards(updatedDeck);

    const newFlipped = [...flippedCards, id];
    setFlippedCards(newFlipped);

    if (newFlipped.length === 2) {
      setMemoryMoves((prev) => prev + 1);
      const firstCard = updatedDeck.find((c) => c.id === newFlipped[0]);
      const secondCard = updatedDeck.find((c) => c.id === newFlipped[1]);

      if (firstCard && secondCard && firstCard.icon === secondCard.icon) {
        // MATCH!
        soundManager.playSoundEffect("correct");
        setTotalStarsWon((prev) => prev + 1);
        setMemoryMatchedPairs((prev) => prev + 1);

        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id ? { ...c, isMatched: true } : c
            )
          );
          setFlippedCards([]);

          if (memoryMatchedPairs + 1 === MEMORY_ICONS.length) {
            soundManager.playSoundEffect("victory");
            confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
          }
        }, 500);
      } else {
        // NO MATCH
        setTimeout(() => {
          setMemoryCards((prev) =>
            prev.map((c) =>
              c.id === newFlipped[0] || c.id === newFlipped[1] ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedCards([]);
        }, 900);
      }
    }
  };

  return (
    <section id="games" className="py-16 md:py-24 bg-[#FAFAF8] relative overflow-hidden border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Playroom Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-black uppercase tracking-widest mb-2">
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>Kidora Interactive Playroom</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-brand-text">
              4 Playable Kids Games
            </h2>
            <p className="text-gray-600 text-sm sm:text-base font-medium mt-1">
              Live educational adventures: no sign up needed, 100% safe & playable directly in browser.
            </p>
          </div>

          <div className="flex items-center space-x-3 self-start md:self-auto">
            <div className="flex items-center space-x-1.5 bg-amber-100/80 px-3.5 py-2 rounded-2xl border border-amber-200">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 animate-spin" />
              <span className="text-xs font-black text-amber-900">
                Stars Won: {totalStarsWon}
              </span>
            </div>
            {isModal && onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-gray-200 hover:bg-gray-300 text-gray-700 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>

        {/* Game Switcher Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { id: "factblast", name: "FactBlast Trivia", icon: "🎮", color: "border-brand-primary text-brand-primary bg-indigo-50" },
            { id: "wordwizard", name: "Word Wizard", icon: "🔤", color: "border-amber-400 text-amber-600 bg-amber-50" },
            { id: "mathquest", name: "Math Quest", icon: "➕", color: "border-purple-500 text-purple-600 bg-purple-50" },
            { id: "memorymaster", name: "Memory Master", icon: "🧠", color: "border-emerald-500 text-emerald-600 bg-emerald-50" }
          ].map((game) => (
            <button
              key={game.id}
              onClick={() => {
                soundManager.playSoundEffect("click");
                setSelectedGame(game.id as any);
              }}
              className={`p-4 rounded-3xl border-2 text-left flex items-center space-x-3 transition-all cursor-pointer ${
                selectedGame === game.id
                  ? `${game.color} shadow-md scale-[1.02] ring-2 ring-brand-primary/20`
                  : "bg-white border-gray-200 text-gray-700 hover:border-gray-300"
              }`}
            >
              <span className="text-3xl">{game.icon}</span>
              <div>
                <h4 className="font-display font-black text-sm">{game.name}</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Live Play</p>
              </div>
            </button>
          ))}
        </div>

        {/* ACTIVE GAME CANVAS CONTAINER */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border-2 border-gray-200 shadow-xl min-h-[420px] flex flex-col justify-between">
          
          {/* ============================================================== */}
          {/* 1. FACTBLAST TRIVIA */}
          {/* ============================================================== */}
          {selectedGame === "factblast" && (
            <div className="space-y-6">
              {!triviaFinished ? (
                <>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-mono font-bold bg-indigo-50 text-brand-primary px-3 py-1 rounded-full">
                        Question {triviaIndex + 1} of {TRIVIA_QUESTIONS.length}
                      </span>
                      <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {currentTrivia.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-3 text-xs font-black">
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Trophy className="w-3.5 h-3.5" /> Score: {triviaScore}
                      </span>
                      {triviaStreak > 1 && (
                        <span className="text-amber-500 flex items-center gap-1">
                          <Flame className="w-3.5 h-3.5 fill-amber-500" /> {triviaStreak} Streak!
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-6 bg-indigo-50/50 rounded-2xl border border-indigo-100 text-center space-y-3">
                    <span className="text-5xl block animate-bounce">{currentTrivia.emoji}</span>
                    <h3 className="font-display text-xl sm:text-2xl font-black text-brand-text">
                      {currentTrivia.question}
                    </h3>
                    <button
                      onClick={() => speechVoice.speak(currentTrivia.question)}
                      className="inline-flex items-center gap-1 text-xs font-bold text-brand-primary bg-white px-3 py-1 rounded-full shadow-2xs hover:bg-gray-50 cursor-pointer"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                      Read Aloud
                    </button>
                  </div>

                  {/* Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {currentTrivia.options.map((opt, idx) => {
                      const isSelected = triviaSelectedOption === idx;
                      const isCorrect = idx === currentTrivia.correctIndex;
                      let btnStyle = "bg-gray-50 border-gray-200 text-gray-800 hover:bg-gray-100";

                      if (triviaSelectedOption !== null) {
                        if (isCorrect) {
                          btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-900 ring-2 ring-emerald-500";
                        } else if (isSelected) {
                          btnStyle = "bg-rose-50 border-rose-400 text-rose-900";
                        }
                      }

                      return (
                        <button
                          key={idx}
                          onClick={() => handleSelectTrivia(idx)}
                          className={`p-4 rounded-2xl border-2 text-left font-display font-bold text-sm sm:text-base transition-all flex items-center justify-between cursor-pointer ${btnStyle}`}
                        >
                          <span>{opt}</span>
                          {triviaSelectedOption !== null && isCorrect && (
                            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                          )}
                          {triviaSelectedOption !== null && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-rose-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>

                  {/* Feedback Explanation */}
                  {triviaSelectedOption !== null && (
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-200 flex items-center justify-between animate-fade-in">
                      <p className="text-xs sm:text-sm text-amber-950 font-bold">
                        💡 <strong>Fun Fact:</strong> {currentTrivia.funFact}
                      </p>
                      <button
                        onClick={handleNextTrivia}
                        className="px-5 py-2.5 bg-brand-primary text-white text-xs font-black uppercase tracking-wider rounded-xl hover:bg-brand-primary/95 transition-all ml-4 shrink-0 cursor-pointer"
                      >
                        Next Question →
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12 space-y-4">
                  <span className="text-6xl block animate-bounce">🏆</span>
                  <h3 className="font-display text-3xl font-black text-brand-text">
                    Trivia Quest Completed!
                  </h3>
                  <p className="text-gray-600 font-semibold text-base">
                    You scored <strong className="text-brand-primary">{triviaScore} Points</strong> with a max streak of {triviaStreak}!
                  </p>
                  <button
                    onClick={handleRestartTrivia}
                    className="inline-flex items-center px-6 py-3 bg-brand-primary text-white font-bold rounded-2xl shadow-lg cursor-pointer"
                  >
                    <RotateCcw className="w-4 h-4 mr-2" />
                    Play Trivia Again
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* 2. WORD WIZARD PHONICS MAGIC */}
          {/* ============================================================== */}
          {selectedGame === "wordwizard" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-xs font-mono font-bold bg-amber-50 text-amber-700 px-3 py-1 rounded-full">
                  Word #{wordIndex + 1}: {currentWordPuzzle.category}
                </span>
                <button
                  onClick={() => speechVoice.speak(currentWordPuzzle.hint)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  Hint Audio
                </button>
              </div>

              {/* Clue Box */}
              <div className="p-6 bg-amber-50/60 rounded-3xl border border-amber-200 text-center space-y-2">
                <span className="text-6xl block animate-bounce">{currentWordPuzzle.emoji}</span>
                <p className="font-display text-lg font-bold text-amber-950">
                  "{currentWordPuzzle.hint}"
                </p>
              </div>

              {/* Target Spelling Slots */}
              <div className="flex justify-center items-center gap-2">
                {Array.from({ length: currentWordPuzzle.word.length }).map((_, idx) => {
                  const letter = userLetters[idx];
                  return (
                    <button
                      key={idx}
                      onClick={() => letter && handleRemoveLetter(idx)}
                      className={`w-12 h-14 rounded-2xl border-2 font-display text-2xl font-black flex items-center justify-center transition-all cursor-pointer ${
                        letter
                          ? "bg-amber-400 text-white border-amber-500 shadow-md scale-105"
                          : "bg-gray-50 border-dashed border-gray-300 text-gray-300"
                      }`}
                    >
                      {letter || "_"}
                    </button>
                  );
                })}
              </div>

              {/* Scrambled Letter Tiles to Tap */}
              {!wordCompleted ? (
                <div className="flex justify-center items-center flex-wrap gap-2 pt-2">
                  {scrambledLetters.map((char, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleTapLetter(char, idx)}
                      className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 text-gray-800 font-display font-black text-xl shadow-xs hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer"
                    >
                      {char}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                  <p className="text-emerald-900 font-black text-sm">
                    🎉 Spelled {currentWordPuzzle.word} Perfectly!
                  </p>
                  <p className="text-xs text-emerald-700 font-medium">{currentWordPuzzle.fact}</p>
                  <button
                    onClick={handleNextWord}
                    className="mt-2 px-6 py-2.5 bg-brand-success text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                  >
                    Next Word Adventure →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* 3. MATH QUEST SPACE ADVENTURE */}
          {/* ============================================================== */}
          {selectedGame === "mathquest" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-xs font-mono font-bold bg-purple-50 text-purple-700 px-3 py-1 rounded-full">
                  Mission Wave #{mathIndex + 1}
                </span>
                <div className="flex items-center space-x-4 text-xs font-bold">
                  <span className="text-purple-700">Fuel Score: {mathScore}</span>
                  <span className="text-rose-600">Spaceship Shield: {spaceshipShield}%</span>
                </div>
              </div>

              {/* Space Context */}
              <div className="p-6 bg-linear-to-r from-purple-900 to-indigo-950 text-white rounded-3xl text-center space-y-3 relative overflow-hidden shadow-lg">
                <div className="absolute top-2 right-2 text-2xl animate-spin">🛸</div>
                <span className="text-5xl block animate-pulse">🚀</span>
                <p className="text-xs font-mono text-purple-200 uppercase tracking-widest">
                  {currentMath.storyContext}
                </p>
                <h3 className="font-display text-4xl font-black text-amber-300">
                  {currentMath.num1} {currentMath.operator} {currentMath.num2} = ?
                </h3>
              </div>

              {/* Answers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {currentMath.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectMathOption(opt)}
                    className="py-4 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 rounded-2xl font-display font-black text-2xl text-purple-900 shadow-xs hover:scale-105 transition-all cursor-pointer"
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {mathFeedback && (
                <div className="p-3 bg-purple-100 rounded-xl text-center font-bold text-xs text-purple-950 animate-fade-in">
                  {mathFeedback}
                </div>
              )}
            </div>
          )}

          {/* ============================================================== */}
          {/* 4. MEMORY MASTER CARDS */}
          {/* ============================================================== */}
          {selectedGame === "memorymaster" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100">
                <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full">
                  Pairs Matched: {memoryMatchedPairs} / {MEMORY_ICONS.length}
                </span>
                <div className="flex items-center space-x-3 text-xs font-bold text-gray-500">
                  <span>Moves: {memoryMoves}</span>
                  <button
                    onClick={initMemoryGame}
                    className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 cursor-pointer"
                    title="Restart Memory Deck"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 3D Card Deck Grid */}
              <div className="grid grid-cols-4 sm:grid-cols-6 gap-3 max-w-lg mx-auto">
                {memoryCards.map((card) => (
                  <button
                    key={card.id}
                    onClick={() => handleCardClick(card.id)}
                    className={`aspect-square rounded-2xl border-2 font-display text-3xl sm:text-4xl flex items-center justify-center transition-all duration-300 transform-gpu cursor-pointer ${
                      card.isFlipped || card.isMatched
                        ? "bg-emerald-50 border-emerald-400 rotate-y-0 scale-100"
                        : "bg-linear-to-br from-indigo-500 to-purple-600 border-indigo-400 text-transparent rotate-y-180 hover:scale-105"
                    }`}
                  >
                    {card.isFlipped || card.isMatched ? card.icon : "✨"}
                  </button>
                ))}
              </div>

              {memoryMatchedPairs === MEMORY_ICONS.length && (
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-center space-y-2 animate-fade-in">
                  <p className="text-emerald-950 font-black text-sm">
                    🌟 Memory Master Crown Unlocked!
                  </p>
                  <p className="text-xs text-emerald-700 font-semibold">
                    You matched all pairs in only {memoryMoves} moves!
                  </p>
                  <button
                    onClick={initMemoryGame}
                    className="mt-2 px-6 py-2.5 bg-brand-success text-white text-xs font-black uppercase tracking-wider rounded-xl shadow-md cursor-pointer"
                  >
                    Play Again →
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
