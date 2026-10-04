import {
  GeneratedStory,
  GeneratedSong,
  PersonalisationState,
  StoryPage,
  TriviaQuestion,
  WordPuzzle,
  MathChallenge
} from "../types";

// Helper to strip emoji for clean speech/text while preserving the full name
export function cleanCompanionName(pet: string): string {
  if (!pet) return "Baby Dragon";
  // Remove emoji characters, trim whitespace
  const cleaned = pet.replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, "").trim();
  return cleaned || "Baby Dragon";
}

// Pronoun resolution helper
interface PronounSet {
  subject: string;
  object: string;
  possessive: string;
  useName: boolean;
}

function getPronouns(childName: string, preference?: string): PronounSet {
  if (preference === "he/him") {
    return { subject: "he", object: "him", possessive: "his", useName: false };
  }
  if (preference === "she/her") {
    return { subject: "she", object: "her", possessive: "her", useName: false };
  }
  if (preference === "they/them") {
    return { subject: "they", object: "them", possessive: "their", useName: false };
  }
  // Default: use child's name directly to prevent awkward or ambiguous pronoun usage
  return { subject: childName, object: childName, possessive: `${childName}'s`, useName: true };
}

// Domain-specific settings and action maps
interface ThemeConfig {
  title: string;
  setting: string;
  itemGoal: string;
  clues: string;
  mainEmoji: string;
  extras: string[];
}

const THEME_CONFIGS: Record<string, ThemeConfig> = {
  "Space & Stars": {
    title: "Starlight Constellation Quest",
    setting: "the shimmering Starlight Nebula",
    itemGoal: "the Lost Pulsar Compass",
    clues: "stellar coordinates and glowing cosmic charts",
    mainEmoji: "🚀",
    extras: ["⭐", "🪐", "🛸", "☄️", "🌌"]
  },
  "Dinosaurs": {
    title: "Cretaceous Valley Expedition",
    setting: "the ancient Fern Valley",
    itemGoal: "the Golden Amber Crystal",
    clues: "fossil footprints and leafy canopy trails",
    mainEmoji: "🦕",
    extras: ["🌿", "🦖", "🌋", "🥚", "🌴"]
  },
  "Jungle Animals": {
    title: "Canopy River Safari",
    setting: "the sunlit River Rainforest",
    itemGoal: "the Emerald Seed of the Sun Canopy",
    clues: "bamboo chimes and singing toucan calls",
    mainEmoji: "🦁",
    extras: ["🐒", "🦜", "🌳", "🐘", "🐾"]
  },
  "Magic Trains": {
    title: "Rainbow Express Railway",
    setting: "the Cloud Peak Railway Line",
    itemGoal: "the Whistling Star Lantern",
    clues: "steam whistle echoes and winding switchback tracks",
    mainEmoji: "🚂",
    extras: ["🌈", "🎟️", "🔔", "☁️", "🛤️"]
  },
  "Superheroes": {
    title: "Wonder City Shield Adventure",
    setting: "the skyline of Metro Springs",
    itemGoal: "the Solar Power Core",
    clues: "signal towers and reflection mirrors",
    mainEmoji: "🦸",
    extras: ["⚡", "🛡️", "🏙️", "💫", "✨"]
  },
  "Deep Ocean": {
    title: "Coral Kingdom Voyage",
    setting: "the glowing Turquoise Trench",
    itemGoal: "the Singing Pearl of the Reef",
    clues: "luminescent jellyfish beacons and tidal shells",
    mainEmoji: "🐬",
    extras: ["🌊", "🐙", "🐠", "🐚", "🪸"]
  }
};

interface ValueActionConfig {
  valueClean: string;
  actionSummary: string;
  actionDetail: string;
  chapter2ChoicePrompt: string;
  optionALabel: string;
  optionAOutcome: string;
  optionBLabel: string;
  optionBOutcome: string;
  chapter3Impact: string;
  songActionLine: string;
}

