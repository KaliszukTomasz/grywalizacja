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

export const USER_FACTORY_ABI = [
  {
    constant: false,
    inputs: [
      {
        name: 'name',
        type: 'string',
      },
    ],
    name: 'createUser',
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
    inputs: [],
    payable: false,
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'user',
        type: 'address',
      },
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
      {
        indexed: false,
        name: 'userName',
        type: 'string',
      },
    ],
    name: 'UserCreated',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'owner',
        type: 'address',
      },
    ],
    name: 'UserFactoryCreated',
    type: 'event',
  },
];

export const USER_ABI = [
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
];
