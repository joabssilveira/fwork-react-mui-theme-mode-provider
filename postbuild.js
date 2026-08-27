const fs = require('fs');
const path = require('path');

// Função para copiar uma pasta recursivamente
function copyFolderRecursive(source, destination) {
  // Verifica se a pasta de destino existe, se não, cria
  if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination, { recursive: true });
  }

  // Lê os arquivos/pastas da origem
  const files = fs.readdirSync(source);

  for (const file of files) {
    const sourcePath = path.join(source, file);
    const destinationPath = path.join(destination, file);

    // Verifica se é um diretório ou arquivo
    if (fs.lstatSync(sourcePath).isDirectory()) {
      // Se for uma pasta, copia recursivamente
      copyFolderRecursive(sourcePath, destinationPath);
    } else {
      // Se for um arquivo, copia diretamente
      fs.copyFileSync(sourcePath, destinationPath);
      console.log(`Arquivo copiado: ${destinationPath}`);
    }
  }
}

const fontsSource = path.resolve(__dirname, './src/fonts');

const fontsDestinationCjs = path.resolve(__dirname, './dist/cjs/fonts');
if (fs.existsSync(fontsSource)) {
  console.log('Copiando pasta de fontes...');
  copyFolderRecursive(fontsSource, fontsDestinationCjs);
} else {
  console.error('Pasta de fontes não encontrada:', fontsSource);
  process.exit(1);
}

const fontsDestinationEsm = path.resolve(__dirname, './dist/esm/fonts');
if (fs.existsSync(fontsSource)) {
  console.log('Copiando pasta de fontes...');
  copyFolderRecursive(fontsSource, fontsDestinationEsm);
} else {
  console.error('Pasta de fontes não encontrada:', fontsSource);
  process.exit(1);
}

const sourceFile = path.resolve(__dirname, './src/styles/index.css');

// cjs
const destinationDirCjs = path.resolve(__dirname, './dist/cjs/styles');
const destinationFileCjs = path.join(destinationDirCjs, 'index.css');
if (!fs.existsSync(destinationDirCjs)) {
  fs.mkdirSync(destinationDirCjs, { recursive: true });
}

fs.copyFile(sourceFile, destinationFileCjs, (err) => {
  if (err) {
    console.error('Erro ao copiar o arquivo:', err);
    process.exit(1); // Encerra o script com erro
  }
  console.log(`Arquivo copiado com sucesso para: ${destinationFileCjs}`);
});

// esm
const destinationDirEsm = path.resolve(__dirname, './dist/esm/styles');
const destinationFileEsm = path.join(destinationDirEsm, 'index.css');
if (!fs.existsSync(destinationDirEsm)) {
  fs.mkdirSync(destinationDirEsm, { recursive: true });
}

fs.copyFile(sourceFile, destinationFileEsm, (err) => {
  if (err) {
    console.error('Erro ao copiar o arquivo:', err);
    process.exit(1); // Encerra o script com erro
  }
  console.log(`Arquivo copiado com sucesso para: ${destinationFileEsm}`);
});