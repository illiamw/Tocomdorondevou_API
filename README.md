# Repositório da APP Mobile (Consumidor)
https://github.com/vinicius-r-silva/To-com-dor_Onde-vou

# Tocomdorondevou_API

Todos os comandos de operação com a API são executados via Shell Node.js

## Execução Local
No diretório ./Tocomdorondevou_API
```
cd Tocomdorondevou_API

node ace serve --watch
```

## Build para produção
No diretório ./Tocomdorondevou_API/Tocomdorondevou_API
```
node ace build --production

cd build
npm ci --production
```
O conteúdo do diretório ./Tocomdorondevou_API/Tocomdorondevou_API/build temos os arquivos para execução no servidor em produção, e espera-se a execução do comando ``` node server.js ``` por parte do servidor.



