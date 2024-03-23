import c from "classnames";
import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition } from "hooks";
import { useState } from "react";
import { randomMode } from "utils/random";
import { Button } from "./button";
import { LedDisplay } from "./led-display";

import "./pokedex.css";

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

interface Types {
  [key: string]: {
    image: string;
    color: string;
  };
}

const types: Types = {
  bug: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/7/79/Bug_icon.png/20px-Bug_icon.png",
    color: "#91A119"
  },
  dark: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/3/33/Dark_icon.png/20px-Dark_icon.png",
    color: "#A8B820"
  },
  dragon: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/9/91/Dragon_icon.png/20px-Dragon_icon.png",
    color: "#5060E1"
  },
  electric: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/a/af/Electric_icon.png/20px-Electric_icon.png",
    color: "#FAC000"
  },
  fairy: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/5/5a/Fairy_icon.png/20px-Fairy_icon.png",
    color: "#A8B820"
  },
  fighting: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/7/7d/Fighting_icon.png/20px-Fighting_icon.png",
    color: "#FF8000"
  },
  fire: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/5/5e/Fire_icon.png/20px-Fire_icon.png",
    color: "#E62829"
  },
  flying: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/f/f0/Flying_icon.png/20px-Flying_icon.png",
    color: "#81B9EF"
  },
  ghost: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/8/82/Ghost_icon.png/20px-Ghost_icon.png",
    color: "#704170"
  },
  grass: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/c/cb/Grass_icon.png/20px-Grass_icon.png",
    color: "#3FA129"
  },
  ground: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/5/58/Ground_icon.png/20px-Ground_icon.png",
    color: "#915121"
  },
  ice: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/8/83/Ice_icon.png/20px-Ice_icon.png",
    color: "#3DCEF3"
  },
  normal: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/a/ae/Normal_icon.png/20px-Normal_icon.png",
    color: "#9FA19F"
  },
  poison: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/8/84/Poison_icon.png/20px-Poison_icon.png",
    color: "#9141CB"
  },
  psychic: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/a/a6/Psychic_icon.png/20px-Psychic_icon.png",
    color: "#EF4179"
  },
  rock: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/f/ff/Rock_icon.png/20px-Rock_icon.png",
    color: "#AFA981"
  },
  shadow: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/0/0b/Shadow_icon.png/20px-Shadow_icon.png",
    color: "#A8B820"
  },
  steel: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/b/b8/Steel_icon.png/20px-Steel_icon.png",
    color: "#A8B820"
  },
  unknown: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/8/8e/Unknown_icon.png/20px-Unknown_icon.png",
    color: "#A8B820"
  },
  water: {
    image: "https://archives.bulbagarden.net/media/upload/thumb/7/7f/Water_icon.png/20px-Water_icon.png",
    color: "#2980EF"
  },
};
export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);

  const prev = () => {
    resetTransition();
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI((i) => i - 1);
  };

  const next = () => {
    resetTransition();
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI((i) => i + 1);
  };

  return (
    <div className={c("pokedex", `pokedex-${theme}`)}>
      <div className="panel left-panel">
        <div className="screen main-screen">
          {selectedPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={selectedPokemon.sprites.front_default}
              alt={selectedPokemon.name}
            />
          )}
        </div>
        <div className="screen name-display">
          <div
            className={c(
              "name",
              "obfuscated",
              ready && "ready",
              ready && `ready--${randomMode()}`
            )}
          >
            {selectedPokemon?.name}
          </div>
        </div>
        {selectedPokemon && (
          <div className="screen w-[320px] px-4 py-2">
            <div className="flex gap-3 justify-center">
              {selectedPokemon?.types.map((type, index) => (
                <div 
                  key={index} className={c(
                    "text-sm rounded-2xl px-2 py-1 flex gap-2 items-center",
                    "obfuscated",
                    ready && "ready",
                    ready && `ready--${randomMode()}`
                  )}
                  style={{ backgroundColor: types[type.type.name].color }}
                >
                  <img src={types[type.type.name].image} alt={capitalize(type.type.name)} className="w-4 h-4" />
                  <span className="text-white">{type.type.name}</span>
                </div>
              ))}
            </div>
            
            <h3 className="text-lg font-bold mt-4">Abilities</h3>
            <div className="flex gap-4">
              {selectedPokemon.abilities.map((ability, index) => (
                <div key={index} className="text-sm">{ability.ability.name}</div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="panel right-panel">
        <div className="controls leds">
          <LedDisplay color="blue" />
          <LedDisplay color="red" />
          <LedDisplay color="yellow" />
        </div>
        <div className="screen second-screen">
          {nextPokemon && (
            <img
              className={c(
                "sprite",
                "obfuscated",
                ready && "ready",
                ready && `ready--${randomMode()}`
              )}
              src={nextPokemon.sprites.front_default}
              alt={nextPokemon.name}
            />
          )}
        </div>
        <div className="controls">
          <Button label="prev" onClick={prev} />
          <Button label="next" onClick={next} />
        </div>
      </div>
    </div>
  );
}
