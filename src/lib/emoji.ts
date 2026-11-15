export interface EmojiEntry {
  emoji: string;
  name: string;
  keywords: string[];
}

export const EMOJIS: EmojiEntry[] = [
  { emoji: "😀", name: "grinning face", keywords: ["smile", "happy"] },
  { emoji: "😂", name: "face with tears of joy", keywords: ["laugh", "cry"] },
  { emoji: "🤣", name: "rolling on the floor laughing", keywords: ["lol", "rofl"] },
  { emoji: "😊", name: "smiling face", keywords: ["blush", "happy"] },
  { emoji: "😍", name: "smiling face with heart-eyes", keywords: ["love", "heart"] },
  { emoji: "🤩", name: "star-struck", keywords: ["wow", "excited"] },
  { emoji: "😎", name: "smiling face with sunglasses", keywords: ["cool"] },
  { emoji: "🤔", name: "thinking face", keywords: ["hmm", "question"] },
  { emoji: "😴", name: "sleeping face", keywords: ["sleep", "tired"] },
  { emoji: "🤯", name: "exploding head", keywords: ["mind blown", "shock"] },
  { emoji: "😱", name: "face screaming in fear", keywords: ["scared", "shock"] },
  { emoji: "🥳", name: "partying face", keywords: ["party", "celebrate"] },
  { emoji: "💀", name: "skull", keywords: ["dead", "death"] },
  { emoji: "👻", name: "ghost", keywords: ["boo", "halloween"] },
  { emoji: "👾", name: "alien monster", keywords: ["game", "space"] },
  { emoji: "🤖", name: "robot", keywords: ["bot", "ai"] },
  { emoji: "💩", name: "pile of poo", keywords: ["poop"] },
  { emoji: "🔥", name: "fire", keywords: ["hot", "lit"] },
  { emoji: "⭐", name: "star", keywords: ["favorite"] },
  { emoji: "💥", name: "collision", keywords: ["boom", "explosion"] },
  { emoji: "❤️", name: "red heart", keywords: ["love"] },
  { emoji: "💚", name: "green heart", keywords: ["love"] },
  { emoji: "💙", name: "blue heart", keywords: ["love"] },
  { emoji: "💜", name: "purple heart", keywords: ["love"] },
  { emoji: "🖤", name: "black heart", keywords: ["love"] },
  { emoji: "👍", name: "thumbs up", keywords: ["like", "yes", "approve"] },
  { emoji: "👎", name: "thumbs down", keywords: ["dislike", "no"] },
  { emoji: "✌️", name: "victory hand", keywords: ["peace"] },
  { emoji: "🤞", name: "crossed fingers", keywords: ["luck", "hope"] },
  { emoji: "👋", name: "waving hand", keywords: ["hello", "bye"] },
  { emoji: "🙌", name: "raising hands", keywords: ["celebrate", "praise"] },
  { emoji: "💪", name: "flexed biceps", keywords: ["strong", "muscle"] },
  { emoji: "🎉", name: "party popper", keywords: ["party", "celebrate", "tada"] },
  { emoji: "🎊", name: "confetti ball", keywords: ["party", "celebrate"] },
  { emoji: "🎈", name: "balloon", keywords: ["party", "birthday"] },
  { emoji: "🎯", name: "direct hit", keywords: ["target", "bullseye"] },
  { emoji: "🚀", name: "rocket", keywords: ["launch", "space", "ship"] },
  { emoji: "💻", name: "laptop", keywords: ["computer", "code", "developer"] },
  { emoji: "⌨️", name: "keyboard", keywords: ["computer", "typing"] },
  { emoji: "🖥️", name: "desktop computer", keywords: ["monitor", "screen"] },
  { emoji: "📱", name: "mobile phone", keywords: ["phone", "smartphone"] },
  { emoji: "🔧", name: "wrench", keywords: ["tool", "fix"] },
  { emoji: "🔨", name: "hammer", keywords: ["tool", "build"] },
  { emoji: "⚙️", name: "gear", keywords: ["settings", "tool", "cog"] },
  { emoji: "🎮", name: "video game", keywords: ["game", "controller"] },
  { emoji: "🎵", name: "musical note", keywords: ["music", "song"] },
  { emoji: "☕", name: "hot beverage", keywords: ["coffee", "tea"] },
  { emoji: "🍕", name: "pizza", keywords: ["food"] },
  { emoji: "🌍", name: "globe showing Europe-Africa", keywords: ["world", "earth"] },
  { emoji: "🌈", name: "rainbow", keywords: ["color", "pride"] },
  { emoji: "⚡", name: "high voltage", keywords: ["lightning", "fast", "power"] },
  { emoji: "✅", name: "check mark button", keywords: ["done", "yes", "success"] },
  { emoji: "❌", name: "cross mark", keywords: ["no", "error", "fail"] },
  { emoji: "⭕", name: "hollow red circle", keywords: ["circle"] },
  { emoji: "➡️", name: "right arrow", keywords: ["next"] },
  { emoji: "⬅️", name: "left arrow", keywords: ["back"] },
  { emoji: "📌", name: "pushpin", keywords: ["pin", "pinched"] },
  { emoji: "📎", name: "paperclip", keywords: ["attach"] },
  { emoji: "🔗", name: "link", keywords: ["chain", "url"] },
];

export function searchEmojis(query: string): EmojiEntry[] {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return EMOJIS;

  return EMOJIS.filter((entry) => {
    const haystack = [entry.emoji, entry.name, ...entry.keywords].join(" ").toLowerCase();
    return terms.every((term) => haystack.includes(term));
  });
}
