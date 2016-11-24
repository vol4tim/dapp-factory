export default {
  name: 'ERC 20 builder',
  description: '',
  address: '0x5bB01A601eb313a0151D7a6E5867263068562FDe',
  abi: 'BuilderToken',
  contractAbi: 'Token',
  fields: [
    {
      type: 'text',
      name: '_name',
      validate: 'string',
      required: true,
      label: 'name token',
      placeholder: 'My Token',
      value: '',
      disabled: false
    },
    {
      type: 'text',
      name: '_symbol',
      validate: 'string',
      required: true,
      label: 'symbol token',
      placeholder: 'TCR',
      value: '',
      disabled: false
    },
    {
      type: 'text',
      name: '_decimals',
      validate: 'uint',
      required: true,
      label: 'fixed point position',
      placeholder: '0',
      value: '',
      disabled: false
    },
    {
      type: 'text',
      name: '_count',
      validate: 'uint',
      required: true,
      label: 'count of tokens exist',
      placeholder: '100',
      value: '',
      disabled: false
    },
    {
      type: 'hidden',
      name: '_client',
      validate: 'address',
      required: false,
      value: '',
      disabled: false
    }
  ]
}
