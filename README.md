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

# about

this project is more of a meditation on audio-ux than audio engineer. the difficulty doesn't come from getting things to sound high quality, but rather in understanding the subjective experience that the audio provides.