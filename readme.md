
# QR Code Generation

This repository serves as a work in progress example of my own implementation of the ISO/IEC 18004:2000(E) standard for QR codes.
The aim of this repository is to understand the technicalities behind the QR code paving the way forward for a library I hope to create in the future. Below is a **todo list** which will outline steps I have completed as well as what step(s) are being worked on.

# TODO

## Data Analysis - Ongoing

Identify the types of characters/symbols being used in a given string to determine the correct mode to be applied when creating segments. Additionally work out the smallest possible QR code version that can be used with a given string if the user has not specified a version to use.

## Data Encodation

Convert the given string into a bit stream in accordance with the rules enforced by the appropriate mode. Additionally a terminator (end of message) should be appended to the end of the data sequence before splitting the bit stream into 8-bit codewords. Padding should be added to fill any unused space.

## Error Correction Coding
Divide the codeword sequence into the required number of blocks to enable error correction algorithms to be processed. Generate the error correction codewords for each block, appending the error correction codewords to the end of the data codeword sequence.

## Structure Final Message

Interleave the data and error correction codewords from each block and add remainder bits as necessary.

## Module Placement in Matrix

Place the codeword modules in the matrix together with the Finder Pattern, Seperators, Timing Pattern, and Alignment Patterns.

## Masking

Apply the masking patterns in turn to the encoding region of the symbol. Evaluate the results and select the pattern which optimizes the dark/light module balance and minimizes the occurence of undesirable patterns.

## Format and Version Information

Generate the Format and (where applicable) Version Information and complete the symbol.