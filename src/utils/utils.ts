/**
 * Checks whether all elements in an iterable satisfy a given predicate function.
 *
 * Iterates through the provided iterable and calls the given callback on each element.
 * Returns `true` only if the callback returns `true` for every element; otherwise returns `false`.
 * 
 * This function short-circuits: it stops checking as soon as one element fails the condition.
 *
 * @template T - The type of elements in the iterable.
 * @param {Iterable<T>} iterable - The iterable (e.g., Array, Set, Map keys, etc.) to check.
 * @param {(item: T) => boolean} callback - The predicate function to test each element.
 * @returns {boolean} - `true` if all elements satisfy the predicate, otherwise `false`.
 *
 * @example
 * const numbers = [2, 4, 6];
 * const allEven = all(numbers, n => n % 2 === 0);
 * console.log(allEven); // true
 *
 * const hasOnlyPositive = all(numbers, n => n > 0);
 * console.log(hasOnlyPositive); // true
 *
 * const allGreaterThanFive = all(numbers, n => n > 5);
 * console.log(allGreaterThanFive); // false
 */
export function all<T>(iterable: Iterable<T>, callback: (item: T) => boolean): boolean {
    for (const item of iterable) {
        if (!callback(item)) {
            return false;
        }
    }
    return true;
}
