# Getting Started
- `pnpm` is expected to be used. 
- Install dependencies using `pnpm i`
- To run the program run `pnpm run dev`.

# Inspiration
- Inspired by micro-interactions, this app lets each breed / sub-breed deal with its own data modelling, fetching etc.
- Using `Mobx State Tree` features things can be run in parallel and in a very efficient manner. 
- The relationship between `sub-breed` and `breed` is also evident by using parent child relationship.
  - Hence aggregated images list can be obtained and following observer pattern, the UI doens't have to worry about it.

