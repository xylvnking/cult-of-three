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

[Sven The Blind Warrior](https://youtu.be/X6IjmmFcoWw)
[True Blind Gaming q&a](https://youtu.be/Q811409RCNQ)

https://killscreen.com/themeta/visually-impaired-players-staying-game/

I just don't think 3D binaural audio is needed to create a fun audio-game. Regular 2D audio hasn't even begun to be explored yet, so needing to go above and beyond is excessive at this point imo. find me a fun 2d audio game. i'll wait. why go further? what limitations do you need to surpass? free yourself from the shackles of the third dimension.
