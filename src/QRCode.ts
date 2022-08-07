import { regex, capacities } from "./constants";

export class QRCode {
    toEncode: string;
    errorCorrectionLevel: ErrorCorrectionLevel
    mode?: Mode;
    version?: number;

    constructor(options: QRCodeOptions) {
        this.toEncode = options.toEncode;
        this.errorCorrectionLevel = options.errorCorrectionLevel;
        this.mode;
        this.version ? this.version : this.version = 0;

        if(this.version > 40) throw new RangeError("version must be between 1 and 40")
    }

    public encodeText() {
        const text = this.toEncode;
        const ecc = this.errorCorrectionLevel;
        this.analyzeText(text, ecc);
    }

    //TODO: Add ECI Mode when it is understood
    private analyzeText(text: string, ecc: ErrorCorrectionLevel){
        //work out which mode to use based on user input
        regex.Numeric.test(text) ? this.mode = "Numeric" :
        regex.Alphanumeric.test(text) ? this.mode = "Alphanumeric" :
        regex.Kanji.test(text) ? this.mode = "Kanji" :
        this.mode = "Byte";

        //determine the lowest version that can hold the data if the user has not specified one
        if(this.version == 0) {
            const bitArray = this.createBitArray(text);
            this.determineVersion(bitArray, ecc)
        }

        console.log(`Selected mode: ${this.mode}\nSelected version: ${this.version}`)
    }

    private determineVersion(bitArray: string[], ecc: ErrorCorrectionLevel) {
        const numOfCodeWords = bitArray.length;
        let eccl: number[];

        switch(ecc) {
            case 0:
                eccl = capacities.ECCL
                break;
            case 1:
                eccl = capacities.ECCM
                break;
            case 2:
                eccl = capacities.ECCQ
                break;
            case 3:
                eccl = capacities.ECCH
                break;
        }

        for(let i = 0; i < eccl!.length; i++) {
            if(numOfCodeWords < eccl![i]) {
                return this.version = i+1;
            }
        }

    }

    private createBitArray(text: string): string[] {
        let temp = [];

        for(let i = 0; i < text.length; i++) {
            let charAsBits = text[i].charCodeAt(0).toString(2);
            while(charAsBits.length < 8) {
                charAsBits = `0${charAsBits}`;
            }
            temp.push(charAsBits);
        }

        return temp;
    }
}

interface QRCodeOptions {
    toEncode: string
    errorCorrectionLevel: ErrorCorrectionLevel
    version?: number
}

type Mode = "ECI" | "Numeric" | "Alphanumeric" | "Byte" | "Kanji";

enum ErrorCorrectionLevel {
    ECCL = 0,
    ECCM = 1,
    ECCQ = 2,
    ECCH = 3
}