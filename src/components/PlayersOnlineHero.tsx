/* eslint-disable @next/next/no-img-element */
import { Tooltip } from "@mantine/core";
import Link from "next/link";

export default function PlayersOnlineHero(props: {
  /**
   * Array of usernames of players online.
   */
  players: {
    name: string;
    uuid: string;
  }[];
}) {
  return (
    <div className="">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="sm:text-center">
          <p className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
            Online Players
          </p>
        </div>

        <div className="mt-20 max-w-lg sm:mx-auto md:max-w-none">
          <div className="flex flex-wrap gap-2">
            {props.players.map((player) => (
              <Link href={`/stats/${player.name}`} key={player.uuid}>
                <Tooltip label={player.name} key={player.uuid}>
                  <img
                    src={`https://crafatar.com/avatars/${player.uuid}?size=64&overlay`}
                    alt={player.name}
                  />
                </Tooltip>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
