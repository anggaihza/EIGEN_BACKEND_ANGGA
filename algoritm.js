const coba = "NE1GE1";
const cobaArray = coba.split("");
const arrayTmp = [];
const arrayTmpNum = [];
const arrayFOrCek = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
cobaArray.forEach((element) => {
    const getString = arrayFOrCek.includes(element);
    if (getString) {
        arrayTmpNum.push(element);
    } else {
        arrayTmp.push(element);
    }
});
const reversedString = arrayTmp.reverse();
const stringJoin = reversedString.join("");
const numberJoin = arrayTmpNum.join("");
const result = stringJoin + numberJoin;
console.log(result);

// 1. Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"

const reverseString = (string) => {
    // return string.split("").reverse().join("")
    let result = ""
    for (let i = string.length - 1; i > 0; i--) {
        result += string[i - 1]
    }
    result += string[string.length - 1]
    console.log(result);
}

console.log(reverseString("NEGIE1"));

// 2. Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut,
// jika ada kata dengan panjang yang sama silahkan ambil salah satu.

const findLongestLentance = (sentance) => {
    const splitSentence = sentence.split(" ");
    let longestWord = "";

    for (const word of splitSentence) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma"
console.log(findLongestLentance(sentence));

// 3. Terdapat dua buah array yaitu array INPUT dan array QUERY,
// silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT

const countSameQuery = (input, query) => {
    const count = []
    for (let i = 0; i < query.length; i++) {
        countTmp = 0
        for (let j = 0; j < input.length; j++) {
            if (input[j] === query[i]) {
                countTmp++
            }
        }
        count.push(countTmp)
    }
    return count
}

INPUT = ['xc', 'dz', 'bbb', 'dz']
QUERY = ['bbb', 'ac', 'dz']
console.log(countSameQuery(INPUT, QUERY));

// 4. Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN
function findDiagonalDifference(matrix) {
    let diagonal1Sum = 0;
    let diagonal2Sum = 0;

    for (let i = 0; i < matrix.length; i++) {
        let row = "";
        for (let j = 0; j < matrix[i].length; j++) {
            row += matrix[i][j] + " ";
            if (i === j) {
                diagonal1Sum += matrix[i][j];
            }
            if (i === matrix[i].length - 1 - j) {
                diagonal2Sum += matrix[i][j];
            }
        }
    }

    console.log("Diagonal Pertama: " + diagonal1Sum);
    console.log("Diagonal Kedua: " + diagonal2Sum);

    const difference = Math.abs(diagonal1Sum - diagonal2Sum);
    return difference;
}

const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];
const result = findDiagonalDifference(matrix);
console.log("Result: " + result);