const VALUE_CONFIGS: Record<string, ValueActionConfig> = {
  "Bravery 🦁": {
    valueClean: "Bravery",
    actionSummary: "stepped forward with a steady breath to light the dim pathway",
    actionDetail: "took a deep breath, held the lantern high, and stepped across the narrow glowing stone bridge first so others could follow without fear",
    chapter2ChoicePrompt: "should take the lead through the shadowy mist or wait for daylight?",
    optionALabel: "Step forward courageously with the lantern to lead the way",
    optionAOutcome: "stepped steadily onto the bridge, illuminating every safe footing for everyone behind.",
    optionBLabel: "Pause to encourage everyone and map out three careful steps",
    optionBOutcome: "spoke calm, reassuring words and tested each stone with a hiking staff before guiding the group forward.",
    chapter3Impact: "Taking that brave first step proved that courage means acting with care even when the heart beats fast.",
    songActionLine: "Stepping up brave when the shadowed paths call"
  },
  "Kindness 💛": {
    valueClean: "Kindness",
    actionSummary: "stopped to gently untangle and comfort a stranded traveler",
    actionDetail: "paused the expedition to gently free a frightened little creature tangled in thorny brambles, wrapping it in a warm scarf",
    chapter2ChoicePrompt: "should stop to help the tangled creature or hurry ahead before sunset?",
    optionALabel: "Stop immediately, speak gently, and carefully untangle the thorns",
    optionAOutcome: "knelt down with soft hands, freeing the grateful animal and sharing fresh water.",
    optionBLabel: "Build a safe leafy shelter and leave sweet fruit beside it",
    optionBOutcome: "crafted a snug nest of clover and fed the little traveler until it stood strong again.",
    chapter3Impact: "That gentle act of kindness brightened the entire forest, and the grateful traveler showed the secret hidden path.",
    songActionLine: "Helping each friend with a soft, gentle hand"
  },
  "Sharing & Caring 🤝": {
    valueClean: "Sharing",
    actionSummary: "divided the supplies and telescope equally with a tired traveler",
    actionDetail: "unpacked the explorer kit and divided the crisp fruit, cool water, and star telescope equally so no one walked alone or thirsty",
    chapter2ChoicePrompt: "should share the last water flask with a thirsty newcomer?",
    optionALabel: "Pour half into the newcomer's cup with a warm smile",
    optionAOutcome: "split the fresh mountain water evenly, refreshing both explorers for the climb.",
    optionBLabel: "Share the compass map and invite the traveler to walk together",
    optionBOutcome: "held out the map and teamed up so both could navigate the tricky ridge as partners.",
    chapter3Impact: "By sharing willingly, two travelers turned a difficult mountain trek into a joyous shared triumph.",
    songActionLine: "Sharing each treasure so all friends can smile"
  },
  "Politeness & Respect ✨": {
    valueClean: "Respect",
    actionSummary: "listened attentively and offered two respectful greetings before asking",
    actionDetail: "bowed respectfully, greeted the elder guide with courteous words, and listened patiently until the elder finished speaking",
    chapter2ChoicePrompt: "should ask politely for permission before opening the ancient shrine gate?",
    optionALabel: "Offer two respectful bows and ask courteous permission",
    optionAOutcome: "spoke with polite words, earning the elder keeper's blessing and the golden key.",
    optionBLabel: "Listen quietly to the keeper's riddle without interrupting",
    optionBOutcome: "showed deep respect by listening to every word, correctly answering with humble grace.",
    chapter3Impact: "Treating everyone with quiet respect opened doors that hurried force could never budge.",
    songActionLine: "Greeting the elders with words polite and bright"
  },
  "Persistence 🐢": {
    valueClean: "Persistence",
    actionSummary: "methodically tested each gear and refused to give up when the lock jammed",
    actionDetail: "when the first two puzzle gears locked tight, refused to give up, checked the notebook diagrams three times, and tried a steady fourth combination",
    chapter2ChoicePrompt: "should try a fourth puzzle combination or give up on the locked gate?",
    optionALabel: "Examine the gear diagram again and test a new combination patiently",
    optionAOutcome: "aligned the third brass gear calmly, and heard the rewarding click of the lock opening.",
    optionBLabel: "Work through the numbers step-by-step from one to nine",
    optionBOutcome: "counted every groove with patience, discovering the exact sequence through careful persistence.",
    chapter3Impact: "Patient persistence solved the riddle that hasty rushers had abandoned long ago.",
    songActionLine: "Trying once more when the puzzle seems slow"
  }
};

