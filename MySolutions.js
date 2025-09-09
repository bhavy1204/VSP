// 1
function removeDuplicates(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (!result.includes(arr[i])) {
            result.push(arr[i]);
        }
    }
    return result;
}

// 2
function flattenArray(arr) {
    let result = [];
    for (let i = 0; i < arr.length; i++) {
        if (Array.isArray(arr[i])) {
            result = result.concat(flattenArray(arr[i]));
        } else {
            result.push(arr[i]);
        }
    }
    return result;
}

// 3
function reverseString(str) {
    let result = "";
    for (let i = str.length - 1; i >= 0; i--) {
        result += str[i];
    }
    return result;
}

// 4
function intersection(a, b) {
    let result = [];
    for (let i = 0; i < a.length; i++) {
        if (b.includes(a[i]) && !result.includes(a[i])) {
            result.push(a[i]);
        }
    }
    return result;
}

// 5
function mergeSortedArrays(a, b) {
    let i = 0, j = 0, result = [];
    while (i < a.length && j < b.length) {
        if (a[i] < b[j]) {
            result.push(a[i]);
            i++;
        } else {
            result.push(b[j]);
            j++;
        }
    }
    while (i < a.length) result.push(a[i++]);
    while (j < b.length) result.push(b[j++]);
    return result;
}

// 6
function union(a, b) {
    let combined = a.concat(b);
    return removeDuplicates(combined);
}

// 7
function binarySearch(arr, target) {
    let left = 0, right = arr.length - 1;
    while (left <= right) {
        let mid = Math.floor((left + right) / 2);
        if (arr[mid] === target) return mid;
        if (arr[mid] < target) left = mid + 1;
        else right = mid - 1;
    }
    return -1;
}

// 8
function isSubset(subset, superset) {
    for (let i = 0; i < subset.length; i++) {
        if (!superset.includes(subset[i])) {
            return false;
        }
    }
    return true;
}

// 9
function isAnagram(s1, s2) {
    if (s1.length !== s2.length) 
        return false;
    let arr1 = s1.split("").sort().join("");
    let arr2 = s2.split("").sort().join("");
    return arr1 === arr2;
}

// 10
function secondLargest(arr) {
    let largest = -Infinity, second = -Infinity;
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > largest) {
            second = largest;
            largest = arr[i];
        } else if (arr[i] > second && arr[i] !== largest) {
            second = arr[i];
        }
    }
    return second;
}

// 11. String Permutations
function permutation(str) {
    if (str.length === 1) return [str];
    let result = [];
    for (let i = 0; i < str.length; i++) {
        let firstChar = str[i];
        let rest = str.slice(0, i) + str.slice(i + 1);
        let subPerms = permute(rest);
        for (let j = 0; j < subPerms.length; j++) {
            result.push(firstChar + subPerms[j]);
        }
    }
    return result;
}

// 12
function toRoman(num) {
    let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    let symbols = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let result = "";
    for (let i = 0; i < values.length; i++) {
        while (num >= values[i]) {
            result += symbols[i];
            num -= values[i];
        }
    }
    return result;
}

// 13
function LCP(arr) {
    if (arr.length === 0) return "";
    let prefix = arr[0];
    for (let i = 1; i < arr.length; i++) {
        while (!arr[i].startsWith(prefix)) {
            prefix = prefix.slice(0, -1);
            if (prefix === "") return "";
        }
    }
    return prefix;
}

// 14
function vowels(str) {
    let vowels = "aeiouAEIOU";
    let count = 0;
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) 
            count++;
    }
    return count;
}

// 15
function isPowerOfTwo(n) {
    if (n <= 0)
        return false;
    while (n > 1) {
        if (n % 2 !== 0)
            return false;
        n = n / 2;
    }
    return true;
}

// 16
function longestSubstring(str) {
    let longest = "";
    for (let i = 0; i < str.length; i++) {
        let temp = "";
        for (let j = i; j < str.length; j++) {
            if (temp.includes(str[j]))
                break;
            seen += str[j];
            if (seen.length > longest.length)
                longest = seen;
        }
    }
    return longest;
}

// 17
function flattenObject(obj, parent = "", result = {}) {
    for (let key in obj) {
        let newKey = parent ? parent + "." + key : key;
        if (typeof obj[key] === "object" && obj[key] !== null) {
            flattenObject(obj[key], newKey, result);
        } else {
            result[newKey] = obj[key];
        }
    }
    return result;
}

// 18
function fibonaci(n) {
    if (n === 0)
        return [];
    if (n === 1)
        return [0];
    let arr = [0, 1];
    for (let i = 2; i < n; i++) {
        arr.push(arr[i - 1] + arr[i - 2]);
    }
    return arr;
}

// 19
function isLeapYear(year) {
    if (year % 400 === 0)
        return true;
    if (year % 100 === 0)
        return false;
    if (year % 4 === 0) {
        return true;
    }
    return false;
}

// 20
function factorial(n) {
    let result = 1;
    for (let i = 2; i <= n; i++) {
        result *= i;
    }
    return result;
}
