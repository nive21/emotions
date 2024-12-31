export const categories = {
  all: "All",
  anger: "Anger, Apathy, Hatred",
  shame: "Shame and Guilt",
  fear: "Fear and Panic",
  happy: "Happiness, Contentment, Joy",
  envy: "Jealousy and Envy",
  confusion: "Confusion",
  depression: "Depression",
  sad: "Sadness and Grief",
  anxiety: "Anxiety",
};

export const intensities = {
  all: "All",
  soft: "Soft",
  medium: "Medium",
  intense: "Intense",
};

type CategoryNames = (typeof categories)[keyof typeof categories];
type IntensityTypes = (typeof intensities)[keyof typeof intensities];

type Emotions = {
  [key: string]: {
    category: CategoryNames;
    intensity: IntensityTypes;
    value: number;
  };
};

export const EMOTIONS: Emotions = {
  Ambivalent: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Annoyed: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Assertive: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Calm: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Certain: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Confident: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Crabby: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Cranky: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Critical: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Cross: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Detached: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Determined: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Discerning: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Disengaged: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Displeased: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Distracted: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Frustrated: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Honorable: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Impatient: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Independent: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Irritated: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Peeved: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Protective: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Quiet: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Rankled: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Secure: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  "Self-Assured": {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Separate: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Steady: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Uninspired: {
    category: "anger",
    intensity: "soft",
    value: 6,
  },
  Affronted: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Aggravated: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Angry: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Antagonized: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Apathetic: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Arrogant: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Autonomous: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  "Aware of my shadow": {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Bored: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Bristling: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  "Clear-Eyed": {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Cold: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Courageous: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Defended: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Dignified: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Disinterested: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Exasperated: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Incensed: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Indifferent: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Indignant: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Inflamed: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Listless: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Mad: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Offended: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Protected: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Resentful: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  "Riled up": {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Sarcastic: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  "Self-Aware": {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Sharp: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Sovereign: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Steadfast: {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  "Well-Boundaried": {
    category: "anger",
    intensity: "medium",
    value: 4,
  },
  Aggressive: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Appalled: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Belligerent: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Bitter: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Contemptuous: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Disgusted: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Energized: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Fierce: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Furious: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Hateful: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Hostile: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Hypocritical: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Integrated: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Irate: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Livid: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Loathing: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Menacing: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Numb: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Passionate: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  "Piercingly aware": {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Powerful: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Projecting: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Raging: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Ranting: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Raving: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Righteous: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Seething: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  "Shadow-Resourced": {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Shielded: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Spiteful: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Transformed: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  "Tuned out": {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Unresponsive: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Vengeful: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Vicious: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Vindictive: {
    category: "anger",
    intensity: "intense",
    value: 2,
  },
  Violent: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Awkward: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Conscientious: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Considerate: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Decent: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Discomfited: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Ethical: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Flushed: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Flustered: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Forgiving: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Hesitant: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Honest: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Humble: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Reserved: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Restrained: {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  "Self-Conscious": {
    category: "shame",
    intensity: "soft",
    value: 6,
  },
  Abashed: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Apologetic: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Ashamed: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Chagrined: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Contrite: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Culpable: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Embarrassed: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Guilty: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Humbled: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Intimidated: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Just: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Moral: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Noble: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Penitent: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Principled: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Regretful: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Remorseful: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Reproachful: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Respectable: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Rueful: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  "Self-Effacing": {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  "Self-Respecting": {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Sheepish: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  SorrySpeechless: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Upstanding: {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  "Willing to Change": {
    category: "shame",
    intensity: "medium",
    value: 4,
  },
  Withdrawn: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Belittled: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  "Conscience-Stricken": {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Degraded: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Demeaned: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Disgraced: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  "Guilt-Ridden": {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  "Guilt-Stricken": {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Humiliated: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Incorruptible: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Mortified: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Ostracized: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  "Self-Condemning": {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  "Self Flagellating": {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Shamefaced: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Stigmatized: {
    category: "shame",
    intensity: "intense",
    value: 2,
  },
  Adaptable: {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  Changeable: {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  Doubtful: {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  Innocent: {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  Malleable: {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  "Open-Minded": {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  Pensive: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Preoccupied: {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  Puzzled: {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  "Soft-Focused": {
    category: "confusion",
    intensity: "soft",
    value: 6,
  },
  Bewildered: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Clouded: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Confused: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Contemplative: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Floating: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Fuzzy: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Indecisive: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Muddled: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Nebulous: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Perplexed: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Spacious: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Uncertain: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Unfocused: {
    category: "confusion",
    intensity: "medium",
    value: 4,
  },
  Befuddled: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Discombobulated: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Disoriented: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Escaping: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Immobile: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Lost: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Mystified: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Overwhelmed: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Scattered: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Suspended: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Timeless: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Waiting: {
    category: "confusion",
    intensity: "intense",
    value: 2,
  },
  Capable: {
    category: "anxiety",
    intensity: "soft",
    value: 6,
  },
  "Clear-headed": {
    category: "anxiety",
    intensity: "soft",
    value: 6,
  },
  Focused: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Organized: {
    category: "anxiety",
    intensity: "soft",
    value: 6,
  },
  Prepared: {
    category: "anxiety",
    intensity: "soft",
    value: 6,
  },
  Activated: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Anxious: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Attentive: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Competent: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  "Deadline-Conscious": {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Efficient: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Excited: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  "Forward-Focused": {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Motivated: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Nervous: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Ready: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  "Task-Focused": {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Vigilant: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Worried: {
    category: "anxiety",
    intensity: "medium",
    value: 4,
  },
  Accomplished: {
    category: "anxiety",
    intensity: "intense",
    value: 2,
  },
  Driven: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Frenzied: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  "Hyper-Activated": {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  "Laser-Focused": {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Pressed: {
    category: "anxiety",
    intensity: "intense",
    value: 2,
  },
  Vigorous: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Alert: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Apprehensive: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Aware: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Careful: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Cautious: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Clear: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Concerned: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Conscious: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Curious: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Disconcerted: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Disquieted: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Edgy: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Fidgety: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Insecure: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Instinctive: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Intuitive: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Leery: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Lucid: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Mindful: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Oriented: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Perceptive: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Shy: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Timid: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Uneasy: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Watchful: {
    category: "fear",
    intensity: "soft",
    value: 6,
  },
  Afraid: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Alarmed: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Aversive: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Distrustful: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Disturbed: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Fearful: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Jumpy: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Perturbed: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Rattled: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Resourceful: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  "Safety-Seeking": {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Shaky: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Startled: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Suspicious: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Unnerved: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Unsettled: {
    category: "fear",
    intensity: "medium",
    value: 4,
  },
  Wary: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Dissociated: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  "Filled with Dread": {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  "Healing from Trauma": {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Horrified: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Motionless: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Panicked: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Paralyzed: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Petrified: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Phobic: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Reintegrated: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  "Self-Preserving": {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Shocked: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  "Survival-Focused": {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Terrorized: {
    category: "fear",
    intensity: "intense",
    value: 2,
  },
  Connected: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Disbelieving: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Fair: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Inspired: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Trusting: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Vulnerable: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Wanting: {
    category: "envy",
    intensity: "soft",
    value: 6,
  },
  Ambitious: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Amorous: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Bonded: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Committed: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Covetous: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Demanding: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Desirous: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Devoted: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Disrespected: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Envious: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Equitable: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Generous: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Guarded: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Jealous: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Lonely: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Loving: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Loyal: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Prosperous: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Romantic: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Threatened: {
    category: "envy",
    intensity: "medium",
    value: 4,
  },
  Affluent: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Ardent: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Avaricious: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Fixated: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Deprived: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Gluttonous: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Grasping: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Greedy: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  "Green with Envy": {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Longing: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Lustful: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Obsessed: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  "Persistently Jealous": {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Possessive: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  "Power-Hungry": {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Voracious: {
    category: "envy",
    intensity: "intense",
    value: 2,
  },
  Amused: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Comfortable: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Encouraged: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Engaged: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Friendly: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Hopeful: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Jovial: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Naïve: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Open: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Peaceful: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Smiling: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Unaware: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Upbeat: {
    category: "happy",
    intensity: "soft",
    value: 6,
  },
  Appreciative: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Cheerful: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Contented: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Delighted: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Fulfilled: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Glad: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Gleeful: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Gratified: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Happy: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  "Healthy Self-Esteem": {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Invigorated: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Joyful: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Lively: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Merry: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Optimistic: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  PlayfulPleased: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Praiseworthy: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Proud: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Rejuvenated: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Tickled: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Unrealistic: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  Ungrounded: {
    category: "happy",
    intensity: "medium",
    value: 4,
  },
  "Awe-Filled": {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Blissful: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Ecstatic: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Egocentric: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Elated: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Enthralled: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Euphoric: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Exhilarated: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Expansive: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Flighty: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Giddy: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Gullible: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Heedless: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Inflated: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Jubilant: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Manic: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Oblivious: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Overconfident: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Overjoyed: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Radiant: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Rapturous: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Reckless: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Renewed: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Satisfied: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  "Self-Aggrandized": {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Thrilled: {
    category: "happy",
    intensity: "intense",
    value: 2,
  },
  Disappointed: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Disconnected: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Fluid: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Grounded: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Low: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Relaxed: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Releasing: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Restful: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Wistful: {
    category: "sad",
    intensity: "soft",
    value: 6,
  },
  Dejected: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Discouraged: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Dispirited: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Down: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Drained: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Grieving: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  "Heavy-hearted": {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Honoring: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Lamenting: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Melancholy: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Mournful: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Relieved: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Remembering: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Respectful: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  RestoredSad: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Soothed: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Sorrowful: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Still: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Weepy: {
    category: "sad",
    intensity: "medium",
    value: 4,
  },
  Anguished: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Bereaved: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Cleansed: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Despairing: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Despondent: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Forlorn: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  "Grief-Stricken": {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Heartbroken: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Inconsolable: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Morose: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Released: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Revitalized: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Sanctified: {
    category: "sad",
    intensity: "intense",
    value: 2,
  },
  Downtrodden: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  "Fed Up": {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  "Worthless-like": {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Flat: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Helpless: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Humorless: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Impulsive: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Isolated: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Lethargic: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Pessimistic: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Practical: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Purposeless: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Realistic: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Resolute: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Tired: {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  "World-Weary": {
    category: "depression",
    intensity: "soft",
    value: 6,
  },
  Bereft: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Crushed: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Depressed: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Desolate: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Desperate: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Emancipated: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Empty: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Fatalistic: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Gloomy: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Hibernating: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Hopeless: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Inactive: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  "Inward-Focused": {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Joyless: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Miserable: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Morbid: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Passionless: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Pleasureless: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Sullen: {
    category: "depression",
    intensity: "medium",
    value: 4,
  },
  Agonized: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Bleak: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  "Death-Seeking": {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Devastated: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Doomed: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Freed: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Frozen: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Gutted: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Liberated: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Nihilistic: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Numbed: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Reborn: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  "Self-Destructive": {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Tormented: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
  Tortured: {
    category: "depression",
    intensity: "intense",
    value: 2,
  },
};
