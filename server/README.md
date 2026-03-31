# slim-starter-kit

Este repositório é um kit inicial simples para criação rápida de APIs utilizando **Slim 4**, já com ambiente **dockerizado** contendo:

- PHP + Apache
- MySQL
- Slim Framework
- Injeção de dependência com PHP-DI
- Doctrine Migrations

O objetivo é fornecer uma base pronta para começar novos projetos sem precisar repetir toda a configuração inicial. Não há proxy reverso ou configurações avançadas. O Apache executa o PHP diretamente no mesmo container, sem encaminhar requisições para outro serviço. PHP e MySQL rodam na mesma rede Docker.

## Funcionalidades

- Slim 4 configurado e funcionando
- PHP-DI integrado ao Slim
- Doctrine Migrations pronto para uso
- Ambiente Docker com PHP-Apache e MySQL
- Autoload PSR-4 mapeado para `src/`
- Estrutura mínima para iniciar qualquer aplicação baseada em Slim

## Serviços Docker

### php-apache

- Executa a aplicação Slim
- Composer já configurado
- Disponível na porta 80

### mysql

- Servidor MySQL
- Variáveis carregadas do `.env`

O acesso ao banco deve utilizar o host:

```
DB_HOST=db
```

## Dependências do Composer

```json
{
  "require": {
    "slim/slim": "4.*",
    "slim/psr7": "^1.8",
    "php-di/slim-bridge": "^3.4",
    "doctrine/migrations": "^3.9"
  },
  "autoload": {
    "psr-4": {
      "App\\": "src/"
    }
  }
}
```

## Variáveis de Ambiente

Duplique o arquivo `.env.example` e renomeie para `.env`:

```
DB_HOST=db
DB_NAME=example_db
DB_USER=application
DB_PASSWORD=password
DB_PORT=3306
```

## Como executar

1. Clone o repositório
2. Crie o arquivo `.env`
3. Suba os containers:

```
docker compose up -d
```

4. A aplicação ficará disponível em:

```
http://localhost:80
```

## Finalidade do projeto

Este repositório serve apenas como um ponto de partida simples para projetos com Slim + MySQL em Docker. Não contém:

- Proxy reverso
- HTTPS
- Otimizações avançadas
- Configurações extras de produção

Apenas o necessário para iniciar rapidamente uma API.
