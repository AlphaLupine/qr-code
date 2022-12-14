/*
QR Code Generator for TypeScript
Copyright (C) 2022  Lupine

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { QRCode } from "./QRCode";

const qr = new QRCode({toEncode: "Hello World", errorCorrectionLevel: 0})
qr.encodeText();

//Expected Output: 01000000101101001000011001010110110001101100011011110010000001010111011011110111001001101100011001000000111011000001000111101100000100011110110000010001
//  Actual Output: 01000000101101001000011001010110110001101100011011110010000001010111011011110111001001101100011001000000111011000001000111101100000100011110110000010001 => Works so far



