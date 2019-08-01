export const ABI = [
  'function setValue(string value)',
  'function value() public view returns (string)',
];

export const ABI2 = [
  {
    constant: true,
    inputs: [],
    name: 'value',
    outputs: [
      {
        name: '',
        type: 'string',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'value',
        type: 'string',
      },
    ],
    name: 'setValue',
    outputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'author',
        type: 'address',
      },
      {
        indexed: false,
        name: 'oldValue',
        type: 'string',
      },
      {
        indexed: false,
        name: 'newValue',
        type: 'string',
      },
    ],
    name: 'ValueChanged',
    type: 'event',
  },
];
