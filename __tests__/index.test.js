// DO NOT CHANGE THIS FILE //
// DO NOT CHANGE THIS FILE //
// DO NOT CHANGE THIS FILE //
// DO NOT CHANGE THIS FILE //
// DO NOT CHANGE THIS FILE //

const data = require('../data.js')
const funcs = require('../index.js')

describe('getFinals', () => {
  const result = funcs.getFinals(data)

  it('returns the right number of matches', () => {
    expect(result).toHaveLength(20)
  })
  it('matches returned are finals', () => {
    result.forEach(match => {
      expect(match).toMatchObject({
        Stage: 'Final'
      })
    })
  })
})

describe('getYears', () => {
  const result = funcs.getYears(data, funcs.getFinals)
  console.log(result)
  it('returns the right number of years', () => {
    expect(result).toHaveLength(20)
  })
  it('returns the right years', () => {
    expect(result).toEqual(expect.arrayContaining([
      1930, 1934, 1938, 1954,
      1958, 1962, 1966, 1970,
      1974, 1978, 1982, 1986,
      1990, 1994, 1998, 2002,
      2006, 2010, 2014, 2014,
    ]))
  })
})