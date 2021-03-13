const path = require('path') //me ayuda a traerme path de los modules 
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin') //optimizacion de css
const TerserPlugin = require('terser-webpack-plugin') // optimizacion de js
const Dotenv = require('dotenv-webpack')
const {CleanWebpackPlugin} = require('clean-webpack-plugin') // plugin para limpiar los hashes
module.exports = {
  entry: './src/index.js', //punto de entrada de la aplicacion,  a partir de ahi todo se conecta.
  output:{ // carpeta de salida de nuestro proyecto
    path: path.resolve(__dirname,'dist'), //detecta donde se encuentra nunestro proyecto y apartir de ahi crea la crp dist
    filename: '[name].[contenthash].js', // <= es el archivo resultante
    assetModuleFilename: 'assets/images/[hash][ext][query]' //Creamos una insercion, para las imagenes y las fuentes o archivos de tipo assets
  },
  resolve: { // Con que extensiones vamos a travajar ? con que va a trabajar?
    extensions: ['.js'],
    alias:{
      '@utils' : path.resolve(__dirname, 'src/utils/'),
      '@templates' : path.resolve(__dirname, 'src/templates/'),
      '@styles' : path.resolve(__dirname, 'src/styles/'),
      '@assets' : path.resolve(__dirname, 'src/assets/'),
      '@images' : path.resolve(__dirname, 'src/assets/images/'),
    }
  },
  module:{
    rules:
      [
        {
          test: /\.m?js$/, //Este test nos permite saber que tipo de extensiones debe trabajar (mjs o js)
          exclude: /node_modules/, //literal
          use: {
            loader: 'babel-loader'
          }
        },
        {
          test: /\.css|.styl$/i, //permite buscar coincidencias de css
          use: [MiniCssExtractPlugin.loader, 'css-loader', 'stylus-loader'], //extraer css usando el loader de procesar y tranformar
          //siempre que usemos un loader, tendremos que llegar para configurar su test
        },
        {
          test: /\.png/,
          type: 'asset/resource'
        },
        {
          test: /\.(woff|woff2)$/,
          use: {
            loader:'url-loader',
            options: {
              limit: 10000,
              mimetype: "application/font-woff",
              name: "[name].[contenthash].[ext]", // nombre+extension
              outputPath: "./assets/fonts/", // de donde llevara el recurso
              publicPath: "../assets/fonts/",  // a donde dentro de dist
              esModule: false,
            }
          }
        }
      ] 
  },
  //SECCION DE PLUGINS
  plugins:[
    new HtmlWebpackPlugin({ // le tenemos que pasar como parametro un objeto de configuracion
      inject: true, //insercion de los elementos
      template:'./public/index.html', //↓ resuktado de este html
      filename: './index.html' // ojo se llama filename la propiedad, hace referencia a la carpeta de distribution de output
    }), 
    new MiniCssExtractPlugin({
      filename: 'assets/[name].[contenthash].css'
    }), //no recibe un obj de configuracion porque ya lo ha hecho↑ o tiene una configuracion predeterminada pero si ya tiene un obj talvez ya pisamos su configuracion
    new CopyPlugin({
      patterns:[
        {
          from: path.resolve(__dirname, "src", "assets/images"), //Busco una direccion extacta y de ahi => src => assets... (lo que se copiara)
          to: "assets/images"
        }
      ]
    }),
    new Dotenv(), //usamos la configuracion env
    new CleanWebpackPlugin(), // usar el plugin
  ],
  optimization: {
    minimize:true, //optimizacion de minimizacion
    minimizer: [ // cual seran los minimizadores
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ] //esto seria todo para lograr optimizar el codigo de css y javascript
  }
} 
