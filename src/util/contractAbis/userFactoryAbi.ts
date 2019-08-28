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
