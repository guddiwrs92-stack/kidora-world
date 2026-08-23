import { GeneratedStory, PersonalisationState, TriviaQuestion, WordPuzzle, MathChallenge } from "../types";

export function generatePersonalizedStory(state: PersonalisationState): GeneratedStory {
  const child = state.name.trim() || "Arjun";
  const name = child.charAt(0).toUpperCase() + child.slice(1);
  const pet = state.avatar.companionPet || "Baby Dragon 🐉";
  const valueClean = state.value.split(" ")[0]; // e.g. "Kindness"

  const themeEmojis: Record<string, { main: string; extras: string[]; title: string; setting: string }> = {
    "Space & Stars": {
      main: "🚀",
      extras: ["⭐", "🪐", "🛸", "☄️", "🌌"],
      title: "Cosmic Star Quest",
      setting: "the glowing Stardust Galaxy"
    },
    "Dinosaurs": {
      main: "🦕",
      extras: ["🌋", "🌿", "🦖", "🥚", "🌴"],
      title: "Prehistoric Dino Valley",
      setting: "the ancient Emerald Forest"
    },
    "Jungle Animals": {
      main: "🦁",
      extras: ["🐒", "🦜", "🌳", "🐘", "🐾"],
      title: "Whispering Safari",
      setting: "the sunlit Canopy Hills"
    },
    "Magic Trains": {
      main: "🚂",
      extras: ["🎟️", "🌈", "🔔", "☁️", "🛤️"],
      title: "Rainbow Express Adventure",
      setting: "the sparkling Cloud Mountain Station"
    },
    "Superheroes": {
      main: "🦸",
      extras: ["⚡", "🛡️", "🏙️", "💫", "✨"],
      title: "Brave City Defender",
      setting: "the vibrant Metropolis of Wonder"
    },
    "Deep Ocean": {
      main: "🐬",
      extras: ["🌊", "🐙", "🐠", "🐚", "🪸"],
      title: "Coral Kingdom Voyage",
      setting: "the crystal Turquoise Depths"
    }
  };

  const themeInfo = themeEmojis[state.interest] || themeEmojis["Space & Stars"];

  const lyrics = [
    `🎵 Listen up, friends! Here comes ${name}, cheerful and bright!`,
    `With their favorite companion ${pet.split(" ")[0]}, soaring with delight!`,
    `Exploring ${themeInfo.setting} under morning sunbeams gold,`,
    `Mastering ${valueClean} — a wonder to behold!`,
    `Sing along with ${name}: "Learning is our superpower ray!" ✨`
  ];

  const pages = [
    {
      pageNumber: 1,
      sceneTitle: `Departure into ${themeInfo.setting}`,
      illustrationEmoji: themeInfo.main,
      secondaryEmojis: themeInfo.extras.slice(0, 3),
      text: `One sunny morning in ${themeInfo.setting}, ${name} (Age ${state.age}) strapped on their golden explorer boots. Alongside their trusted buddy, ${pet}, today's mission was to explore ${state.goal.toLowerCase()}!`,
      characterDialogue: `"${pet}, hold on tight! Our magical adventure begins right now!" said ${name} with a sparkling grin.`
    },
    {
      pageNumber: 2,
      sceneTitle: "The Glowing Crossroads",
      illustrationEmoji: themeInfo.extras[1] || "✨",
      secondaryEmojis: [themeInfo.main, themeInfo.extras[2] || "🌟"],
      text: `Deep along the path, ${name} discovered two shimmering trails blocked by a giant sparkling crystal gate. A friendly guardian asked for proof of true ${valueClean.toLowerCase()} to unlock the route!`,
      characterDialogue: `"We can do this together," cheered ${name}. "When we work as a team with open hearts, no puzzle is too tricky!"`,
      moralChoice: {
        prompt: `How should ${name} solve the riddle at the gate?`,
        optionA: {
          label: `Share a kind song & offer a helping hand 💛`,
          outcome: `${name} sang a heartwarming melody about sharing. The gate glowed warm gold and swung wide open!`,
          bonusValue: `Gained +50 Kindness Stars!`
        },
        optionB: {
          label: `Use clever logic & investigate with curiosity 🔍`,
          outcome: `${name} carefully counted the glowing patterns with ${pet} and discovered the secret keyhole!`,
          bonusValue: `Gained +50 Science Badges!`
        }
      }
    },
    {
      pageNumber: 3,
      sceneTitle: "The Grand Star Celebration",
      illustrationEmoji: "🏆",
      secondaryEmojis: ["🎉", "⭐", "🌈", themeInfo.main],
      text: `Thanks to ${name}'s ${valueClean.toLowerCase()} and quick thinking, every creature in ${themeInfo.setting} cheered in unison! The sky exploded with celebratory shooting stars and colorful confetti!`,
      characterDialogue: `"Remember," whispered ${name}, "the greatest treasure in any world is practicing ${valueClean} every single day!"`
    }
  ];

  return {
    title: `${name} & The ${themeInfo.title}`,
    childName: name,
    theme: state.interest,
    moralValue: state.value,
    lyrics,
    pages,
    celebrationBadge: "🌟 Master Explorer Badge",
    superpowerTitle: `Champion of ${valueClean}`
  };
}