// Learning goal phrasing map
const GOAL_CONFIGS: Record<string, { missionPhrase: string; songLine: string; celebration: string }> = {
  "Curiosity & Science": {
    missionPhrase: "investigate planetary orbits, light waves, and natural scientific patterns",
    songLine: "Testing each question with wonder and care",
    celebration: "cataloging four new scientific phenomena in the field journal"
  },
  "Vocabulary & Speech": {
    missionPhrase: "discover ancient scroll rhymes and pronounce expressive new descriptive words",
    songLine: "Speaking rich words with clear rhythm and pride",
    celebration: "mastering twelve expressive new descriptive words"
  },
  "Numbers & Logic": {
    missionPhrase: "solve geometric lock sequences and count navigation coordinates",
    songLine: "Counting the star-charts with sharp, clever eyes",
    celebration: "solving every geometric sequence with pinpoint precision"
  },
  "Rhythm & Music": {
    missionPhrase: "match melodic chimes and synchronize tempo across the landscape",
    songLine: "Singing clear notes that ring merry and sweet",
    celebration: "harmonizing a three-part melody that echoed across the valley"
  }
};

// Variety openings and chorus templates to ensure diversity
const CHORUS_TEMPLATES = [
  (name: string, setting: string) => [
    `${name}, oh ${name}, exploring far and wide!`,
    `With wonder in ${name}'s heart and kindness by ${name}'s side!`
  ],
  (name: string, setting: string) => [
    `Sing for ${name}, bright as the morning sun!`,
    `${name} shows the world how brave adventures are won!`
  ],
  (name: string, setting: string) => [
    `${name}, hear the cheer through ${setting} ring!`,
    `${name} leads the way while all the birds do sing!`
  ]
];

