export type UserProfile = {
  id: number;
  name: string;
  age: number;
  major: string;
  distance: string;
  interests: string[];
  bio: string;
  images: string[];
};

export const mockProfiles: UserProfile[] = [
  {
    id: 1,
    name: 'Jessica',
    age: 21,
    major: 'Computer Science',
    distance: '2 miles away',
    interests: ['Coding', 'Hiking', 'Photography'],
    bio: 'Aspiring software engineer and avid hiker. Looking for someone to explore new trails and debug code with. 💻🌲',
    images: ['https://picsum.photos/seed/jessica/600/800'],
  },
  {
    id: 2,
    name: 'Alex',
    age: 23,
    major: 'Fine Arts',
    distance: '1 mile away',
    interests: ['Painting', 'Museums', 'Indie Music'],
    bio: 'Art student who spends most of my time in the studio. My ideal date is a trip to the art museum or a concert.',
    images: ['https://picsum.photos/seed/alex/600/800'],
  },
  {
    id: 3,
    name: 'Ben',
    age: 22,
    major: 'Business Administration',
    distance: '5 miles away',
    interests: ['Startups', 'Gym', 'Coffee'],
    bio: 'Future entrepreneur. When I\'m not working on my business plan, you can find me at the gym or trying new coffee shops.',
    images: ['https://picsum.photos/seed/ben/600/800'],
  },
  {
    id: 4,
    name: 'Chloe',
    age: 20,
    major: 'Biology',
    distance: 'on campus',
    interests: ['Volunteering', 'Yoga', 'Baking'],
    bio: 'Pre-med student passionate about helping others. I unwind with yoga and baking too many cookies. 🍪🧘‍♀️',
    images: ['https://picsum.photos/seed/chloe/600/800'],
  },
  {
    id: 5,
    name: 'David',
    age: 24,
    major: 'Mechanical Engineering',
    distance: '3 miles away',
    interests: ['Cars', 'Sci-Fi Movies', 'Gaming'],
    bio: 'Just a guy who loves building things, from robots to gaming PCs. Looking for a player 2 for life.',
    images: ['https://picsum.photos/seed/david/600/800'],
  },
];

export const mockMatches = [
    {
        id: 1,
        name: 'Jessica',
        avatar: 'https://picsum.photos/seed/jessica/100/100',
        lastMessage: 'Sounds good! See you then. 😊',
        lastMessageTime: '5m',
        isOnline: true,
    },
    {
        id: 4,
        name: 'Chloe',
        avatar: 'https://picsum.photos/seed/chloe/100/100',
        lastMessage: 'Haha, that\'s hilarious! 😂',
        lastMessageTime: '1h',
        isOnline: false,
    },
    {
        id: 10,
        name: 'Sophia',
        avatar: 'https://picsum.photos/seed/sophia/100/100',
        lastMessage: 'You: Check out this song!',
        lastMessageTime: '3h',
        isOnline: true,
    },
    {
        id: 8,
        name: 'Liam',
        avatar: 'https://picsum.photos/seed/liam/100/100',
        lastMessage: 'I\'m down for that.',
        lastMessageTime: 'yesterday',
        isOnline: false,
    },
];

export const mockChatMessages = [
    { id: 1, sender: 'them', text: 'Hey! Saw we matched. You seem cool!', timestamp: '10:30 AM' },
    { id: 2, sender: 'me', text: 'Hey Jessica! Likewise. Your hiking pics are amazing.', timestamp: '10:31 AM' },
    { id: 3, sender: 'them', text: 'Thanks! I just got back from a trip to the mountains. You should come next time!', timestamp: '10:32 AM' },
    { id: 4, sender: 'me', text: 'I\'d love that! What are you up to this weekend?', timestamp: '10:33 AM' },
    { id: 5, sender: 'them', text: 'I was thinking of checking out that new coffee shop downtown. Interested?', timestamp: '10:34 AM' },
    { id: 6, sender: 'me', text: 'Sounds good! See you then. 😊', timestamp: '10:35 AM' },
];
