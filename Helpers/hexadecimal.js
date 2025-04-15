import HexDigits from "../Consts/HexDigits.js";

const Hexadecimal = {
    toHex: (value) => {
        let res = '';
        do {
            const mod = value % 16;
            if (mod > 9) {
                res = HexDigits[mod] + res
            } else {
                res = mod + res;
            }
            value = Math.floor(value / 16);
        } while (value % 16 !== 0)
        // res = Math.floor(value / 16) + res;
        return res;
    },
    toDec: (value) => {

    }
}

const a = Hexadecimal.toHex(40395873029485)

console.log(a);

export default Hexadecimal;