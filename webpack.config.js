var config = {
   entry:__dirname + '/main.js',
	
   output: {
       filename:'index.js',
       path:__dirname + '/',
   },
	
   devServer: {
      historyApiFallback:true,
      contentBase: './',
      hot: true,
      inline: true,
      port: 8080
   },
	
   module: {
      loaders: [
         {
            test: /\.(js|jsx?)$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
				
            query: {
               presets: ['es2015', 'react']
            }
         }
      ]
   }
}

module.exports = config;