// -------------------------------------------------------------
// Interactive FactBlast Trivia Questions (Kid-approved, exciting!)
// -------------------------------------------------------------
export const TRIVIA_QUESTIONS: TriviaQuestion[] = [
  {
    id: 1,
    category: "Space & Stars",
    question: "Which planet in our solar system is famous for its giant bright rings?",
    options: ["Mars", "Saturn", "Jupiter", "Venus"],
    correctIndex: 1,
    funFact: "Saturn's rings are made mostly of billions of tiny chunks of ice and rock!",
    emoji: "🪐"
  },
  {
    id: 2,
    category: "Animals & Nature",
    question: "What is the only mammal that is capable of true flapping flight?",
    options: ["Flying Squirrel", "Bat", "Sugar Glider", "Penguin"],
    correctIndex: 1,
    funFact: "Bats have flexible wings that are shaped just like human hands with webbing!",
    emoji: "🦇"
  },
  {
    id: 3,
    category: "Dinosaurs",
    question: "Which giant dinosaur had three sharp horns on its face and a large bony frill?",
    options: ["T-Rex", "Triceratops", "Brachiosaurus", "Stegosaurus"],
    correctIndex: 1,
    funFact: "Triceratops had about 800 teeth that kept replacing themselves throughout its life!",
    emoji: "🦕"
  },
  {
    id: 4,
    category: "Super Science",
    question: "What makes plants green and helps them convert sunlight into food?",
    options: ["Chlorophyll", "Rainbow Dust", "Oxygen Bubble", "Sun Salt"],
    correctIndex: 0,
    funFact: "Plants use sunlight, water, and air to make sweet sugar through photosynthesis!",
    emoji: "🌱"
  },
  {
    id: 5,
    category: "Ocean Wonders",
    question: "How many hearts does a giant octopus have beating inside its body?",
    options: ["1 Heart", "2 Hearts", "3 Hearts", "5 Hearts"],
    correctIndex: 2,
    funFact: "Octopuses have 3 hearts and blue blood because it uses copper instead of iron!",
    emoji: "🐙"
  },
  {
    id: 6,
    category: "Space & Stars",
    question: "What is the closest star to our planet Earth?",
    options: ["The North Star", "Alpha Centauri", "The Sun", "Betelgeuse"],
    correctIndex: 2,
    funFact: "Sunlight takes only about 8 minutes and 20 seconds to travel all the way to Earth!",
    emoji: "☀️"
  },
  {
    id: 7,
    category: "Animals & Nature",
    question: "Which friendly bird can swim gracefully underwater but cannot fly in the air?",
    options: ["Eagle", "Penguin", "Parrot", "Flamingo"],
    correctIndex: 1,
    funFact: "Emperor penguins can dive over 1,800 feet deep in freezing Antarctic waters!",
    emoji: "🐧"
  }
];

// -------------------------------------------------------------
// Interactive Word Wizard Spell Puzzles
// -------------------------------------------------------------
export const WORD_PUZZLES: WordPuzzle[] = [
  {
    word: "ROCKET",
    hint: "A supersonic vehicle that zooms up into outer space!",
    emoji: "🚀",
    category: "Space",
    fact: "Rockets travel at over 25,000 miles per hour to break free from Earth's gravity!"
  },
  {
    word: "BRAVE",
    hint: "Standing tall, facing challenges, and helping others!",
    emoji: "🦁",
    category: "Values",
    fact: "Being brave doesn't mean never feeling scared — it means doing the right thing anyway!"
  },
  {
    word: "PLANET",
    hint: "A giant celestial ball like Earth, Mars, or Jupiter orbiting a star!",
    emoji: "🪐",
    category: "Space",
    fact: "There are eight official planets in our solar system and thousands more in the galaxy!"
  },
  {
    word: "KIND",
    hint: "Speaking gentle words, smiling, and helping your friends!",
    emoji: "💛",
    category: "Values",
    fact: "Scientific studies show that doing kind deeds makes your own brain release happiness hormones!"
  },
  {
    word: "SAFARI",
    hint: "An exciting expedition to see wild animals in nature!",
    emoji: "🦒",
    category: "Nature",
    fact: "The word 'Safari' comes from the Swahili language meaning 'journey'!"
  },
  {
    word: "MAGIC",
    hint: "Wonder, sparkle, and imagination brought to life!",
    emoji: "✨",
    category: "Fantasy",
    fact: "Reading books and singing songs lights up over six different parts of a child's brain at once!"
  }
];

// -------------------------------------------------------------
// Interactive Math Quest Challenges
// -------------------------------------------------------------
export const MATH_CHALLENGES: MathChallenge[] = [
  {
    num1: 4,
    num2: 3,
    operator: "+",
    answer: 7,
    options: [6, 7, 8, 9],
    storyContext: "Star Fuel: Add the glowing crystals to power up the spaceship hyper-thrusters!"
  },
  {
    num1: 10,
    num2: 4,
    operator: "-",
    answer: 6,
    options: [5, 6, 7, 8],
    storyContext: "Asteroid Shield: Dodge the flying space rocks by solving the energy balance!"
  },
  {
    num1: 5,
    num2: 5,
    operator: "+",
    answer: 10,
    options: [9, 10, 11, 12],
    storyContext: "Alien Beacon: Connect the double constellation beacons to unlock the star gate!"
  },
  {
    num1: 3,
    num2: 3,
    operator: "×",
    answer: 9,
    options: [6, 8, 9, 12],
    storyContext: "Quantum Warp: Triple the three power-cells to jump to Planet Kidora!"
  },
  {
    num1: 12,
    num2: 5,
    operator: "-",
    answer: 7,
    options: [6, 7, 8, 9],
    storyContext: "Cosmic Landing: Decelerate rocket thrusters by matching the orbit equation!"
  },
  {
    num1: 6,
    num2: 6,
    operator: "+",
    answer: 12,
    options: [10, 11, 12, 14],
    storyContext: "Supernova Boost: Double six solar flares to reach maximum speed!"
  }
];
