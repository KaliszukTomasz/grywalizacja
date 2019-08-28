export const USER_ABI = [
  {
    constant: true,
    inputs: [],
    name: 'name',
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
    constant: true,
    inputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    name: 'registeredGames',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'view',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
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
        name: 'newGame',
        type: 'address',
      },
    ],
    name: 'registerGame',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: false,
    inputs: [
      {
        name: 'value',
        type: 'int256',
      },
    ],
    name: 'setExperience',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    constant: true,
    inputs: [],
    name: 'experience',
    outputs: [
      {
        name: '',
        type: 'int256',
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
        name: 'title',
        type: 'string',
      },
      {
        name: 'description',
        type: 'string',
      },
    ],
    name: 'createGame',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_name',
        type: 'string',
      },
      {
        name: '_owner',
        type: 'address',
      },
    ],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'created',
        type: 'address',
      },
      {
        indexed: false,
        name: 'creator',
        type: 'address',
      },
      {
        indexed: false,
        name: 'gameTitle',
        type: 'string',
      },
    ],
    name: 'GameCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'created',
        type: 'address',
      },
      {
        indexed: false,
        name: 'creator',
        type: 'address',
      },
    ],
    name: 'GameRegistered',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'name',
        type: 'string',
      },
      {
        indexed: false,
        name: 'newExperience',
        type: 'int256',
      },
    ],
    name: 'UserExperience',
    type: 'event',
  },
];
