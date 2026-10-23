/* Funship prototype: static catalogue + seed data. All names and content are fictional. */
window.FS = window.FS || {};

FS.TIERS = {
  sprout: {
    id: "sprout", name: "Sprout", price: 299, cad: 415, days: "5–7 working days",
    pitch: "A focused little app built around one thing your family does.",
    includes: ["Up to 4 screens", "One main thing it does", "Up to 5 family members", "Your names, colours and pictures", "One round of changes", "30 days of fixes"],
  },
  bloom: {
    id: "bloom", name: "Bloom", price: 699, cad: 970, days: "10–14 working days",
    pitch: "A richer app with a few connected parts and its own characters.",
    includes: ["Up to 8 screens", "Up to 3 things it does", "Up to 10 family members", "Remembers your family's progress", "Custom characters and illustrations", "Two rounds of changes", "30 days of fixes"],
  },
  grove: {
    id: "grove", name: "Grove", price: 1499, cad: 2075, days: "15–25 working days",
    pitch: "A bigger family world with more screens, content and care.",
    includes: ["Up to 12 screens", "Up to 5 things it does", "Up to 20 family members", "Richer theming and artwork", "Three rounds of changes", "30 days of fixes"],
  },
};

FS.CATEGORIES = [
  { id: "trips", name: "Trips & adventures", colour: "lagoon", icon: "map" },
  { id: "meals", name: "Meals & cooking", colour: "sun", icon: "pot" },
  { id: "routines", name: "Schedules & routines", colour: "sky", icon: "clock" },
  { id: "chores", name: "Chores & rewards", colour: "sun", icon: "star" },
  { id: "games", name: "Kids' games & stories", colour: "bubble", icon: "dice" },
  { id: "celebrations", name: "Celebrations & gifts", colour: "bubble", icon: "cake" },
  { id: "memories", name: "Memories & keepsakes", colour: "sky", icon: "book" },
  { id: "far", name: "Grandparents & far-away family", colour: "lagoon", icon: "heart" },
  { id: "learning", name: "Learning & practice", colour: "sky", icon: "pencil" },
];

