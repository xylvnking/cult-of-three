

# relvant links

[useSound hook repo](https://github.com/joshwcomeau/use-sound)
[howler docs](https://github.com/goldfire/howler.js#documentation)


# learned

how to listen for keypress globally

```ts
    import React, { KeyboardEvent} from 'react'
    
    useEffect(() => {
        document.addEventListener('keydown', (e: KeyboardEvent) => console.log(e))
    }, [])
```

```js
// these both work, but require the player to have either clicked on or tabbed to the dom element. could be useful later

export default function Gamestate({}: Props) {
    // option 1
    const keyDownHandler = (event: React.KeyboardEvent<HTMLDivElement>) => {
        console.log(event.code);
    }
    // option 2
    const log = (e: KeyboardEvent): void => {
        console.log(e.key)
    }
    return (
        // option 1
        <p 
            tabIndex={0} 
            onKeyDown={keyDownHandler} 
        >playerHealthPoints: {playerHealthPoints}</p>
        // option 2
        <input type='text' onKeyUp={log} defaultValue='Hey!' />
    )
}
```

### how to access howler stuff from useSound hook

```js
const [playEnvironmentOneSound, playEnvironmentOneSoundControls] = useSound('/forest.mp3', {
        volume: 0.5,
        loop: true,
        mute: true
        // etc...
    })
playEnvironmentOneSoundControls.sound._muted
```

# about

this project is more of a meditation on audio-ux than audio engineer. the difficulty doesn't come from getting things to sound high quality, but rather in understanding the subjective experience that the audio provides.

# learned

handling user input based on context without relying on visual UI elements
depending on whether the player is in battle, safezone, or pause menu, the same keys perform different actions

# learned

since i don't really need to worry as much about layout (especially during development) I've been rendering every piece of data and state on screen while I work, which is making it much easier to visualize. since there is complex state interactions here (with the need for same buttons to do different things) it'sbeen really helpful

# learned

returning from a useEffect with an empty dependency array acts as componentWillUnmount

# notes

on making games for the listeners

- they dont want to (only be left with the option of) playing games based on fear

- i think a lot of audio games in the past have still focused on being sighted experiences, just with audio cues instead of visual. navigating a 3d space without vision sucks. at least for me. maybe some like it the way players like me still want to die in dark souls. but generally they've all tried to do too much. 

two ambitious '3d' audio games:
- three monkeys : too ambitious, too corporate, asked for way too much money
- Pitch black : kickstarted, watching closely.

- cult of three is more of a blind esport. there is a narrative, but it's not required to play. i don't personally play many long story driven narrative games, even though i appreciate them existing, so i wanted to provide listeners with that option as well. me personally i would get annoyed being forced to walk through this giant immersive world cutscene. when does it end? where am i? where are we going? does this matter? can i skip it? can i come back to it?


[true bling gaming beats the zelda water temple](https://www.youtube.com/watch?v=YiAxxZ2HOpM&ab_channel=TrueBlindGaming)
[Sven The Blind Warrior](https://youtu.be/X6IjmmFcoWw)
[True Blind Gaming q&a](https://youtu.be/Q811409RCNQ)
[I'm Blind - But I'll Destroy Anyone On Mortal Kombat | TOTALLY GAME](https://youtu.be/cKsyk55pLCc)
[vice: This Is How To Play Video Games If You're Totally Blind (HBO)](https://youtu.be/aX0oPwQPo9A)

https://killscreen.com/themeta/visually-impaired-players-staying-game/

I just don't think 3D binaural audio is needed to create a fun audio-game. Regular 2D audio hasn't even begun to be explored yet, so needing to go above and beyond is excessive at this point imo. find me a fun 2d audio game. i'll wait. why go further? what limitations do you need to surpass? free yourself from the shackles of the third dimension.

# gameplay

when you break down most competetive games - what is the actual skill? reflexes? accuracy? gamesense? do these *require* 3 dimensions?

- this game doesn't have traditional frames per second - and every possible scenario could be accounted for, if not a bit complex. Every action triggers the next action, nothing happens without player input.

# learned

when passing a state set function as prop:

```js
<EnvironmentForest 
    gameState={gameState} // passing state
    setIsInCombat={setIsInCombat} // passing state set function
    />
```

# unrelated to game but relevant to blind gaming:

[using a '2 person controller' where the sighted person controls movement and blind person controls everything else](https://youtu.be/cKsyk55pLCc?t=223)

# next for this project

I'm going to remake it from scratch now that I have a better idea of how to go about it. My mistake was that I didn't consider the 'step by step' nature of the game, and could keep track of that better. I should also use more objects and put functions as properties of those, such like when the player takes damage, that should be a function on the player object, not a standalone declaration. This would also allow me to create less rigid and hard-coded code, getting me closer to my idea of making an engine instead of just a game.

using constructors would allow me to create more enemies easier, because if i wanted more enemies i could just 'new ConstructorFunction' them and they'd already posess all the functionality they need through prototypal inheritance too. For example this could allow me to create smaller easier but more numerous enemies, more akin to a dungeon crawler.

I also think more depth in terms of equipment/player stats ould be cool, but outside of the scope of this proof of concept project. 

also using destructuring. can i destructure  a variable from an object held in state and set it directly? probably not but i could probably call a function from itself that does that? or that calls a function declared in its scope? thinking it would be helpful when say passing the player object as a prop to the combat environment, being able to call a 'props.Player.changePlayerHealth(enemyDamage)' function which would call a function on the original object being passed as a prop and set its own state change. sorry i wrote this quick hopefully the idea translates later when I refactor this note


also i've been using function expressions needlessly when i could be using declarations for most of my needs. should check if there is a performance impact. I assume hoisting expressions requires more

also obviously using a backend or *at least* local storage so people can keep their progress

# next updated later on

I really think this has the potential to be a procedural dungeon crawler audio-game later on. It's beyond the scope for this project, but I've been making changes to this one to make the code more reusable for that. I've learned a lot while making this.

I want to make a game that would also be fun for sighted players to play with their blind friends, and give blind players something with a lo skill floor, high skill ceiling, and lots of potential grind if they want it. 

Really there's actually *less* limitations on an audio game. I don't have to worry about meshes or materials or physics or any of the other performance-heavy aspects video games have. In the future I intend to create video games which are also fully accessible, but for now I'm going to have some fun with this.

# designing the ui for an audio game

it's been weird. i don't like the trend most audio games have of having nothing on the screen, because not everybody playing it is 100% totally blind. also as a sighted player I personally don't think I could bring myself to play and audio-only game if the screen was just blank. I understand why, but IMO a nice (and obviously accesible) ui can make a world of difference. For this project I'm going to keep it very minimal, but in the future I'd like to expand upon it a lot.

# scaling font size

i set of goal of making this game fully responsive without any media queries and achieved it

I was having trouble with the font size. I needed it to mostly stay the same during resize, or at least not get too small, which is what was happening when i used px or vw or rem. I ended up solving it by using %

```cs
.keyMap {
    font-size: 500%;
}
```



# up next

I think what I'd like to do ultimately is make scenes in unity/unreal to be able to 'set the stage' with the audio - it's difficult and basically impossible to create a believable 3d space without using 3D software. in howler or three.js it's *possible* but the amount of work wouldn't be worth the result. 

My big gripe with lots of other audio games was that they forced you to use the 3D sound to navigate and whatnot, but i think using it just as a way to provide immersion is really the value it can provide. 

it's beyond the scope of this demo tho.


# refactoring

taking the environment progression away. instead of 3 enemies with 3 moves each in 3 stages, we're having 3 enemies, with one 'move' (which is just a sound saying they've appeared) each, and whent hey are defeated, the game is done.
















# next boilerplate stuff
This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.


# midjourney

used midjourney to get visuals for the UI


# I'm having a hard time actually testing this for accessibility because I'm not good at using the screenreader. It's something I'll have to work on. For now, this project is done.

# react as a game engine

instead of using the traditional frames/ticks to progress 'time' in the game, I used react's re-rendering of the game components.

the disadvantage to this approach is that it required a lot of if statements and conditionals to *stop* things from happening on re-render, as opposed to *causing* things to happen when I needed them to. it required me to essentially block everything that I didn't want to happen, instead of triggering what I did, which is poor design and made refactoring and adding changes unnecessarily difficult. I made two major re-writes to this program and if I was to keeo working on it, I'd start it from scratch and use a different approach.

Trying to make the game only use 3 controls intesified this problem, because it meant that the same control had to also have different functionality according to whatever was going on in the game. 