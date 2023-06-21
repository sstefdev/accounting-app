import * as moduleAlias from 'module-alias'

moduleAlias.addAliases({
  '@src': `${__dirname}/`,
  '@controller': `${__dirname}/controller`,
  '@entity': `${__dirname}/entity`,
  '@routes': `${__dirname}/routes`,
  '@utils': `${__dirname}/utils`,
  '@middlewares': `${__dirname}/middlewares`,
  '@app-types': '../types.d.ts',
})

export default moduleAlias