// goal: easier | playful | gift
FS.IDEAS = [
  { slug: "japan-family-quest", cat: "trips", name: "Japan Family Quest", goal: "playful", tier: "bloom", pitch: "Turn a trip itinerary into a shared adventure map.", magic: "Your kid unlocks the next city when the family finishes a day.", features: ["Day-by-day itinerary", "Saved places", "Packing and to-do checklist", "City unlocks"] },
  { slug: "road-trip-bingo", cat: "trips", name: "Road Trip Bingo", goal: "playful", tier: "sprout", pitch: "Bingo cards made from the sights only your family would shout about.", magic: "\"Grandpa's favourite gas station!\" is a square.", features: ["Custom bingo cards", "New rounds anytime", "Score board"] },
  { slug: "family-memory-map", cat: "trips", name: "Family Memory Map", goal: "gift", tier: "bloom", pitch: "A private trip journal with your photos and notes.", magic: "Scroll back through every place you've been together.", features: ["Places you add yourselves", "Photo cards", "Timeline"] },

  { slug: "dinner-picker", cat: "meals", name: "The Dinner Picker", goal: "easier", tier: "sprout", pitch: "Plan the week from meals everyone has already said yes to.", magic: "No more \"what's for dinner?\" at 5:45.", features: ["Family-approved meal cards", "Simple filters", "Weekly plan"] },
  { slug: "little-chef-cards", cat: "meals", name: "Little Chef Cards", goal: "playful", tier: "bloom", pitch: "Recipes written for your kid, with their own illustrations.", magic: "They cook from a recipe card that has their drawing on it.", features: ["Kid-friendly steps", "Grown-up safety notes", "Illustrations"] },
  { slug: "family-recipe-garden", cat: "meals", name: "Family Recipe Garden", goal: "gift", tier: "bloom", pitch: "Keep grandma's recipes, and the stories behind them, in one place.", magic: "The handwritten card and the story, saved together.", features: ["Recipe library", "Categories", "Private photos"] },

  { slug: "morning-mission", cat: "routines", name: "Morning Mission", goal: "easier", tier: "sprout", pitch: "Turn the morning routine into a run of cheerful steps.", magic: "Shoes on happens without a single reminder.", features: ["Routine cards", "Done states", "Character rewards"] },
  { slug: "shared-family-week", cat: "routines", name: "Shared Family Week", goal: "easier", tier: "bloom", pitch: "One calm view of everything happening this week.", magic: "Everyone knows who's driving to swim club.", features: ["Weekly list view", "Events you add", "Colour per person"] },
  { slug: "bedtime-lantern", cat: "routines", name: "Bedtime Lantern", goal: "easier", tier: "sprout", pitch: "A gentle, personal wind-down routine.", magic: "The lantern dims as each step is done.", features: ["Bedtime steps", "Soft illustrations", "Optional timer"] },

  { slug: "chore-quest", cat: "chores", name: "Chore Quest", goal: "playful", tier: "bloom", pitch: "Kids finish chores to earn stars toward a reward you choose.", magic: "Their own dragon cheers when the dishwasher is emptied.", features: ["Chore cards", "Stars and rewards", "Pick your character", "Parent reset"] },
  { slug: "family-quest-board", cat: "chores", name: "Family Quest Board", goal: "playful", tier: "bloom", pitch: "A shared board of family goals and what you've done together.", magic: "Watch the board fill up over a summer.", features: ["Quest cards", "Progress", "History"] },
  { slug: "pocket-points", cat: "chores", name: "Pocket Points", goal: "easier", tier: "bloom", pitch: "A small points board for the jobs everyone agreed on.", magic: "Points for helping, rewards you decide together.", features: ["Points", "Rewards you set", "Parent controls"] },

  { slug: "drawn-by-me-quest", cat: "games", name: "Drawn-by-Me Quest", goal: "gift", tier: "bloom", pitch: "Your kid's drawing becomes the hero of a little game.", magic: "The monster they drew on Tuesday saves the day.", features: ["Their drawing as the hero", "Simple choices", "Progress"] },
  { slug: "bedtime-story-machine", cat: "games", name: "Bedtime Story Machine", goal: "playful", tier: "bloom", pitch: "A choose-your-path story world with your own characters.", magic: "Tonight, the cat gets to choose the cave.", features: ["Story branches", "Illustrations", "Start again"] },
  { slug: "pet-hero", cat: "games", name: "Pet Hero", goal: "gift", tier: "bloom", pitch: "Your pet becomes the star of a little collecting game.", magic: "Biscuit the beagle, legendary badge collector.", features: ["Pet character cards", "Badges", "Saved progress"] },

  { slug: "birthday-universe", cat: "celebrations", name: "Birthday Universe", goal: "gift", tier: "bloom", pitch: "A birthday world with personal quests and messages from family.", magic: "Messages from cousins unlock through the day.", features: ["Countdown", "Activity cards", "Photos", "Messages"] },
  { slug: "holiday-countdown", cat: "celebrations", name: "Holiday Countdown", goal: "playful", tier: "sprout", pitch: "A countdown with a small family activity behind each day.", magic: "Day 12: hot chocolate taste test.", features: ["Countdown", "Daily reveals", "Illustrations"] },
  { slug: "new-baby-welcome-book", cat: "celebrations", name: "New Baby Welcome Book", goal: "gift", tier: "bloom", pitch: "A private digital keepsake for a new arrival.", magic: "First smile, first bath, first visit from grandma.", features: ["Milestones", "Photos", "Messages"] },

  { slug: "our-family-book", cat: "memories", name: "Our Family Book", goal: "gift", tier: "bloom", pitch: "A private storybook made from your photos and captions.", magic: "The kids ask to read it at bedtime.", features: ["Chapters", "Photo pages", "Captions"] },
  { slug: "grandparent-stories", cat: "memories", name: "Grandparent Stories", goal: "gift", tier: "grove", pitch: "Save the stories older family members tell.", magic: "Grandpa's farm stories, kept for the great-grandkids.", features: ["Written stories", "Photos", "Chapters by person"] },
  { slug: "year-in-our-life", cat: "memories", name: "Year in Our Life", goal: "gift", tier: "bloom", pitch: "A visual recap of your family's favourite moments.", magic: "A year you can flip through on New Year's Eve.", features: ["Timeline", "Categories", "Captions"] },

  { slug: "hello-grandma", cat: "far", name: "Hello, Grandma", goal: "easier", tier: "bloom", pitch: "One easy place for photos, messages and call times.", magic: "Grandma opens one link and everything is there.", features: ["Private gallery", "Call schedule", "Big, simple buttons"] },
  { slug: "family-hello-board", cat: "far", name: "Family Hello Board", goal: "playful", tier: "bloom", pitch: "A shared board of greetings and family news.", magic: "Notes from three time zones on one fridge.", features: ["Message cards", "Photos", "Parent approves what's posted"] },
  { slug: "our-people-book", cat: "far", name: "Our People Book", goal: "easier", tier: "sprout", pitch: "A kid-friendly guide to who's who in your family.", magic: "\"That's Auntie Ro, she has the parrot.\"", features: ["Portraits", "Who's who", "Captions"] },

  { slug: "spelling-safari", cat: "learning", name: "Spelling Safari", goal: "playful", tier: "bloom", pitch: "Spelling practice with this week's words from school.", magic: "Each word found is an animal spotted.", features: ["Word cards", "Quizzes", "Progress"] },
  { slug: "piano-practice-quest", cat: "learning", name: "Piano Practice Quest", goal: "playful", tier: "sprout", pitch: "A cheerful practice checklist built around their goals.", magic: "Badges for practising, never a guilt streak.", features: ["Practice sessions", "Badges", "Goals"] },
  { slug: "our-language-garden", cat: "learning", name: "Our Language Garden", goal: "playful", tier: "bloom", pitch: "Practise the words your family wants to learn.", magic: "Grandma's words, growing in the garden.", features: ["Flashcards", "Quizzes", "Your own word lists"] },
];

