import { AppleIcon, CoffeeIcon, CrownIcon, FishIcon, HeartIcon, KeyIcon, OrangeIcon, PlanetIcon, SunnyIcon, TreeIcon } from "components/icons";
import { ReactNode } from "react";

export enum Icons {
    APPLE = 'apple',
    COFFEE = 'coffee',
    CROWN = 'crown',
    FISH = 'fish',
    HEART = 'heart',
    KEY = 'key',
    ORANGE = 'orange',
    PLANET = 'planet',
    SUNNY = 'sunny',
    TREE = 'tree',
}

export const IconsToElements: Record<Icons, () => ReactNode> = {
    [Icons.APPLE]: AppleIcon,
    [Icons.COFFEE]: CoffeeIcon,
    [Icons.CROWN]: CrownIcon,
    [Icons.FISH]: FishIcon,
    [Icons.HEART]: HeartIcon,
    [Icons.KEY]: KeyIcon,
    [Icons.ORANGE]: OrangeIcon,
    [Icons.PLANET]: PlanetIcon,
    [Icons.SUNNY]: SunnyIcon,
    [Icons.TREE]: TreeIcon
}