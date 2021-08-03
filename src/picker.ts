import type { Perk } from "./Types";

export interface RelatedPerk extends Perk {
    score: number
}

export function findRelatedPerks(perks: Perk[], perkName: string): RelatedPerk[] {
    const perkToLookFor = perks.find(x => x.name === perkName);
    if (!perkToLookFor) {
        return []
    }
    const filteredPerks = perks.filter(x => x.name !== perkName);

    return filteredPerks.map(perk => {
        return {
            ...perk,
            score: perkToLookFor.keywords.reduce((acc, curr) => perk.keywords.find(x => x === curr) ? acc + 1 : acc, 0) / perkToLookFor.keywords.length
        }
    }).sort((a, b) => b.score - a.score).filter(x => x.score > 0);
}

export function findPerksByKeyword(perks: Perk[], keyword: string): Perk[] {
    return perks.filter(x => x.keywords.includes(keyword));
}