FS.STAGES = [
  { id: "sketching", name: "Sketching", note: "Agreeing on the idea and how it looks" },
  { id: "building", name: "Building", note: "Making the main parts work" },
  { id: "polishing", name: "Polishing", note: "Refining details and testing" },
  { id: "ready", name: "Ready to play", note: "Your review, then it's yours" },
];

FS.REQUEST_STATUS = {
  DRAFT: "Draft",
  SUBMITTED: "Waiting for review",
  CALL_BOOKED: "Call booked",
  PROPOSAL_SENT: "Plan ready for you",
  IN_PROGRESS: "Being built",
  DELIVERED: "Delivered",
  DECLINED: "Not something we can make",
};

FS.seed = function () {
  const now = Date.now();
  const day = 86400000;
  return {
    version: 3,
    viewer: "alex",
    users: {
      alex: { id: "alex", name: "Alex Chen", role: "parent", familyId: "chen", email: "alex@example.com" },
      jamie: { id: "jamie", name: "Jamie Morgan", role: "parent", familyId: "morgan", email: "jamie@example.com" },
      maker: { id: "maker", name: "You (maker)", role: "admin" },
    },
    families: {
      chen: { id: "chen", name: "The Chen family", members: [
        { name: "Alex", kind: "adult" }, { name: "Sam", kind: "adult" },
        { name: "Maya", kind: "child", age: "5–7" }, { name: "Leo", kind: "child", age: "8–12" },
      ] },
      morgan: { id: "morgan", name: "The Morgan family", members: [
        { name: "Jamie", kind: "adult" }, { name: "Taylor", kind: "adult" },
        { name: "Ivy", kind: "child", age: "8–12" }, { name: "Theo", kind: "child", age: "8–12" },
      ] },
    },
    requests: [
      {
        id: "r-chore", familyId: "chen", idea: "chore-quest", title: "Chore Quest", status: "IN_PROGRESS", tier: "bloom",
        created: now - 21 * day, wish: "Our two kids fight over chores. We want a game where Maya and Leo earn stars toward Friday movie night, with a dragon Leo drew as the mascot.",
        brief: {
          purpose: "Make weekday chores feel like a quest so Maya (6) and Leo (9) do them without nagging.",
          people: "Maya and Leo use it on the family iPad. Alex and Sam set chores and rewards.",
          workflow: "Each child picks their character, ticks off chores, earns stars, and sees progress toward the weekly reward.",
          look: "Bright and friendly. Leo's dragon drawing is the mascot. Purple and yellow.",
          features: ["Chore cards per child", "Stars toward a reward", "Pick your character", "Parent reset each Sunday"],
          exclusions: ["No money or allowance tracking", "No notifications"],
          questions: [],
        },
        projectId: "p-chore",
      },
      {
        id: "r-japan", familyId: "morgan", idea: "japan-family-quest", title: "Japan Family Quest", status: "PROPOSAL_SENT", tier: "bloom",
        created: now - 9 * day, wish: "We're going to Japan for 12 days in March. Ivy and Theo should feel like it's an adventure, not a schedule.",
        brief: {
          purpose: "Turn the March Japan trip into a shared quest so the kids look forward to each day.",
          people: "Whole family on phones. Ivy (11) and Theo (9) unlock cities.",
          workflow: "Day cards with plans, a map of cities that unlock, and a packing checklist.",
          look: "Paper-cut map style, cherry blossom pink, calm.",
          features: ["12 day cards", "City unlocks", "Saved places", "Packing checklist"],
          exclusions: ["No live maps or bookings", "Works offline isn't guaranteed"],
          questions: [],
        },
        call: { at: now - 4 * day, notes: "Kids love trains. Add a 'train spotted' badge. Taylor wants the itinerary editable by adults only." },
        proposal: { id: "q-japan", tier: "bloom", price: 699, deposit: 350, due: "50% now, 50% before delivery", delivery: "10–14 working days after kickoff", revisions: 2, scope: ["Up to 8 screens", "12 day cards from your itinerary", "City unlock map", "Packing checklist", "Train-spotted badge"], status: "SENT" },
      },
    ],
    projects: {
      "p-chore": {
        id: "p-chore", requestId: "r-chore", familyId: "chen", name: "Chore Quest", stage: "building", target: now + 6 * day,
        updates: [
          { at: now - 14 * day, text: "Kickoff! I've got Leo's dragon drawing and your chore list." },
          { at: now - 9 * day, text: "Sketches approved. Moving on to building the star board." },
          { at: now - 2 * day, text: "The preview is ready to try. Tap the feedback button on any screen to tell me what to change." },
        ],
        previewReady: true, appSlug: "chen-chore-quest",
      },
    },
    feedback: [
      { id: "f1", projectId: "p-chore", familyId: "chen", by: "Maya (kid mode)", screen: "Star board", at: now - 1 * day, text: "The stars are too small, and Maya wants a unicorn instead of a dragon.", mood: "😐", theme: "Characters", sentiment: "mixed", status: "new" },
      { id: "f2", projectId: "p-chore", familyId: "chen", by: "Alex", screen: "Parent settings", at: now - 1 * day + 3600000, text: "Can the reset happen Sunday night instead of Monday morning?", mood: "🙂", theme: "Schedule", sentiment: "positive", status: "planned" },
    ],
    gifts: [
      { id: "g1", token: "demo-gift", amount: 300, from: "Grandma Rose", to: "The Patel family", toEmail: "patel@example.com", forChild: "Arjun", message: "For a game starring Arjun's drawings. Love you all!", sendOn: now + 3 * day, status: "SCHEDULED" },
    ],
    payments: [
      { id: "pay1", familyId: "chen", label: "Chore Quest · deposit", amount: 350, at: now - 14 * day, status: "Paid" },
    ],
    bookings: [
      { id: "b1", familyId: "morgan", requestId: "r-japan", at: now - 4 * day, status: "Done" },
      { id: "b2", familyId: "chen", requestId: "r-chore", at: now + 2 * day + 3600000 * 3, status: "Upcoming" },
    ],
    choreApp: {
      kid: "Maya", character: "dragon",
      chores: {
        Maya: [ { t: "Make my bed", s: 1, done: true }, { t: "Feed Biscuit", s: 2, done: false }, { t: "Toys in the box", s: 1, done: false }, { t: "Set the table", s: 2, done: false } ],
        Leo: [ { t: "Empty the dishwasher", s: 2, done: true }, { t: "Take out recycling", s: 2, done: true }, { t: "Homework before screens", s: 3, done: false }, { t: "Walk Biscuit", s: 2, done: false } ],
      },
      goal: 20, banked: { Maya: 9, Leo: 13 }, reward: "Friday movie night",
    },
    drafts: {},
  };
};
