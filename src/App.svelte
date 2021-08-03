<script lang="ts">
    import { killerPerks } from "./killer-perks";
    import { findPerksByKeyword, findRelatedPerks } from "./picker";

    let pickedPerk: string = "";
    $: matchedPerks = findRelatedPerks(killerPerks, pickedPerk);

    let pickedKeyword: string = "";
    $: matchedPerksForKeyword = findPerksByKeyword(killerPerks, pickedKeyword);

    function prettyText(text: string): string {
        return text
            .split(" ")
            .map((word) => {
                return word[0].toUpperCase() + word.substring(1);
            })
            .join(" ");
    }
</script>

<main>
    <div>
        <input type="text" bind:value={pickedPerk} placeholder="Perk" />
        <ul>
            {#each matchedPerks as perk}
                <li>
                    {prettyText(perk.name)} - {Math.floor(perk.score * 100)}%
                </li>
            {/each}
        </ul>
    </div>
    <div>
        <input type="text" bind:value={pickedKeyword} placeholder="Keyword" />
        <ul>
            {#each matchedPerksForKeyword as perk}
                <li>{prettyText(perk.name)}</li>
            {/each}
        </ul>
    </div>
</main>

<style>
    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
    main {
        display: flex;
        flex-direction: column;
    }
    div {
        border: 1px black solid;
        padding: 3em;
        padding-top: 0;
    }
</style>