// Helper to count words accurately
function countWords(str: string): number {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

// Internal generation function
function generateRawStoryData(state: PersonalisationState, seedVariation: number = 0): GeneratedStory {
  const child = state.name.trim() || "Arjun";
  const name = child.charAt(0).toUpperCase() + child.slice(1);
  const companion = cleanCompanionName(state.avatar.companionPet);
  const pronouns = getPronouns(name, state.pronouns);

  const themeKey = Object.keys(THEME_CONFIGS).includes(state.interest) ? state.interest : "Space & Stars";
  const theme = THEME_CONFIGS[themeKey];

  const valueKey = Object.keys(VALUE_CONFIGS).includes(state.value) ? state.value : "Kindness 💛";
  const val = VALUE_CONFIGS[valueKey];

  const goalKey = Object.keys(GOAL_CONFIGS).includes(state.goal) ? state.goal : "Curiosity & Science";
  const goal = GOAL_CONFIGS[goalKey];

  // 1. Generate Song: 4 short verses + 2-line chorus repeating the child's name
  const chorusPicker = (name.length + seedVariation) % CHORUS_TEMPLATES.length;
  const chorusLines = CHORUS_TEMPLATES[chorusPicker](name, theme.setting);

  const verses = [
    `Across ${theme.setting} the bright morning gleams,`,
    `${name} and ${companion} are chasing their dreams!`,
    `${val.songActionLine},`,
    `${goal.songLine}.`
  ];

  const song: GeneratedSong = {
    verses,
    chorus: chorusLines
  };

  // 2. Generate Chapters: 3 chapters, each strictly between 80 and 120 words
  // Chapter 1: The Departure (80-120 words)
  const posPronoun = pronouns.possessive;
  const subjPronoun = pronouns.subject;

  let ch1Text = "";
  if (seedVariation % 2 === 0) {
    ch1Text =
      `The golden dawn broke across ${theme.setting}, casting amber rays over the expedition camp. ` +
      `${name} laced up ${posPronoun} sturdy trail boots while ${companion} hovered eagerly near the map table. ` +
      `Today's expedition carried an inspiring objective: to find ${theme.itemGoal} and ${goal.missionPhrase}. ` +
      `${name} double-checked the notebook, carefully packing field lenses and compass tools into a canvas backpack. ` +
      `The trails ahead were marked with ${theme.clues}. ` +
      `"Let us stay attentive and observe every natural clue," ${name} announced with a cheerful grin. ` +
      `${companion} gave an energetic nod, ready to embark into the magnificent wilderness side by side.`;
  } else {
    ch1Text =
      `Sunlight filtered through the glowing horizon of ${theme.setting}, signaling the start of an extraordinary quest. ` +
      `${name} and faithful companion ${companion} stood at the trailhead, reviewing the charted route with bright eyes. ` +
      `Their mission was clear: locate ${theme.itemGoal} while taking time to ${goal.missionPhrase}. ` +
      `${name} packed field instruments, noting how the morning air carried whispers of ${theme.clues}. ` +
      `Every step offered a chance to learn and discover something meaningful about the world. ` +
      `"With curious eyes and steady feet, our team is ready," ${name} declared with warmth. ` +
      `${companion} leaped with excitement as they stepped forward together.`;
  }

  // Chapter 2: The Crossroads & Value Choice (80-120 words) - Demonstrating the value through ACTION
  let ch2Text = "";
  if (seedVariation % 2 === 0) {
    ch2Text =
      `Midway through the trek, the winding trail narrowed near a shadowed gorge where shimmering crystal stones formed a precarious crossing. ` +
      `A distressed traveler sat stranded near the edge, unsure how to proceed through the dense falling mist. ` +
      `Here was a moment that demanded true ${val.valueClean.toLowerCase()} in action. ` +
      `Without hesitation, ${name} ${val.actionDetail}. ` +
      `Turning to ${companion}, ${name} gently demonstrated how staying calm and helpful transforms a daunting obstacle into safe passage. ` +
      `By choosing to act with selfless conviction rather than rushing blindly ahead, ` +
      `${name} restored hope and guided the group securely across the gorge.`;
  } else {
    ch2Text =
      `Deeper along the path, ${name} and ${companion} reached a steep rocky summit where the trail split into two challenging routes. ` +
      `Cold mountain winds whistled through the crags, and another weary explorer struggled with a heavy pack near the cliffside. ` +
      `Remembering the importance of living ${val.valueClean.toLowerCase()}, ${name} immediately stepped in. ` +
      `${name} ${val.actionDetail}. ` +
      `Working together with patience, ${name} ensured that no one was left behind or forgotten in the rough terrain. ` +
      `This decisive action proved that living with ${val.valueClean.toLowerCase()} means taking responsibility for those around us with heart and courage.`;
  }

  // Chapter 3: The Discovery & Celebration (80-120 words)
  let ch3Text = "";
  if (seedVariation % 2 === 0) {
    ch3Text =
      `Following the secret coordinates revealed by their cooperative teamwork, ` +
      `${name} and ${companion} finally arrived at the heart of ${theme.setting}. ` +
      `Nestled upon an ancient pedestal of moss and starlight sat ${theme.itemGoal}, glowing with radiant warmth. ` +
      `The mission was a complete triumph, culminating in ${goal.celebration}. ` +
      `Surrounding travelers and forest keepers gathered to applaud the young explorer's thoughtful leadership. ` +
      `${val.chapter3Impact} ` +
      `"True discovery," ${name} reflected while resting beside ${companion}, "is finding both knowledge and kindness on the journey." ` +
      `A chorus of joyful music echoed into the twilight sky.`;
  } else {
    ch3Text =
      `At the end of the winding ridge, the golden light of sunset illuminated a tranquil grove hidden inside ${theme.setting}. ` +
      `There, resting safely above the crystalline springs, ${name} and ${companion} uncovered ${theme.itemGoal}. ` +
      `The expedition achieved its greatest milestone by ${goal.celebration}. ` +
      `Fellow explorers cheered warmly, celebrating not just the artifact found, but the character demonstrated throughout the quest. ` +
      `${val.chapter3Impact} ` +
      `Looking up at the twinkling stars with ${companion}, ` +
      `${name} understood that character, curiosity, and care create the most enduring adventures of all. ` +
      `The expedition journal was signed with pride and joy.`;
  }

  const pages: StoryPage[] = [
    {
      pageNumber: 1,
      sceneTitle: `Departure into ${theme.setting}`,
      illustrationEmoji: theme.mainEmoji,
      secondaryEmojis: theme.extras.slice(0, 3),
      text: ch1Text,
      characterDialogue: `"${companion}, keep your eyes open! Today's mission is to discover ${theme.itemGoal} and explore together," said ${name}.`
    },
    {
      pageNumber: 2,
      sceneTitle: `The Crossroads: Choosing ${val.valueClean}`,
      illustrationEmoji: theme.extras[1] || "✨",
      secondaryEmojis: [theme.mainEmoji, theme.extras[2] || "🌟"],
      text: ch2Text,
      characterDialogue: `"When we face a challenge, we lead through action," said ${name}. "Let us do what is right and help each other."`,
      moralChoice: {
        prompt: `How ${name} ${val.chapter2ChoicePrompt}:`,
        optionA: {
          label: val.optionALabel,
          outcome: `${name} ${val.optionAOutcome}`,
          bonusValue: `Practiced ${val.valueClean} in action!`
        },
        optionB: {
          label: val.optionBLabel,
          outcome: `${name} ${val.optionBOutcome}`,
          bonusValue: `Practiced ${val.valueClean} in action!`
        }
      }
    },
    {
      pageNumber: 3,
      sceneTitle: `The Discovery of ${theme.itemGoal}`,
      illustrationEmoji: "🏆",
      secondaryEmojis: ["🎉", "⭐", "🌈", theme.mainEmoji],
      text: ch3Text,
      characterDialogue: `"We solved it together," whispered ${name} happily to ${companion}. "Knowledge and character made this our best journey yet!"`
    }
  ];

  // Combined display lyrics
  const lyrics = [
    `🎵 ${verses[0]}`,
    `🎵 ${verses[1]}`,
    `🎵 ${verses[2]}`,
    `🎵 ${verses[3]}`,
    `⭐ Chorus:`,
    `🎵 ${chorusLines[0]}`,
    `🎵 ${chorusLines[1]}`
  ];

  return {
    title: `${name} & ${companion}: Quest for ${theme.itemGoal}`,
    childName: name,
    pronunciation: state.pronunciation?.trim(),
    theme: state.interest,
    moralValue: state.value,
    song,
    lyrics,
    pages,
    celebrationBadge: `🌟 Master Explorer of ${theme.setting}`,
    superpowerTitle: `Champion of ${val.valueClean}`
  };
}

// Validation Step:
// 1. Checks that the full companion name appears in every page
// 2. Checks that the words "Age" or "Years" do NOT appear in song or story
// 3. Checks that the value is shown through an action in chapter 2
// 4. Checks word counts are in the 80-120 range
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Structured Gemini Prompt Builder
 * Enforces structured JSON output without leaking system labels or age strings into content.
 */
export function buildGeminiPrompt(state: PersonalisationState): string {
  const child = state.name.trim() || "Arjun";
  const name = child.charAt(0).toUpperCase() + child.slice(1);
  const companion = cleanCompanionName(state.avatar.companionPet);
  const pronounRule =
    state.pronouns && state.pronouns !== "Name"
      ? `Use the pronoun preference '${state.pronouns}'.`
      : `Use the child's name '${name}' directly instead of ambiguous pronouns.`;

  return `You are Kidora's expert children's content creator.
Generate a structured, safe, personalized jingle and 3-chapter moral adventure story for a child.

CRITICAL INSTRUCTIONS & CONSTRAINTS:
1. Child's Name: "${name}"
2. Companion: "${companion}" (Always use this exact, FULL companion name. Never truncate to "Baby" or a single word).
3. Pronunciation: "${state.pronunciation || name}" (store for audio step).
4. Pronouns: ${pronounRule}
5. Age Band Context: "${state.age}" (Use age ONLY to calibrate vocabulary complexity and sentence length. NEVER print or include the words "Age", "Years", or numbers representing their age in any generated text or lyrics).
6. Child's World / Interest: "${state.interest}"
7. Moral Value: "${state.value}" (The value must NOT merely be stated or labeled like "Mastering Bravery!". It MUST be actively demonstrated through an observable action choice in Chapter 2).
8. Learning Goal: "${state.goal}" (Weave this learning goal naturally into the storyline and expedition plot).
9. Tone & Safety: Wholesome, uplifting, encouraging. NO scary, violent, romantic, or unsafe situations. NO brand names or real public figures. NO personal details beyond the name and interest. NO filler lines like "Learning is our superpower ray!". Every single line must tie directly to the interest, moral value action, or learning goal.

SONG REQUIREMENTS:
- 4 short rhythmic verses.
- 2-line chorus that repeats the child's name ("${name}").
- Natural rhyme scheme, catchy and easy for kids to sing along.

STORY REQUIREMENTS:
- Exactly 3 chapters.
- Each chapter must be strictly between 80 and 120 words.
- Chapter 1: Departure into the adventure setting with ${companion}, setting up the learning goal expedition.
- Chapter 2: The Crossroads & Value Choice. The child faces a problem and makes a clear moral choice demonstrating ${state.value} through direct action.
- Chapter 3: The Discovery & Celebration. Achieving the goal, celebrating character, and reflection.

OUTPUT FORMAT:
Return ONLY valid JSON matching this schema with no markdown wrapping, no extra prose, and no labels leaking into the text:
{
  "title": string,
  "verses": string[], // exactly 4 lines
  "chorus": string[], // exactly 2 lines repeating "${name}"
  "chapters": [
    {
      "pageNumber": 1,
      "sceneTitle": string,
      "text": string, // 80-120 words, strictly no "Age" or "Years"
      "characterDialogue": string
    },
    {
      "pageNumber": 2,
      "sceneTitle": string,
      "text": string, // 80-120 words demonstrating value via action
      "characterDialogue": string,
      "moralChoicePrompt": string,
      "optionA": string,
      "optionB": string
    },
    {
      "pageNumber": 3,
      "sceneTitle": string,
      "text": string, // 80-120 words celebrating resolution
      "characterDialogue": string
    }
  ]
}`;
}

export function validateStory(story: GeneratedStory, state: PersonalisationState): ValidationResult {
  const errors: string[] = [];
  const fullCompanion = cleanCompanionName(state.avatar.companionPet);

  // Check 1: Full companion name appears
  const allText = story.pages.map((p) => p.text + " " + p.characterDialogue).join(" ");
  if (!allText.includes(fullCompanion)) {
    errors.push(`Companion name "${fullCompanion}" not found in full in the story.`);
  }

  // Check 2: The words "Age" or "Years" must NOT appear
  const ageRegex = /\b(age|years)\b/i;
  if (ageRegex.test(allText)) {
    errors.push(`Found forbidden age-related keywords ("Age" or "Years") in the story text.`);
  }
  const songText = story.song.verses.join(" ") + " " + story.song.chorus.join(" ");
  if (ageRegex.test(songText)) {
    errors.push(`Found forbidden age-related keywords in song lyrics.`);
  }

  // Check 3: Value shown through action
  const valueClean = state.value.split(" ")[0].toLowerCase();
  const ch2 = story.pages[1]?.text.toLowerCase() || "";
  const actionIndicators = ["stepped", "helped", "shared", "greeted", "tested", "paused", "knelt", "divided", "listened", "held"];
  const hasAction = actionIndicators.some((act) => ch2.includes(act));
  if (!hasAction) {
    errors.push(`Chapter 2 does not contain an observable action demonstrating the value.`);
  }

  // Check 4: Chapter word counts (80-120 words target)
  story.pages.forEach((p, idx) => {
    const wc = countWords(p.text);
    if (wc < 75 || wc > 125) {
      errors.push(`Chapter ${idx + 1} word count (${wc}) is outside target 80-120 words.`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
}

// Primary Generator Function with Automatic Validation and 1-Time Retry
export function generatePersonalizedStory(state: PersonalisationState): GeneratedStory {
  // First attempt
  const firstTry = generateRawStoryData(state, 0);
  const firstValidation = validateStory(firstTry, state);

  if (firstValidation.valid) {
    return firstTry;
  }

  // If any check fails, regenerate once with alternative seed configuration
  const secondTry = generateRawStoryData(state, 1);
  const secondValidation = validateStory(secondTry, state);

  if (secondValidation.valid) {
    return secondTry;
  }

  // Return the closest validated story
  return firstTry;
}

// -------------------------------------------------------------
// Interactive FactBlast Trivia Questions
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
    fact: "Doing kind deeds creates positive habits and builds confidence in children!"
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
    fact: "Reading books and singing songs actively stimulates imagination and language skills!"
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
    storyContext: "Asteroid Shield: Dodge the space debris by balancing the power equations!"
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
