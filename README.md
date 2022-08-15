# CULT OF THREE

<img src="public/Images/co3banner.png" width="100%"/>



# About 

- Can be played entirely without looking at the screen
- 4 controls (a,s,d keys + spacebar) which change functionality depending on context
- Short and easy to play, with a score system that rewards skill
- 1 of 3 enemies appear, the player presses the corresponding key to attack them
- A proof-of-concept for a much larger 'fully accessible' dungeon crawler RPG I plan to make

# How to play

[Open the game](https://cult-of-three.vercel.app/) and follow the onscreen instructions which explain the controls and the contexts in which they appear. It's pretty simple.

# Technologies used

- React
- TypeScript (about 90% typesafe, still learning)
- Howler.js (via the [useSound hook by Joshua Comeau](https://github.com/joshwcomeau/use-sound))
- Next.js (hosted with Vercel)

# How it works

Game engines generally use ticks or frames to measure the passage of time - but this project relies on React's re-rendering of components to do the same.

There's a lot of pieces of state going on at once to make even a simple game function without bugs. Based on the complex combination of state, the user's input has different effects. For example if they're in the safezone, hitting any control puts them into combat, if they're in combat (and an enemy had just attacked) and they hit any key other than the one corresponding to that enemy, they take damage.

With this project I wanted to further my understanding of React and how it re-renders components, and how to handle a lot of complex state. I'm definitely going to look into redux for my next project.

# What I would do differently

- My regret is not making it more modular - everything is dependent on everything else to a large degree due to poor design. I refactored it a lot to improve on this, but ultimately at its core there's some things I'm unsatisfied with. I didn't really know how to make a game when I started this - but I learned a lot and I'm really excited to apply what I learned to a new project.

- I underestimated how hard it was to create a high quality 'blind UX' while both keeping the game small and short - I cut back a lot of narrative content and other things because it felt goofy to have all of that for such a short and simple game. From my limited experience with game development I understand the concept of scope creep and how important it is to keep your projects small, so I opted to consider this a learning experience instead of something I'd feel comfortable releasing or promoting. 

- Ultimately I'm happy with it and it's very typesafe and I'm proud of the programming I did, but the game itself is bad - if it can be considered a game at all.

- For a proper release I'd definitely use firebase or some other easy backend so that players could keep their progression.

- The ui for an audio game is somewhat uncharted territory, but I wanted to include *something* on screen so that low-vision folks who feel more comfortable getting that sensory info could have it, and so that it wasn't as confusing for sighted players.

- I'd create the 'audio scenes' in unreal or unity. Using a daw to create '3D audio environments' is not ideal, even with 10 years of experience using them. There's plugins to emulate positioning things in 3D space, but really the quality of object occlusion and real time movement and everything that 3D engines can offer is unparalled. It would also make it easier to create the sighted experience as well. It was beyond the scope of this, but my experience with both unity and unreal make me know it can be done better and more efficiently.

# What's next?

I'm really interested in making audio games. Audio brings games to life and makes them feel 'real'. Try playing some big fantasy game on mute - the world doesn't feel like it's there but as soon as you have sound (especially with nice headphones) it really allows us to immerse ourselves.

I'm a mix engineer and hobbyist producer, not a sound designer or composer - so my skills translate in a limited technical sense when it comes to game audio. What does translate though is understanding a persons *experience* of the audio. Mixing music is really just curating the UX of a song. The same fundamentals apply to game audio - how loud should the background be? how fast or slow should the gunshots ring out? will having full lush forest environment sounds cause ear fatigue during long play sessions and should we opt for a more minimal design?

These questions are things audio people handle and non-audio people don't think about until one of them is answered wrong. For example in the game The Division 2, you're constantly unleashing thousands of bullets almost every moment. If the sound design for the guns was huge and in your face it would be exhausting - even if it was exciting for the first play session. You can notice this in the transformers movies too - the sound in those giant action scenes is oddly sparse, but very specific so that you really hear all the detail in the mechanical transformations, instead of just a wall of metal clashing.

TLDR; Audio games are on my radar. I've been doing a lot of research and it's something I'd love to create.

# Artwork

All artwork created using Midjourney AI

# relevant links

[useSound hook repo](https://github.com/joshwcomeau/use-sound)

[howler docs](https://github.com/goldfire/howler.js#documentation)

[true bling gaming beats the zelda water temple](https://www.youtube.com/watch?v=YiAxxZ2HOpM&ab_channel=TrueBlindGaming)

[Sven The Blind Warrior](https://youtu.be/X6IjmmFcoWw)

[True Blind Gaming q&a](https://youtu.be/Q811409RCNQ)

[I'm Blind - But I'll Destroy Anyone On Mortal Kombat | TOTALLY GAME](https://youtu.be/cKsyk55pLCc)

[vice: This Is How To Play Video Games If You're Totally Blind (HBO)](https://youtu.be/aX0oPwQPo9A)

[using a '2 person controller' where the sighted person controls movement and blind person controls everything else](https://youtu.be/cKsyk55pLCc?t=223)

https://killscreen.com/themeta/visually-impaired-players-staying-game/


