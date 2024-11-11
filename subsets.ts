export interface Set {
    start: number;
    end: number;
}

export const contains = (set: Set, value: number) => value >= set.start && value <= set.end

export const intersects = (set: Set, other: Set) => contains(set, other.start) || contains(set, other.end)

export const group = (sets: Set[]): Set[][] => {
    const groups: Set[][] = [];
    sets.forEach(set => {
        const membership = groups.find(group => group.find(member => intersects(member, set)))

        if (membership)
            membership.push(set)
        else
            groups.push([set]);
    });
    return groups;
}
