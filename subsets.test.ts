import { assertEquals } from "@std/assert";
import { contains, group, intersects } from "./subsets.ts";

const set = { start: 1, end: 3 };

[
    { title: "below start", value: set.start - 1, result: false },
    { title: "start", value: set.start, result: true },
    { title: "end", value: set.end, result: true },
    { title: "above end", value: set.end + 1, result: false },
].forEach((test) =>
    Deno.test(
        test.title,
        () => assertEquals(contains(set, test.value), test.result),
    )
);

[
    { title: "inside", set: { start: 2, end: 2 }, result: true },
    { title: "before start", set: { start: -1, end: 0 }, result: false },
    { title: "at start", set: { start: -1, end: 1 }, result: true },
    { title: "at end", set: { start: 3, end: 12 }, result: true },
    { title: "after end", set: { start: 4, end: 12 }, result: false },
    { title: "same", set: set, result: true },
].forEach((test) =>
    Deno.test(
        test.title,
        () => assertEquals(intersects(set, test.set), test.result),
    )
);

[
    {
        title: "unrelated",
        sets: [{ start: 1, end: 3 }, { start: 5, end: 7 }],
        result: [[{ start: 1, end: 3 }], [{ start: 5, end: 7 }]],
    },
    {
        title: "intersecting",
        sets: [{ start: 1, end: 5 }, { start: 3, end: 7 }],
        result: [[{ start: 1, end: 5 }, { start: 3, end: 7 }]],
    },
].forEach((test) =>
    Deno.test(test.title, () => assertEquals(group(test.sets), test.result))
);
